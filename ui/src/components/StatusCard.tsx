import type { ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
};

export function StatusCard({ title, children }: Props) {
  return (
    <section className="rounded-xl border border-slate-800 bg-slate-900 p-4">
      <h3 className="mb-3 text-sm font-semibold text-slate-200">{title}</h3>
      <div className="space-y-2 text-sm text-slate-300">{children}</div>
    </section>
  );
}
