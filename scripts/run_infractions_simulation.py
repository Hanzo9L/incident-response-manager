import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from src.incident_manager import load_incidents, process_incident_batch, write_outputs


def _format_flags(incident) -> str:
    matches = incident.compliance.get("framework_matches", [])
    if not matches:
        return "none"
    return ", ".join(item["framework"] for item in matches)


def _format_list(values: list[str]) -> str:
    return ", ".join(values) if values else "none"


def write_trace(processed, output_path: Path) -> None:
    lines = [
        "# Infraction Simulation Trace",
        "",
        "This trace shows how each infraction moved through automation and where human action is required.",
        "",
    ]

    for item in processed:
        lines.extend(
            [
                f"## {item.incident_id}",
                f"- Priority: `{item.triage['priority']}` (score={item.triage['score']}, confidence={item.triage['confidence']}, abstained={item.triage['abstained']})",
                f"- Queue and assignment: `{item.assignment['queue']}` -> `{item.assignment['assignee']}` (backup: `{item.assignment['backup_assignee']}`)",
                f"- SLA risk: `at_risk={item.sla['at_risk']}` reasons: {_format_list(item.sla.get('risk_reasons', []))}",
                f"- Escalation partners: {_format_list(item.escalation.get('suggested_partners', []))}",
                f"- Missing approvals: {_format_list(item.escalation.get('missing_approvals', []))}",
                f"- Compliance framework flags: {_format_flags(item)}",
                f"- Suggested next actions: {_format_list(item.enrichment.get('suggested_next_actions', []))}",
                "",
            ]
        )

    output_path.write_text("\n".join(lines), encoding="utf-8")


def main() -> None:
    input_path = ROOT / "data" / "infractions.sample.jsonl"
    output_path = ROOT / "outputs"

    incidents = load_incidents(input_path)
    processed, metrics, runbook_md = process_incident_batch(incidents)
    write_outputs(processed, metrics, runbook_md, output_path)
    write_trace(processed, output_path / "infractions_simulation_trace.md")

    print(f"Processed infractions: {len(processed)}")
    print(f"Trace written to: {output_path / 'infractions_simulation_trace.md'}")
    print(f"Metrics written to: {output_path / 'dashboard_metrics.json'}")


if __name__ == "__main__":
    main()
