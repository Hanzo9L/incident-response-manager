import type { Runbook } from "../types/models";

type Props = {
  runbook: Runbook;
  checked: Record<string, boolean>;
  onToggle: (stepId: string) => void;
};

export function RunbookChecklist({ runbook, checked, onToggle }: Props) {
  const completed = runbook.requiredSteps.filter((step) => checked[step.id]).length;
  return (
    <section className="rounded-xl border border-slate-800 bg-slate-900 p-4">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-200">Runbook</h3>
        <span className="text-xs text-slate-400">
          Completion: {completed} of {runbook.requiredSteps.length}
        </span>
      </div>
      <p className="mb-3 text-sm text-slate-300">{runbook.title}</p>
      <ul className="space-y-2">
        {runbook.requiredSteps.map((step) => (
          <li key={step.id} className="flex items-start gap-2 text-sm text-slate-300">
            <input
              className="mt-1"
              type="checkbox"
              checked={Boolean(checked[step.id])}
              onChange={() => onToggle(step.id)}
            />
            <span>{step.text}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
