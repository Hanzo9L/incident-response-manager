type Props = {
  title?: string;
  text: string;
};

export function LeadershipSummaryCard({ title = "Leadership Summary", text }: Props) {
  return (
    <section className="rounded-xl border border-slate-800 bg-slate-900 p-4">
      <h3 className="mb-2 text-sm font-semibold text-slate-200">{title}</h3>
      <p className="text-sm leading-relaxed text-slate-300">{text}</p>
    </section>
  );
}
