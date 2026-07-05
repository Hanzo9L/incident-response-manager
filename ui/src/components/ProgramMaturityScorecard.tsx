import type { ProgramMaturityMetric } from "../types/models";

type Props = {
  metrics: ProgramMaturityMetric[];
};

const toneByStatus: Record<ProgramMaturityMetric["status"], string> = {
  Strong: "bg-emerald-500/15 text-emerald-200 border-emerald-400/20",
  Caution: "bg-amber-500/15 text-amber-200 border-amber-400/20",
  "Needs investment": "bg-rose-500/15 text-rose-200 border-rose-400/20",
};

export function ProgramMaturityScorecard({ metrics }: Props) {
  const overall = Math.round(metrics.reduce((acc, item) => acc + item.score, 0) / metrics.length);
  return (
    <section className="rounded-xl border border-slate-800 bg-slate-900 p-4">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-slate-200">Program Maturity Scorecard</h3>
          <p className="text-xs text-slate-400">
            Represents operational readiness across automation, consistency, decision speed, tooling, and scale.
          </p>
        </div>
        <span className="rounded-full bg-blue-500/20 px-2 py-1 text-xs text-blue-100">Overall: {overall}%</span>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {metrics.map((item) => (
          <article key={item.id} className="rounded-lg border border-slate-800 bg-slate-950 p-3">
            <div className="mb-1 flex items-center justify-between">
              <p className="text-sm font-medium text-slate-100">{item.label}</p>
              <span className="text-lg font-semibold text-slate-100">{item.score}%</span>
            </div>
            <span className={`inline-block rounded-full border px-2 py-0.5 text-[11px] ${toneByStatus[item.status]}`}>
              {item.status}
            </span>
            <p className="mt-2 text-xs leading-relaxed text-slate-300">{item.represents}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
