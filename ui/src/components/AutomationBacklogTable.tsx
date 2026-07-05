import type { AutomationBacklogItem } from "../types/models";

type Props = {
  rows: AutomationBacklogItem[];
  onSortByImpact: () => void;
};

export function AutomationBacklogTable({ rows, onSortByImpact }: Props) {
  return (
    <section className="rounded-xl border border-slate-800 bg-slate-900 p-4">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-200">Automation Opportunity Backlog</h3>
        <button
          type="button"
          className="rounded-md border border-slate-700 px-2 py-1 text-xs text-slate-200 hover:border-blue-400"
          onClick={onSortByImpact}
        >
          Sort by impact score
        </button>
      </div>
      <div className="overflow-auto">
        <table className="w-full text-left text-sm">
          <thead className="text-slate-400">
            <tr>
              <th className="px-2 py-2">Manual task</th>
              <th className="px-2 py-2">Frequency</th>
              <th className="px-2 py-2">Time cost</th>
              <th className="px-2 py-2">Operational risk</th>
              <th className="px-2 py-2">Automation idea</th>
              <th className="px-2 py-2">Impact</th>
              <th className="px-2 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr className="border-t border-slate-800 text-slate-300" key={`${row.manualTask}-${row.status}`}>
                <td className="px-2 py-2">{row.manualTask}</td>
                <td className="px-2 py-2">{row.frequency}</td>
                <td className="px-2 py-2">{row.estimatedTimeCost}</td>
                <td className="px-2 py-2">{row.operationalRisk}</td>
                <td className="px-2 py-2">{row.automationIdea}</td>
                <td className="px-2 py-2">{row.impactScore}/10</td>
                <td className="px-2 py-2">{row.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
