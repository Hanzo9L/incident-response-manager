import { CoverageConfidenceCard } from "../components/CoverageConfidenceCard";
import { LeadershipSummaryCard } from "../components/LeadershipSummaryCard";
import { MetricCard } from "../components/MetricCard";
import { StatusCard } from "../components/StatusCard";
import { missionControlCards, coverageConfidence } from "../data/selectors";
import { caseIntakeSources, onCallInfo } from "../data/mockData";

export function MissionControlScreen() {
  const cards = missionControlCards();
  const confidence = coverageConfidence();
  const slaTone =
    cards.responseHealth.slaMisses >= 4 ? "critical" : cards.responseHealth.slaMisses >= 2 ? "warn" : "good";
  const highSeverityTone = cards.activeSensitiveEscalations.high >= 2 ? "critical" : "warn";
  const toolingTone = cards.openToolingIssues.severeImpact > 0 ? "warn" : "good";

  return (
    <div className="space-y-4">
      <section className="rounded-xl border border-rose-500/40 bg-rose-500/10 p-4">
        <h3 className="text-sm font-semibold text-rose-100">Operational Attention</h3>
        <p className="mt-1 text-sm text-rose-50">
          {cards.responseHealth.slaMisses} SLA misses this week and {cards.activeSensitiveEscalations.high} high-severity
          active escalations require active on-call oversight.
        </p>
      </section>

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

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <MetricCard
          label="Median first response"
          value={cards.responseHealth.medianFirstResponse}
          helper={`Target: ${cards.responseHealth.target}`}
          tone={cards.responseHealth.firstResponseMinutes <= 15 ? "good" : "warn"}
        />
        <MetricCard
          label="SLA misses (weekly)"
          value={cards.responseHealth.slaMisses}
          helper={cards.responseHealth.slaStatus}
          tone={slaTone}
        />
        <MetricCard
          label="High-severity active cases"
          value={cards.activeSensitiveEscalations.high}
          helper={`Total active: ${cards.activeSensitiveEscalations.total}`}
          tone={highSeverityTone}
        />
        <MetricCard
          label="Open tooling issues"
          value={cards.openToolingIssues.active}
          helper={`${cards.openToolingIssues.severeImpact} severe operational impact`}
          tone={toolingTone}
        />
        <MetricCard
          label="External referral review volume"
          value={cards.referralReviewVolume.thisWeek}
          helper={`Completed ${cards.referralReviewVolume.completed}, pending legal ${cards.referralReviewVolume.pendingLegal}`}
          tone="warn"
        />
      </div>

      <section className="rounded-xl border border-slate-800 bg-slate-900 p-4">
        <h3 className="mb-2 text-sm font-semibold text-slate-200">How cases come in</h3>
        <p className="mb-3 text-sm text-slate-300">
          Cases are opened from multiple inputs, normalized into an escalation record, and then routed to on-call for
          severity validation and ownership assignment.
        </p>
        <div className="grid gap-3 md:grid-cols-2">
          {caseIntakeSources.map((item) => (
            <article key={item.source} className="rounded-lg border border-slate-800 bg-slate-950 p-3">
              <p className="text-sm font-medium text-slate-100">{item.source}</p>
              <p className="mt-1 text-xs text-slate-300">{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <LeadershipSummaryCard text="Operational health is currently in caution status. First response remains within target, but decision time has increased due to cross-functional review dependencies. Weekend coverage is adequate, but backup depth is thin. Tooling latency is creating avoidable triage friction." />
    </div>
  );
}
