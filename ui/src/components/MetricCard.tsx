type Props = {
  label: string;
  value: string | number;
  helper?: string;
  tone?: "neutral" | "good" | "warn" | "critical";
};

const toneStyles: Record<NonNullable<Props["tone"]>, string> = {
  neutral: "border-slate-800 bg-slate-900 text-slate-100",
  good: "border-emerald-500/40 bg-emerald-500/10 text-emerald-100",
  warn: "border-amber-500/50 bg-amber-500/15 text-amber-100",
  critical: "border-rose-500/60 bg-rose-500/15 text-rose-100",
};

export function MetricCard({ label, value, helper, tone = "neutral" }: Props) {
  const toneClass = toneStyles[tone];
  return (
    <div className={`rounded-xl border p-4 transition ${toneClass}`}>
      <p className="text-xs uppercase tracking-wide text-slate-300/90">{label}</p>
      <p className="mt-1 text-2xl font-semibold">{value}</p>
      {helper ? <p className="mt-1 text-xs text-slate-200/80">{helper}</p> : null}
    </div>
  );
}
