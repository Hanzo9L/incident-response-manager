import { useMemo, useState } from "react";
import type { Escalation } from "../types/models";

type Props = { escalations: Escalation[] };

export function DecisionBriefGenerator({ escalations }: Props) {
  const [selectedId, setSelectedId] = useState(escalations[0]?.id ?? "");
  const [generated, setGenerated] = useState(false);
  const escalation = useMemo(
    () => escalations.find((item) => item.id === selectedId) ?? escalations[0],
    [escalations, selectedId],
  );

  const brief = escalation
    ? `Current Situation: ${escalation.leadershipUpdate.currentSituation}

Known Facts: ${escalation.leadershipUpdate.knownFacts}

Unknowns: ${escalation.leadershipUpdate.unknowns}

Decision Needed: ${escalation.nextDecision}

Recommended Action: ${escalation.leadershipUpdate.recommendedAction}

Trade-offs: ${escalation.tradeoffs.join(" ")}

Stakeholders Engaged: ${escalation.teamsEngaged.join(", ")}

Referral Review Status: ${escalation.referralStatus}

Next Update Time: ${escalation.leadershipUpdate.nextUpdate}`
    : "";

  const copyBrief = async () => {
    if (!brief) return;
    await navigator.clipboard.writeText(brief);
  };

  return (
    <section className="space-y-4 rounded-xl border border-slate-800 bg-slate-900 p-4">
      <h3 className="text-lg font-semibold text-slate-100">Decision Brief Generator</h3>
      <div className="flex flex-wrap items-center gap-2">
        <label className="text-sm text-slate-300">Active Escalation:</label>
        <select
          className="rounded-md border border-slate-700 bg-slate-950 px-2 py-1 text-sm text-slate-100"
          value={selectedId}
          onChange={(event) => setSelectedId(event.target.value)}
        >
          {escalations.map((item) => (
            <option value={item.id} key={item.id}>
              {item.id} - {item.severity}
            </option>
          ))}
        </select>
        <button
          type="button"
          className="rounded-md bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-500"
          onClick={() => setGenerated(true)}
        >
          Generate Decision Brief
        </button>
      </div>

      {generated ? (
        <div className="rounded-lg border border-slate-700 bg-slate-950 p-4">
          <pre className="whitespace-pre-wrap text-sm leading-relaxed text-slate-200">{brief}</pre>
          <button
            type="button"
            className="mt-3 rounded-md border border-slate-600 px-3 py-1 text-sm text-slate-200 hover:border-blue-400"
            onClick={copyBrief}
          >
            Copy Brief
          </button>
        </div>
      ) : null}
    </section>
  );
}
