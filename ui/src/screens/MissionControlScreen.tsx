import { CoverageConfidenceCard } from "../components/CoverageConfidenceCard";
import { LeadershipSummaryCard } from "../components/LeadershipSummaryCard";
import { MetricCard } from "../components/MetricCard";
import { StatusCard } from "../components/StatusCard";
import { missionControlCards, coverageConfidence } from "../data/selectors";
import { onCallInfo } from "../data/mockData";

export function MissionControlScreen() {
  const cards = missionControlCards();
  const confidence = coverageConfidence();
  return (
    <div className="space-y-4">
      <div className="grid gap-4 xl:grid-cols-3">
        <StatusCard title="Current On-Call Owner">
          <p>Primary: {onCallInfo.primary}</p>
          <p>Backup: {onCallInfo.backup}</p>
          <p>Shift: {onCallInfo.shift}</p>
          <p>Status: {onCallInfo.status}</p>
        </StatusCard>
        <StatusCard title="Active Sensitive Escalations">
          <p>Total active: {cards.activeSensitiveEscalations.total}</p>
          <p>High severity: {cards.activeSensitiveEscalations.high}</p>
          <p>Medium severity: {cards.activeSensitiveEscalations.medium}</p>
          <p>Low severity: {cards.activeSensitiveEscalations.low}</p>
        </StatusCard>
        <CoverageConfidenceCard score={confidence.score} status={confidence.status} reasons={confidence.reasons} />
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Median first response"
          value={cards.responseHealth.medianFirstResponse}
          helper={`Target: ${cards.responseHealth.target}`}
        />
        <MetricCard label="SLA status" value={cards.responseHealth.slaStatus} />
        <MetricCard
          label="Open tooling issues"
          value={cards.openToolingIssues.active}
          helper={`${cards.openToolingIssues.severeImpact} severe operational impact`}
        />
        <MetricCard
          label="External referral review volume"
          value={cards.referralReviewVolume.thisWeek}
          helper={`Completed ${cards.referralReviewVolume.completed}, pending legal ${cards.referralReviewVolume.pendingLegal}`}
        />
      </div>

      <LeadershipSummaryCard text="Operational health is currently in caution status. First response remains within target, but decision time has increased due to cross-functional review dependencies. Weekend coverage is adequate, but backup depth is thin. Tooling latency is creating avoidable triage friction." />
    </div>
  );
}
