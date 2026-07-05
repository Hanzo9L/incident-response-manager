export type Severity = "High" | "Medium" | "Low";

export type Escalation = {
  id: string;
  severity: Severity;
  status: string;
  owner: string;
  teamsEngaged: string[];
  nextDecision: string;
  nextUpdateDueMinutes: number;
  referralStatus: string;
  risk: string;
  summary: string;
  knownFacts: string[];
  unknowns: string[];
  recommendation: string;
  tradeoffs: string[];
  operationalPosture: string;
  timeline: TimelineEvent[];
  stakeholders: StakeholderStatus[];
  leadershipUpdate: {
    currentSituation: string;
    knownFacts: string;
    unknowns: string;
    recommendedAction: string;
    tradeoff: string;
    nextUpdate: string;
  };
  runbookId: string;
};

export type TimelineEvent = {
  time: string;
  action: string;
  owner: string;
  rationale: string;
  followUp: string;
};

export type StakeholderStatus = {
  team: string;
  status: string;
  owner: string;
  lastUpdate: string;
  nextAction: string;
};

export type RunbookStep = {
  id: string;
  text: string;
};

export type Runbook = {
  id: string;
  title: string;
  purpose: string;
  triggerCriteria: string[];
  requiredStakeholders: string[];
  requiredSteps: RunbookStep[];
  escalationPath: string[];
  requiredDocumentation: string[];
  closeoutCriteria: string[];
};

export type CoverageShift = {
  day: string;
  window: string;
  primary: string;
  backup: string;
  policyContact: string;
  legalContact: string;
  engineeringPartner: string;
  riskFlag?: string;
};

export type ToolingIssue = {
  id: string;
  name: string;
  severity: Severity;
  operationalImpact: string;
  engineeringOwner: string;
  workaround: string;
  status: "In progress" | "Scoped" | "Awaiting prioritization" | "Resolved";
  eta: string;
  escalationPath: string;
};

export type MetricsSnapshot = {
  week: string;
  inboundEscalations: number;
  firstResponseMinutes: number;
  timeToDecisionMinutes: number;
  weekendVolume: number;
  slaMisses: number;
  toolingDelayMinutes: number;
  handoffMinutes: number;
  runbookCompliance: number;
  automationSavingsHours: number;
};

export type AutomationBacklogItem = {
  manualTask: string;
  frequency: string;
  estimatedTimeCost: "High" | "Medium" | "Low";
  operationalRisk: string;
  automationIdea: string;
  impactScore: number;
  status: "Ready for engineering review" | "In design" | "Prototype" | "Scoped";
};

export type ProgramMaturityMetric = {
  id: string;
  label: string;
  score: number;
  status: "Strong" | "Caution" | "Needs investment";
  represents: string;
};
