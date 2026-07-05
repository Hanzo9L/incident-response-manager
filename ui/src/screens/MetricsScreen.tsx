import { Suspense, lazy } from "react";
import { LeadershipSummaryCard } from "../components/LeadershipSummaryCard";
import { MetricCard } from "../components/MetricCard";
import { metricsTrend, whatLeadershipNeedsToKnow } from "../data/mockData";

const TrendChart = lazy(() =>
  import("../components/TrendChart").then((module) => ({ default: module.TrendChart })),
);

export function MetricsScreen() {
  const latest = metricsTrend[metricsTrend.length - 1];
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <MetricCard label="Inbound escalation volume" value={latest.inboundEscalations} />
        <MetricCard label="Median first response" value={`${latest.firstResponseMinutes} min`} />
        <MetricCard label="Median time to decision" value={`${latest.timeToDecisionMinutes} min`} />
        <MetricCard label="Weekend volume" value={latest.weekendVolume} />
        <MetricCard label="SLA misses" value={latest.slaMisses} />
      </div>
      <Suspense
        fallback={
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-4 text-sm text-slate-300">
            Loading trend chart...
          </div>
        }
      >
        <TrendChart data={metricsTrend} />
      </Suspense>
      <LeadershipSummaryCard title="What Leadership Needs to Know" text={whatLeadershipNeedsToKnow} />
    </div>
  );
}
