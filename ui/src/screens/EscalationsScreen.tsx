import { EscalationCard } from "../components/EscalationCard";
import { EscalationDetailPanel } from "../components/EscalationDetailPanel";
import type { Escalation, Severity } from "../types/models";

type Props = {
  escalations: Escalation[];
  selectedEscalationId: string;
  onSelectEscalation: (id: string) => void;
  runbookStateByEscalation: Record<string, Record<string, boolean>>;
  onToggleRunbook: (escalationId: string, stepId: string) => void;
  severityFilter: Severity | "All";
  onSeverityFilterChange: (value: Severity | "All") => void;
};

export function EscalationsScreen({
  escalations,
  selectedEscalationId,
  onSelectEscalation,
  runbookStateByEscalation,
  onToggleRunbook,
  severityFilter,
  onSeverityFilterChange,
}: Props) {
  const filtered = severityFilter === "All" ? escalations : escalations.filter((item) => item.severity === severityFilter);
  const selected = filtered.find((item) => item.id === selectedEscalationId) ?? filtered[0] ?? escalations[0];

  return (
    <div className="grid gap-4 xl:grid-cols-[360px,1fr]">
      <section className="space-y-3 rounded-xl border border-slate-800 bg-slate-900 p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-100">Active Escalations</h2>
          <select
            className="rounded-md border border-slate-700 bg-slate-950 px-2 py-1 text-xs text-slate-200"
            value={severityFilter}
            onChange={(event) => onSeverityFilterChange(event.target.value as Severity | "All")}
          >
            <option value="All">All severities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
        <div className="space-y-2">
          {filtered.map((escalation) => (
            <EscalationCard
              key={escalation.id}
              escalation={escalation}
              selected={selectedEscalationId === escalation.id}
              onSelect={onSelectEscalation}
            />
          ))}
        </div>
      </section>

      <EscalationDetailPanel
        escalation={selected}
        runbookState={runbookStateByEscalation[selected.id] ?? {}}
        onToggleRunbook={(stepId) => onToggleRunbook(selected.id, stepId)}
      />
    </div>
  );
}
