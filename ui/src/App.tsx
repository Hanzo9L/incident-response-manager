import { useMemo, useState } from "react";
import { SidebarNav, type SectionId } from "./components/SidebarNav";
import { escalations, runbooks } from "./data/mockData";
import type { Severity } from "./types/models";
import { AutomationScreen } from "./screens/AutomationScreen";
import { CoverageScreen } from "./screens/CoverageScreen";
import { DecisionBriefScreen } from "./screens/DecisionBriefScreen";
import { EscalationsScreen } from "./screens/EscalationsScreen";
import { MetricsScreen } from "./screens/MetricsScreen";
import { MissionControlScreen } from "./screens/MissionControlScreen";
import { RunbooksScreen } from "./screens/RunbooksScreen";
import { ToolingScreen } from "./screens/ToolingScreen";

const sectionTitle: Record<SectionId, string> = {
  "mission-control": "Mission Control",
  escalations: "Active Escalation Console",
  runbooks: "Runbook and SOP Center",
  coverage: "On-Call Coverage and Staffing",
  tooling: "Tooling Health",
  metrics: "Metrics and Leadership Reporting",
  automation: "Automation Backlog",
  "decision-brief": "Decision Brief Generator",
};

function App() {
  const [activeSection, setActiveSection] = useState<SectionId>("mission-control");
  const [selectedEscalationId, setSelectedEscalationId] = useState(escalations[0].id);
  const [escalationSeverityFilter, setEscalationSeverityFilter] = useState<Severity | "All">("All");

  const initialRunbookState = useMemo(() => {
    const state: Record<string, Record<string, boolean>> = {};
    escalations.forEach((escalation) => {
      const runbook = runbooks.find((item) => item.id === escalation.runbookId);
      const steps: Record<string, boolean> = {};
      runbook?.requiredSteps.forEach((step, index) => {
        // Seed progress to make the prototype feel operational.
        steps[step.id] = index < Math.max(2, runbook.requiredSteps.length - 2);
      });
      state[escalation.id] = steps;
    });
    return state;
  }, []);

  const [runbookStateByEscalation, setRunbookStateByEscalation] = useState(initialRunbookState);

  const toggleRunbookStep = (escalationId: string, stepId: string) => {
    setRunbookStateByEscalation((current) => ({
      ...current,
      [escalationId]: {
        ...(current[escalationId] ?? {}),
        [stepId]: !current[escalationId]?.[stepId],
      },
    }));
  };

  const renderContent = () => {
    switch (activeSection) {
      case "mission-control":
        return <MissionControlScreen />;
      case "escalations":
        return (
          <EscalationsScreen
            escalations={escalations}
            selectedEscalationId={selectedEscalationId}
            onSelectEscalation={setSelectedEscalationId}
            runbookStateByEscalation={runbookStateByEscalation}
            onToggleRunbook={toggleRunbookStep}
            severityFilter={escalationSeverityFilter}
            onSeverityFilterChange={setEscalationSeverityFilter}
          />
        );
      case "runbooks":
        return <RunbooksScreen />;
      case "coverage":
        return <CoverageScreen />;
      case "tooling":
        return <ToolingScreen />;
      case "metrics":
        return <MetricsScreen />;
      case "automation":
        return <AutomationScreen />;
      case "decision-brief":
        return <DecisionBriefScreen escalations={escalations} />;
      default:
        return <MissionControlScreen />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      <SidebarNav active={activeSection} onChange={setActiveSection} />
      <main className="flex-1 p-6">
        <header className="mb-6 rounded-xl border border-slate-800 bg-slate-900 p-4">
          <p className="text-xs uppercase tracking-wider text-slate-400">Enforcement Response Command Center</p>
          <h2 className="text-xl font-semibold text-slate-100">{sectionTitle[activeSection]}</h2>
          <p className="text-sm text-slate-300">
            One place to see coverage, risk, escalations, referrals, tooling health, and leadership-ready updates.
          </p>
        </header>
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
