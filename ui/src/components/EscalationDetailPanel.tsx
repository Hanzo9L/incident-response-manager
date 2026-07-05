import { getRunbookById } from "../data/selectors";
import type { Escalation } from "../types/models";
import { AutomatedFlowPanel } from "./AutomatedFlowPanel";
import { RunbookChecklist } from "./RunbookChecklist";
import { StakeholderStatusList } from "./StakeholderStatusList";
import { TimelineLog } from "./TimelineLog";

type Props = {
  escalation: Escalation;
  runbookState: Record<string, boolean>;
  onToggleRunbook: (stepId: string) => void;
};

export function EscalationDetailPanel({ escalation, runbookState, onToggleRunbook }: Props) {
  const runbook = getRunbookById(escalation.runbookId);
  return (
    <div className="space-y-4">
      <section className="rounded-xl border border-slate-800 bg-slate-900 p-4">
        <h3 className="mb-2 text-sm font-semibold text-slate-200">Situation</h3>
        <p className="text-sm text-slate-300">{escalation.summary}</p>
        <p className="mt-2 text-xs text-slate-400">Operational posture: {escalation.operationalPosture}</p>
      </section>

      <AutomatedFlowPanel escalation={escalation} />

      <section className="rounded-xl border border-slate-800 bg-slate-900 p-4">
        <h3 className="mb-2 text-sm font-semibold text-slate-200">Decision Frame</h3>
        <div className="grid gap-3 lg:grid-cols-3">
          <article className="rounded-lg border border-slate-800 p-3">
            <p className="text-sm font-medium text-slate-100">Option A</p>
            <p className="mt-1 text-xs text-slate-300">Wait for full Legal review before mitigation.</p>
            <p className="mt-1 text-xs text-slate-400">
              Benefit: Lowest risk of over-action. Trade-off: Longer exposure window.
            </p>
          </article>
          <article className="rounded-lg border border-slate-800 p-3">
            <p className="text-sm font-medium text-slate-100">Option B</p>
            <p className="mt-1 text-xs text-slate-300">Apply temporary mitigation while Legal review completes.</p>
            <p className="mt-1 text-xs text-slate-400">
              Benefit: Reduces immediate platform risk. Trade-off: Possible user friction if downgraded.
            </p>
          </article>
          <article className="rounded-lg border border-slate-800 p-3">
            <p className="text-sm font-medium text-slate-100">Option C</p>
            <p className="mt-1 text-xs text-slate-300">Escalate to executive review before action.</p>
            <p className="mt-1 text-xs text-slate-400">
              Benefit: Strong alignment on sensitive decision. Trade-off: Slower response.
            </p>
          </article>
        </div>
      </section>

      <section className="rounded-xl border border-slate-800 bg-slate-900 p-4">
        <h3 className="mb-2 text-sm font-semibold text-slate-200">Stakeholders</h3>
        <StakeholderStatusList items={escalation.stakeholders} />
      </section>

      <section className="rounded-xl border border-slate-800 bg-slate-900 p-4">
        <h3 className="mb-2 text-sm font-semibold text-slate-200">Timeline</h3>
        <TimelineLog events={escalation.timeline} />
      </section>

      <RunbookChecklist runbook={runbook} checked={runbookState} onToggle={onToggleRunbook} />

      <section className="rounded-xl border border-slate-800 bg-slate-900 p-4">
        <h3 className="mb-2 text-sm font-semibold text-slate-200">Leadership Update</h3>
        <p className="text-sm text-slate-300">
          <span className="font-medium text-slate-100">Current Situation:</span>{" "}
          {escalation.leadershipUpdate.currentSituation}
        </p>
        <p className="mt-2 text-sm text-slate-300">
          <span className="font-medium text-slate-100">Known Facts:</span>{" "}
          {escalation.leadershipUpdate.knownFacts}
        </p>
        <p className="mt-2 text-sm text-slate-300">
          <span className="font-medium text-slate-100">Unknowns:</span> {escalation.leadershipUpdate.unknowns}
        </p>
        <p className="mt-2 text-sm text-slate-300">
          <span className="font-medium text-slate-100">Recommended Action:</span>{" "}
          {escalation.leadershipUpdate.recommendedAction}
        </p>
        <p className="mt-2 text-sm text-slate-300">
          <span className="font-medium text-slate-100">Trade-off:</span>{" "}
          {escalation.leadershipUpdate.tradeoff}
        </p>
        <p className="mt-2 text-sm text-slate-300">
          <span className="font-medium text-slate-100">Next Update:</span>{" "}
          {escalation.leadershipUpdate.nextUpdate}
        </p>
      </section>
    </div>
  );
}
