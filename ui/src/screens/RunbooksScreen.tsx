import { useMemo, useState } from "react";
import { runbooks } from "../data/mockData";

export function RunbooksScreen() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(runbooks[0].id);
  const filtered = useMemo(
    () =>
      runbooks.filter((runbook) => runbook.title.toLowerCase().includes(query.toLowerCase().trim())),
    [query],
  );
  const selected = filtered.find((item) => item.id === selectedId) ?? filtered[0];

  return (
    <div className="grid gap-4 xl:grid-cols-[320px,1fr]">
      <section className="rounded-xl border border-slate-800 bg-slate-900 p-4">
        <h2 className="mb-2 text-sm font-semibold text-slate-100">Runbook and SOP Center</h2>
        <input
          className="mb-3 w-full rounded-md border border-slate-700 bg-slate-950 px-2 py-1 text-sm text-slate-100"
          placeholder="Search runbooks"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <div className="space-y-2">
          {filtered.map((runbook) => (
            <button
              type="button"
              key={runbook.id}
              className={`w-full rounded-md border p-2 text-left text-sm ${
                selected?.id === runbook.id
                  ? "border-blue-400/60 bg-blue-500/10 text-slate-100"
                  : "border-slate-700 text-slate-300 hover:border-slate-600"
              }`}
              onClick={() => setSelectedId(runbook.id)}
            >
              {runbook.title}
            </button>
          ))}
        </div>
      </section>

      {selected ? (
        <section className="rounded-xl border border-slate-800 bg-slate-900 p-4">
          <h3 className="text-lg font-semibold text-slate-100">{selected.title}</h3>
          <p className="mt-2 text-sm text-slate-300">{selected.purpose}</p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <article>
              <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-400">Trigger criteria</h4>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-300">
                {selected.triggerCriteria.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article>
              <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-400">Required stakeholders</h4>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-300">
                {selected.requiredStakeholders.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>
          <article className="mt-4">
            <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-400">Required steps</h4>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-300">
              {selected.requiredSteps.map((step) => (
                <li key={step.id}>{step.text}</li>
              ))}
            </ul>
          </article>
        </section>
      ) : null}
    </div>
  );
}
