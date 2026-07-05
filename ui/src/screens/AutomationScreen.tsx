import { useMemo, useState } from "react";
import { AutomationBacklogTable } from "../components/AutomationBacklogTable";
import { automationBacklog } from "../data/mockData";

export function AutomationScreen() {
  const [descending, setDescending] = useState(true);
  const sortedRows = useMemo(
    () =>
      [...automationBacklog].sort((a, b) =>
        descending ? b.impactScore - a.impactScore : a.impactScore - b.impactScore,
      ),
    [descending],
  );
  return (
    <div className="space-y-4">
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
