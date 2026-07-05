import type { Escalation, Runbook, Severity } from "../types/models";
import { coverageGaps, escalations, referralReviewVolume, runbooks, toolingIssues } from "./mockData";

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
