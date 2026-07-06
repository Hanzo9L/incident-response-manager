type FlowStep = {
  id: string;
  title: string;
  description: string;
  mode: "Current mock data" | "Future API call";
};

const processFlow: FlowStep[] = [
  {
    id: "intake",
    title: "Case Intake",
    description: "Signals from user reports, guardrail alerts, Trust Ops queue, or tooling alerts open an escalation record.",
    mode: "Current mock data",
  },
  {
    id: "normalize",
    title: "Signal Normalization",
    description: "Incoming context is normalized into a shared record shape for triage and ownership assignment.",
    mode: "Future API call",
  },
  {
    id: "triage",
    title: "Triage and Severity Proposal",
    description: "The system proposes severity and highlights risk indicators for rapid on-call review.",
    mode: "Future API call",
  },
  {
    id: "assignment",
    title: "Owner Assignment and SLA Timer",
    description: "Primary owner, backup owner, and next update due window are set for case accountability.",
    mode: "Future API call",
  },
  {
    id: "xfn",
    title: "Cross-Functional Coordination",
    description: "Policy, Legal, Product, Comms, and Engineering are engaged based on case posture and risk.",
    mode: "Current mock data",
  },
  {
    id: "policyAssist",
    title: "Policy Assist Signal Check",
    description: "A policy-assist layer can flag criteria signals and missing evidence fields for human review.",
    mode: "Future API call",
  },
  {
    id: "humanGate",
    title: "Human Legal Decision Gate",
    description: "Referral outcomes remain human-owned; legal reviewers confirm criteria and decision rationale.",
    mode: "Current mock data",
  },
  {
    id: "leadership",
    title: "Leadership Brief Draft",
    description: "Decision-ready summary is generated with known facts, unknowns, recommendation, and trade-off.",
    mode: "Current mock data",
  },
  {
    id: "closeout",
    title: "Closeout and Runbook Logging",
    description: "Outcome, checklist completion, and follow-up actions are logged for consistency and auditability.",
    mode: "Current mock data",
  },
];

type DecisionNode = {
  condition: string;
  yesPath: string;
  noPath: string;
  note: string;
};

const decisionTree: DecisionNode[] = [
  {
    condition: "Severity is High?",
    yesPath: "Engage Policy, Legal, Product, and Comms immediately.",
    noPath: "Continue with scaled stakeholder set (Safeguards + Engineering/Policy as needed).",
    note: "Keeps escalation surface proportional to risk.",
  },
  {
    condition: "Referral review required?",
    yesPath: "Route to human legal gate and criteria checklist.",
    noPath: "Proceed with mitigation and monitoring path.",
    note: "No autonomous external referral actions.",
  },
  {
    condition: "Criteria complete?",
    yesPath: "Log outcome and move to leadership update cycle.",
    noPath: "Loop to evidence collection and re-review.",
    note: "Avoids incomplete documentation risk.",
  },
];

export function ProcessFlowScreen() {
  return (
    <div className="space-y-4">
      <section className="rounded-xl border border-slate-800 bg-slate-900 p-4">
        <h3 className="text-lg font-semibold text-slate-100">End-to-End Process Flow</h3>
        <p className="mt-1 text-sm text-slate-300">
          This view turns the README diagrams into an operator-readable sequence, including where future integrations
          can be called via API.
        </p>
      </section>

      <section className="rounded-xl border border-slate-800 bg-slate-900 p-4">
        <h4 className="mb-3 text-sm font-semibold text-slate-200">Flow stages</h4>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {processFlow.map((step, index) => (
            <article key={step.id} className="rounded-lg border border-slate-800 bg-slate-950 p-3">
              <div className="mb-2 flex items-center justify-between gap-2">
                <span className="text-xs text-slate-500">Step {index + 1}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[11px] ${
                    step.mode === "Future API call"
                      ? "bg-blue-500/20 text-blue-200"
                      : "bg-slate-700 text-slate-200"
                  }`}
                >
                  {step.mode}
                </span>
              </div>
              <p className="text-sm font-medium text-slate-100">{step.title}</p>
              <p className="mt-1 text-xs text-slate-300">{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-slate-800 bg-slate-900 p-4">
        <h4 className="mb-3 text-sm font-semibold text-slate-200">Decision tree checkpoints</h4>
        <div className="space-y-3">
          {decisionTree.map((node) => (
            <article key={node.condition} className="rounded-lg border border-slate-800 bg-slate-950 p-3">
              <p className="text-sm font-medium text-slate-100">{node.condition}</p>
              <p className="mt-2 text-xs text-emerald-200">
                <span className="font-semibold">Yes:</span> {node.yesPath}
              </p>
              <p className="mt-1 text-xs text-amber-200">
                <span className="font-semibold">No:</span> {node.noPath}
              </p>
              <p className="mt-2 text-xs text-slate-400">{node.note}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
