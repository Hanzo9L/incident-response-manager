import type { Escalation } from "../types/models";

type Props = {
  escalation: Escalation;
  selected: boolean;
  onSelect: (id: string) => void;
};

const sevTone: Record<Escalation["severity"], string> = {
  High: "bg-red-500/20 text-red-200",
  Medium: "bg-amber-500/20 text-amber-200",
  Low: "bg-emerald-500/20 text-emerald-200",
};

export function EscalationCard({ escalation, selected, onSelect }: Props) {
  return (
    <button
      type="button"
      className={`w-full rounded-xl border p-4 text-left transition ${
        selected
          ? "border-blue-400/60 bg-blue-500/10"
          : "border-slate-800 bg-slate-900 hover:border-slate-700"
      }`}
      onClick={() => onSelect(escalation.id)}
    >
      <div className="mb-2 flex items-center justify-between">
        <p className="font-semibold text-slate-100">{escalation.id}</p>
        <span className={`rounded-full px-2 py-1 text-xs ${sevTone[escalation.severity]}`}>
          {escalation.severity}
        </span>
      </div>
      <p className="text-xs text-slate-400">{escalation.status}</p>
      <p className="mt-2 text-sm text-slate-300">{escalation.summary}</p>
      <p className="mt-2 text-xs text-slate-400">Next decision: {escalation.nextDecision}</p>
    </button>
  );
}
