from __future__ import annotations

import json
from collections import Counter, defaultdict
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import Any


@dataclass
class IncidentResult:
    incident_id: str
    priority: str
    score: int
    queue: str
    assignee: str
    escalate_to: list[str]
    compliance_flags: list[dict[str, Any]]
    enrichment: dict[str, Any]


KEYWORD_WEIGHTS = {
    "csam": 80,
    "child sexual abuse": 80,
    "terror": 65,
    "self-harm": 40,
    "urgent": 30,
    "press": 25,
    "law enforcement": 30,
    "coordinated abuse": 20,
    "botnet": 15,
    "outage": 20,
}

SEVERITY_HINT_WEIGHTS = {
    "sev0": 100,
    "sev1": 75,
    "sev2": 45,
    "sev3": 20,
}

QUEUE_OWNERS = {
    "high_risk_enforcement": ["alice", "ben"],
    "abuse_operations": ["chris", "devin"],
    "platform_reliability": ["erin", "frank"],
    "general_enforcement": ["grace", "harper"],
}


def load_incidents(path: Path) -> list[dict[str, Any]]:
    incidents: list[dict[str, Any]] = []
    for raw in path.read_text(encoding="utf-8").splitlines():
        line = raw.strip()
        if not line:
            continue
        incidents.append(json.loads(line))
    return incidents


def _score_text(narrative: str) -> int:
    lowered = narrative.lower()
    score = 0
    for keyword, weight in KEYWORD_WEIGHTS.items():
        if keyword in lowered:
            score += weight
    return score


