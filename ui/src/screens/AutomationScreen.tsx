import { useMemo, useState } from "react";
import { AutomationBacklogTable } from "../components/AutomationBacklogTable";
import { ProgramMaturityScorecard } from "../components/ProgramMaturityScorecard";
import { automationBacklog } from "../data/mockData";
import { programMaturityScorecard } from "../data/selectors";

export function AutomationScreen() {
  const [descending, setDescending] = useState(true);
  const maturityMetrics = useMemo(() => programMaturityScorecard(), []);
  const sortedRows = useMemo(
    () =>
      [...automationBacklog].sort((a, b) =>
        descending ? b.impactScore - a.impactScore : a.impactScore - b.impactScore,
      ),
    [descending],
  );
  return (
    <div className="space-y-4">
      <ProgramMaturityScorecard metrics={maturityMetrics} />
      <section className="rounded-xl border border-slate-800 bg-slate-900 p-4">
        <h3 className="mb-2 text-sm font-semibold text-slate-200">What this represents</h3>
        <p className="text-sm text-slate-300">
          This scorecard represents how mature the enforcement operation is at scale: whether repetitive work is
          automated, runbooks are consistently followed, decisions are made quickly with the right stakeholders,
          tooling stays reliable under load, and the program can absorb growth without losing quality.
        </p>
      </section>
      <AutomationBacklogTable rows={sortedRows} onSortByImpact={() => setDescending((prev) => !prev)} />
      <section className="rounded-xl border border-slate-800 bg-slate-900 p-4">
        <h3 className="mb-2 text-sm font-semibold text-slate-200">Program Maturity Roadmap</h3>
        <ol className="list-decimal space-y-1 pl-5 text-sm text-slate-300">
          <li>Stabilize on-call coverage and runbooks</li>
          <li>Standardize escalation decision records</li>
          <li>Automate repetitive documentation and routing</li>
          <li>Improve metrics and staffing forecasts</li>
          <li>Mature executive reporting and trend analysis</li>
        </ol>
      </section>
    </div>
  );
}
