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
        <h4 className="mb-3 text-sm font-semibold text-slate-200">Visual process drawing</h4>
        <div className="overflow-x-auto rounded-lg border border-slate-800 bg-slate-950 p-3">
          <svg viewBox="0 0 1400 250" className="min-w-[1100px]">
            <defs>
              <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                <path d="M0,0 L0,6 L9,3 z" fill="#94a3b8" />
              </marker>
            </defs>

            <rect x="20" y="80" width="140" height="70" rx="8" fill="#0f172a" stroke="#334155" />
            <text x="90" y="110" textAnchor="middle" fill="#e2e8f0" fontSize="12">Case Intake</text>

            <rect x="190" y="80" width="160" height="70" rx="8" fill="#0f172a" stroke="#334155" />
            <text x="270" y="105" textAnchor="middle" fill="#e2e8f0" fontSize="12">Signal</text>
            <text x="270" y="123" textAnchor="middle" fill="#e2e8f0" fontSize="12">Normalization</text>

            <rect x="380" y="80" width="170" height="70" rx="8" fill="#0f172a" stroke="#334155" />
            <text x="465" y="105" textAnchor="middle" fill="#e2e8f0" fontSize="12">Triage + Severity</text>
            <text x="465" y="123" textAnchor="middle" fill="#e2e8f0" fontSize="12">Proposal</text>

            <rect x="580" y="80" width="180" height="70" rx="8" fill="#0f172a" stroke="#334155" />
            <text x="670" y="105" textAnchor="middle" fill="#e2e8f0" fontSize="12">Owner Assignment</text>
            <text x="670" y="123" textAnchor="middle" fill="#e2e8f0" fontSize="12">+ SLA Timer</text>

            <rect x="790" y="80" width="170" height="70" rx="8" fill="#172554" stroke="#3b82f6" />
            <text x="875" y="105" textAnchor="middle" fill="#dbeafe" fontSize="12">Policy Assist</text>
            <text x="875" y="123" textAnchor="middle" fill="#dbeafe" fontSize="12">(future API call)</text>

            <polygon points="1020,115 1080,80 1140,115 1080,150" fill="#3f1d2e" stroke="#be185d" />
            <text x="1080" y="111" textAnchor="middle" fill="#fbcfe8" fontSize="11">Referral</text>
            <text x="1080" y="126" textAnchor="middle" fill="#fbcfe8" fontSize="11">criteria?</text>

            <rect x="1180" y="35" width="190" height="70" rx="8" fill="#1e293b" stroke="#64748b" />
            <text x="1275" y="62" textAnchor="middle" fill="#e2e8f0" fontSize="12">Mitigation +</text>
            <text x="1275" y="80" textAnchor="middle" fill="#e2e8f0" fontSize="12">Monitoring (No)</text>

            <rect x="1180" y="145" width="190" height="70" rx="8" fill="#3f1d2e" stroke="#be185d" />
            <text x="1275" y="173" textAnchor="middle" fill="#fbcfe8" fontSize="12">Human Legal Gate</text>
            <text x="1275" y="191" textAnchor="middle" fill="#fbcfe8" fontSize="12">+ Outcome Log (Yes)</text>

            <line x1="160" y1="115" x2="190" y2="115" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />
            <line x1="350" y1="115" x2="380" y2="115" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />
            <line x1="550" y1="115" x2="580" y2="115" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />
            <line x1="760" y1="115" x2="790" y2="115" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />
            <line x1="960" y1="115" x2="1020" y2="115" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />

            <line x1="1140" y1="105" x2="1180" y2="70" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />
            <line x1="1140" y1="125" x2="1180" y2="180" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />
            <text x="1150" y="90" fill="#93c5fd" fontSize="11">No</text>
            <text x="1150" y="160" fill="#fda4af" fontSize="11">Yes</text>
          </svg>
        </div>
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
        <h4 className="mb-3 text-sm font-semibold text-slate-200">Visual decision tree drawing</h4>
        <div className="overflow-x-auto rounded-lg border border-slate-800 bg-slate-950 p-3">
          <svg viewBox="0 0 1000 360" className="min-w-[900px]">
            <defs>
              <marker id="arrow2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                <path d="M0,0 L0,6 L9,3 z" fill="#94a3b8" />
              </marker>
            </defs>

            <rect x="390" y="18" width="220" height="56" rx="8" fill="#0f172a" stroke="#334155" />
            <text x="500" y="50" textAnchor="middle" fill="#e2e8f0" fontSize="12">Escalation Record Opened</text>

            <polygon points="500,108 570,148 500,188 430,148" fill="#1e293b" stroke="#64748b" />
            <text x="500" y="146" textAnchor="middle" fill="#e2e8f0" fontSize="12">Severity</text>
            <text x="500" y="162" textAnchor="middle" fill="#e2e8f0" fontSize="12">High?</text>

            <rect x="680" y="120" width="260" height="58" rx="8" fill="#3f1d2e" stroke="#be185d" />
            <text x="810" y="145" textAnchor="middle" fill="#fbcfe8" fontSize="12">Engage Policy + Legal +</text>
            <text x="810" y="162" textAnchor="middle" fill="#fbcfe8" fontSize="12">Product + Comms</text>

            <rect x="60" y="120" width="280" height="58" rx="8" fill="#0f172a" stroke="#334155" />
            <text x="200" y="145" textAnchor="middle" fill="#e2e8f0" fontSize="12">Scaled stakeholder path</text>
            <text x="200" y="162" textAnchor="middle" fill="#e2e8f0" fontSize="12">(Safeguards + Eng/Policy)</text>

            <polygon points="500,222 570,262 500,302 430,262" fill="#3f1d2e" stroke="#be185d" />
            <text x="500" y="259" textAnchor="middle" fill="#fbcfe8" fontSize="11">Referral review</text>
            <text x="500" y="274" textAnchor="middle" fill="#fbcfe8" fontSize="11">required?</text>

            <rect x="680" y="236" width="260" height="58" rx="8" fill="#3f1d2e" stroke="#be185d" />
            <text x="810" y="261" textAnchor="middle" fill="#fbcfe8" fontSize="12">Human Legal Decision Gate</text>
            <text x="810" y="278" textAnchor="middle" fill="#fbcfe8" fontSize="12">+ Criteria Checklist</text>

            <rect x="60" y="236" width="280" height="58" rx="8" fill="#0f172a" stroke="#334155" />
            <text x="200" y="261" textAnchor="middle" fill="#e2e8f0" fontSize="12">Proceed with mitigation</text>
            <text x="200" y="278" textAnchor="middle" fill="#e2e8f0" fontSize="12">and monitoring path</text>

            <line x1="500" y1="74" x2="500" y2="108" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow2)" />
            <line x1="570" y1="148" x2="680" y2="148" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow2)" />
            <line x1="430" y1="148" x2="340" y2="148" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow2)" />
            <text x="605" y="138" fill="#fda4af" fontSize="11">Yes</text>
            <text x="360" y="138" fill="#93c5fd" fontSize="11">No</text>

            <line x1="500" y1="188" x2="500" y2="222" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow2)" />
            <line x1="570" y1="262" x2="680" y2="262" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow2)" />
            <line x1="430" y1="262" x2="340" y2="262" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow2)" />
            <text x="605" y="252" fill="#fda4af" fontSize="11">Yes</text>
            <text x="360" y="252" fill="#93c5fd" fontSize="11">No</text>
          </svg>
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