def score_incident(incident: dict[str, Any]) -> tuple[int, str, list[str]]:
    narrative = incident.get("narrative", "")
    severity_hint = str(incident.get("severity_hint", "")).lower()
    users_impacted = int(incident.get("users_impacted", 0))
    tooling_degraded = bool(incident.get("tooling_degraded", False))

    score = _score_text(narrative)
    score += SEVERITY_HINT_WEIGHTS.get(severity_hint, 0)
    score += min(users_impacted // 25, 30)
    if tooling_degraded:
        score += 15

    reasons: list[str] = []
    if severity_hint in SEVERITY_HINT_WEIGHTS:
        reasons.append(f"severity_hint={severity_hint}")
    if users_impacted > 0:
        reasons.append(f"users_impacted={users_impacted}")
    if tooling_degraded:
        reasons.append("on_call_tooling_degraded=true")
    if _score_text(narrative) > 0:
        reasons.append("risk_keywords_detected")

    if score >= 130:
        return score, "P0", reasons
    if score >= 90:
        return score, "P1", reasons
    if score >= 55:
        return score, "P2", reasons
    return score, "P3", reasons


def route_incident(incident: dict[str, Any], priority: str) -> str:
    category = str(incident.get("category", "")).lower()
    narrative = str(incident.get("narrative", "")).lower()

    if "csam" in narrative or "child sexual abuse" in narrative:
        return "high_risk_enforcement"
    if category in {"impersonation", "fraud", "coordinated_abuse"}:
        return "abuse_operations"
    if category in {"outage", "tooling"} or incident.get("tooling_degraded", False):
        return "platform_reliability"
    if priority in {"P0", "P1"}:
        return "high_risk_enforcement"
    return "general_enforcement"


def auto_assign(queue: str, current_index: dict[str, int]) -> str:
    owners = QUEUE_OWNERS[queue]
    idx = current_index.get(queue, 0)
    assignee = owners[idx % len(owners)]
    current_index[queue] = idx + 1
    return assignee


def compliance_assist(incident: dict[str, Any]) -> list[dict[str, Any]]:
    narrative = str(incident.get("narrative", "")).lower()
    flags: list[dict[str, Any]] = []

    if "csam" in narrative or "child sexual abuse" in narrative:
        flags.append(
            {
                "framework": "NCMEC",
                "confidence": "high",
                "reason": "Potential child safety exploitation signal detected",
                "recommendation": "Escalate to legal and child safety specialist immediately",
            }
        )

    if any(term in narrative for term in ("systemic", "illegal content", "coordinated abuse")):
        flags.append(
            {
                "framework": "EU_DSA",
                "confidence": "medium",
                "reason": "Possible systemic risk or illegal content pattern",
                "recommendation": "Route for policy review and regulatory logging check",
            }
        )

    return flags


def escalation_matrix(priority: str, compliance_flags: list[dict[str, Any]], incident: dict[str, Any]) -> list[str]:
    partners = ["Safeguards"]
    narrative = str(incident.get("narrative", "")).lower()

    if priority in {"P0", "P1"}:
        partners.extend(["Policy", "Product"])
    if "press" in narrative:
        partners.append("Comms")
    if compliance_flags:
        partners.append("Legal")
    if "law enforcement" in narrative:
        partners.append("LawEnforcementLiaison")

    seen: set[str] = set()
    ordered: list[str] = []
    for partner in partners:
        if partner not in seen:
            ordered.append(partner)
            seen.add(partner)
    return ordered


def find_similar_incidents(history: list[dict[str, Any]], incident: dict[str, Any]) -> list[str]:
    tags = set(incident.get("tags", []))
    category = incident.get("category")
    matches: list[str] = []
    for prior in history:
        if prior.get("category") == category:
            matches.append(str(prior["id"]))
            continue
        prior_tags = set(prior.get("tags", []))
        if tags and prior_tags and tags.intersection(prior_tags):
            matches.append(str(prior["id"]))
    return matches[-3:]


def enrich_ticket(incident: dict[str, Any], reasons: list[str], similar: list[str]) -> dict[str, Any]:
    return {
        "summary": f"{incident.get('category')} incident in {incident.get('region')} region",
        "triage_reasons": reasons,
        "affected_users": incident.get("users_impacted", 0),
        "suggested_next_actions": [
            "Confirm immediate containment",
            "Validate policy applicability",
            "Publish stakeholder update in 30 minutes",
        ],
        "similar_incidents": similar,
    }


def generate_runbook_updates(processed: list[IncidentResult]) -> str:
    by_queue = Counter(item.queue for item in processed)
    framework_counts = Counter(
        flag["framework"] for item in processed for flag in item.compliance_flags
    )
    priority_counts = Counter(item.priority for item in processed)

    lines = [
        "# Runbook Update Suggestions",
        "",
        "Generated from latest incident batch.",
        "",
        "## Queue pressure",
    ]
    for queue, count in by_queue.most_common():
        if count >= 2:
            lines.append(f"- Update `{queue}` SOP quick actions (observed {count} incidents).")

    lines.extend(["", "## Compliance playbook improvements"])
    if not framework_counts:
        lines.append("- No framework signals detected in this batch.")
    for framework, count in framework_counts.items():
        lines.append(f"- Refresh `{framework}` referral checklist and evidence capture template ({count} hits).")

    lines.extend(["", "## Priority calibration"])
    for priority, count in priority_counts.items():
        lines.append(f"- `{priority}` volume: {count}")
    lines.append("- Revalidate severity-to-priority rules if P0/P1 exceed staffing threshold.")
    lines.append("")
    return "\n".join(lines)


def dashboard_metrics(processed: list[IncidentResult], started_at: datetime) -> dict[str, Any]:
    queue_counts = Counter(item.queue for item in processed)
    priority_counts = Counter(item.priority for item in processed)
    escalation_counts = Counter(partner for item in processed for partner in item.escalate_to)
    compliance_counts = Counter(
        flag["framework"] for item in processed for flag in item.compliance_flags
    )

    total = len(processed)
    p0_p1 = sum(1 for item in processed if item.priority in {"P0", "P1"})
    now = datetime.now(timezone.utc)
    runtime_seconds = (now - started_at).total_seconds()

    return {
        "generated_at_utc": now.isoformat(),
        "total_incidents": total,
        "high_urgency_count": p0_p1,
        "high_urgency_rate": round((p0_p1 / total) * 100, 2) if total else 0.0,
        "queue_distribution": dict(queue_counts),
        "priority_distribution": dict(priority_counts),
        "escalation_partner_mentions": dict(escalation_counts),
        "compliance_flag_counts": dict(compliance_counts),
        "runtime_seconds": runtime_seconds,
    }


def process_incident_batch(incidents: list[dict[str, Any]]) -> tuple[list[IncidentResult], dict[str, Any], str]:
    started_at = datetime.now(timezone.utc)
    rotation_state: dict[str, int] = defaultdict(int)
    processed: list[IncidentResult] = []
    history: list[dict[str, Any]] = []

    for incident in incidents:
        score, priority, reasons = score_incident(incident)
        queue = route_incident(incident, priority)
        assignee = auto_assign(queue, rotation_state)
        compliance_flags = compliance_assist(incident)
        escalate_to = escalation_matrix(priority, compliance_flags, incident)
        similar = find_similar_incidents(history, incident)
        enrichment = enrich_ticket(incident, reasons, similar)

        processed.append(
            IncidentResult(
                incident_id=str(incident["id"]),
                priority=priority,
                score=score,
                queue=queue,
                assignee=assignee,
                escalate_to=escalate_to,
                compliance_flags=compliance_flags,
                enrichment=enrichment,
            )
        )
        history.append(incident)

    metrics = dashboard_metrics(processed, started_at)
    runbook = generate_runbook_updates(processed)
    return processed, metrics, runbook


def write_outputs(processed: list[IncidentResult], metrics: dict[str, Any], runbook_md: str, output_dir: Path) -> None:
    output_dir.mkdir(parents=True, exist_ok=True)

    processed_payload = [
        {
            "incident_id": item.incident_id,
            "priority": item.priority,
            "score": item.score,
            "queue": item.queue,
            "assignee": item.assignee,
            "escalate_to": item.escalate_to,
            "compliance_flags": item.compliance_flags,
            "enrichment": item.enrichment,
        }
        for item in processed
    ]

    (output_dir / "processed_incidents.json").write_text(
        json.dumps(processed_payload, indent=2),
        encoding="utf-8",
    )
    (output_dir / "dashboard_metrics.json").write_text(
        json.dumps(metrics, indent=2),
        encoding="utf-8",
    )
    (output_dir / "runbook_updates.md").write_text(runbook_md, encoding="utf-8")
