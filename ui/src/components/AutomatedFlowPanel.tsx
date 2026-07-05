import { useMemo, useState } from "react";
import type { Escalation } from "../types/models";

type FlowStep = {
  id: string;
  label: string;
  ownerType: "Automated" | "Human";
  description: string;
};

function getFlowSteps(escalation: Escalation): FlowStep[] {
  return [
    {
      id: "intake",
      label: "Intake normalization",
      ownerType: "Automated",
      description: `Open escalation record for ${escalation.id} and normalize incoming signals.`,
    },
    {
      id: "triage",
      label: "Triage and severity proposal",
      ownerType: "Automated",
      description: `Propose ${escalation.severity} severity and route to ${escalation.owner}.`,
    },
    {
      id: "assignment",
      label: "On-call assignment and update SLA",
      ownerType: "Automated",
      description: `Assign owner and set next update timer (${escalation.nextUpdateDueMinutes} minutes).`,
    },
    {
      id: "cross-functional",
      label: "Cross-functional engagement",
      ownerType: "Human",
      description: `Confirm engaged teams: ${escalation.teamsEngaged.join(", ")}.`,
    },
    {
      id: "referral-gate",
      label: "Referral review gate",
      ownerType: "Human",
      description: `${escalation.referralStatus}. External referral outcomes remain human-owned.`,
    },
    {
      id: "leadership-draft",
      label: "Leadership update draft",
      ownerType: "Automated",
      description: "Draft situation, recommendation, and trade-off summary for executive updates.",
    },
    {
      id: "decision-log",
      label: "Decision record and next action",
      ownerType: "Human",
      description: `Finalize decision for: ${escalation.nextDecision}.`,
    },
  ];
}

export function AutomatedFlowPanel({ escalation }: { escalation: Escalation }) {
  const steps = useMemo(() => getFlowSteps(escalation), [escalation]);
  const [activeStep, setActiveStep] = useState(0);

  const advance = () => setActiveStep((current) => Math.min(current + 1, steps.length - 1));
  const reset = () => setActiveStep(0);

  return (
    <section className="rounded-xl border border-slate-800 bg-slate-900 p-4">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-slate-200">Automated Flow ({escalation.id})</h3>
          <p className="text-xs text-slate-400">
            Workflow simulation: automation handles repeatable ops; sensitive decisions remain human-owned.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={advance}
            className="rounded-md bg-blue-600 px-2 py-1 text-xs text-white hover:bg-blue-500"
          >
            Advance
          </button>
          <button
            type="button"
            onClick={reset}
            className="rounded-md border border-slate-700 px-2 py-1 text-xs text-slate-200 hover:border-slate-500"
          >
            Reset
          </button>
        </div>
      </div>

      <ol className="space-y-2">
        {steps.map((step, index) => {
          const status = index < activeStep ? "Complete" : index === activeStep ? "Active" : "Pending";
          const statusTone =
            status === "Complete"
              ? "bg-emerald-500/20 text-emerald-200"
              : status === "Active"
                ? "bg-amber-500/20 text-amber-200"
                : "bg-slate-800 text-slate-300";

          return (
            <li key={step.id} className="rounded-lg border border-slate-800 p-3">
              <div className="mb-1 flex flex-wrap items-center gap-2">
                <span className="text-xs text-slate-500">Step {index + 1}</span>
                <span className={`rounded-full px-2 py-0.5 text-[11px] ${statusTone}`}>{status}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[11px] ${
                    step.ownerType === "Automated"
                      ? "bg-blue-500/20 text-blue-200"
                      : "bg-violet-500/20 text-violet-200"
                  }`}
                >
                  {step.ownerType}
                </span>
              </div>
              <p className="text-sm font-medium text-slate-100">{step.label}</p>
              <p className="mt-1 text-xs text-slate-300">{step.description}</p>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
