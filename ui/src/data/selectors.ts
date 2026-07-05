import type { Escalation, ProgramMaturityMetric, Runbook, Severity } from "../types/models";
import {
  automationBacklog,
  coverageGaps,
  escalations,
  metricsTrend,
  referralReviewVolume,
  runbooks,
  toolingIssues,
} from "./mockData";

export const severityOrder: Severity[] = ["High", "Medium", "Low"];

export function countEscalationsBySeverity(items: Escalation[]) {
  return {
    total: items.length,
    high: items.filter((item) => item.severity === "High").length,
    medium: items.filter((item) => item.severity === "Medium").length,
    low: items.filter((item) => item.severity === "Low").length,
  };
}

export function coverageConfidence() {
  const baseline = 84;
  const penalty = coverageGaps.length * 3;
  const toolingPenalty = toolingIssues.filter((issue) => issue.severity === "High").length * 6;
  const score = Math.max(58, baseline - penalty - toolingPenalty);
  return {
    score,
    status: score >= 80 ? "Healthy" : score >= 70 ? "Caution" : "At Risk",
    reasons: [
      "Weekend primary is covered",
      "Backup gap Sunday 8 PM to midnight",
      "Legal escalation backup assigned",
      "Policy reviewer unavailable during expected peak",
      "Tooling latency affecting triage queue",
    ],
  };
}

export function getEscalationById(id: string): Escalation {
  return escalations.find((item) => item.id === id) ?? escalations[0];
}

export function getRunbookById(id: string): Runbook {
  return runbooks.find((item) => item.id === id) ?? runbooks[0];
}

export function missionControlCards() {
  const sev = countEscalationsBySeverity(escalations);
  return {
    activeSensitiveEscalations: sev,
    responseHealth: {
      medianFirstResponse: "11 minutes",
      target: "15 minutes",
      slaStatus: "On target",
    },
    openToolingIssues: {
      active: toolingIssues.length,
      severeImpact: toolingIssues.filter((issue) => issue.severity === "High").length,
      engineeringOwned: toolingIssues.length - 1,
      workaroundInPlace: 1,
    },
    referralReviewVolume,
  };
}

export function programMaturityScorecard(): ProgramMaturityMetric[] {
  const latest = metricsTrend[metricsTrend.length - 1];
  const baseAutomationCoverage = Math.round((latest.automationSavingsHours / 10) * 100);
  const highImpactReady = automationBacklog.filter((item) => item.impactScore >= 9).length;
  const highSeverityTooling = toolingIssues.filter((issue) => issue.severity === "High").length;

  const metrics: ProgramMaturityMetric[] = [
    {
      id: "automation-coverage",
      label: "Automation Coverage",
      score: Math.min(92, Math.max(58, baseAutomationCoverage)),
      status: baseAutomationCoverage >= 75 ? "Strong" : "Caution",
      represents:
        "How much repetitive on-call work has been shifted from manual execution to reliable automation.",
    },
    {
      id: "runbook-discipline",
      label: "Runbook Discipline",
      score: latest.runbookCompliance,
      status: latest.runbookCompliance >= 85 ? "Strong" : "Caution",
      represents:
        "How consistently incidents follow SOP checklists, which reduces variability during high-pressure moments.",
    },
    {
      id: "decision-latency",
      label: "Decision Latency Readiness",
      score: Math.max(45, 100 - latest.timeToDecisionMinutes),
      status: latest.timeToDecisionMinutes <= 45 ? "Strong" : "Caution",
      represents:
        "How quickly the operation turns signals into decisions with cross-functional alignment and clear ownership.",
    },
    {
      id: "tooling-reliability",
      label: "Tooling Reliability",
      score: Math.max(40, 86 - highSeverityTooling * 12),
      status: highSeverityTooling === 0 ? "Strong" : highSeverityTooling === 1 ? "Caution" : "Needs investment",
      represents:
        "How stable the operational toolchain is for triage, routing, and assignment during peak enforcement load.",
    },
    {
      id: "program-scalability",
      label: "Program Scalability",
      score: Math.min(90, 68 + highImpactReady * 6),
      status: highImpactReady >= 2 ? "Caution" : "Needs investment",
      represents:
        "How prepared the program is to absorb volume growth through automation roadmap execution and staffing design.",
    },
  ];

  return metrics;
}
