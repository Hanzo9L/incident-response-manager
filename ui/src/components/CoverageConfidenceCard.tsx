type Props = {
  score: number;
  status: string;
  reasons: string[];
};

export function CoverageConfidenceCard({ score, status, reasons }: Props) {
  return (
    <section className="rounded-xl border border-slate-800 bg-slate-900 p-4">
      <h3 className="text-sm font-semibold text-slate-200">Coverage Confidence</h3>
      <div className="mt-2 flex items-end justify-between">
        <p className="text-3xl font-semibold text-slate-100">{score}%</p>
        <span className="rounded-full bg-amber-500/20 px-2 py-1 text-xs text-amber-200">{status}</span>
      </div>
      <ul className="mt-3 list-disc space-y-1 pl-5 text-xs text-slate-300">
        {reasons.map((reason) => (
          <li key={reason}>{reason}</li>
        ))}
      </ul>
    </section>
  );
}
