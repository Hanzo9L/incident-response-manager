import {
  Activity,
  Bot,
  BriefcaseBusiness,
  ClipboardList,
  Gauge,
  GitBranch,
  Radar,
  Route,
  Wrench,
} from "lucide-react";
import type { ComponentType } from "react";

export type SectionId =
  | "mission-control"
  | "escalations"
  | "runbooks"
  | "coverage"
  | "tooling"
  | "metrics"
  | "automation"
  | "decision-brief"
  | "process-flow";

const navItems: { id: SectionId; label: string; icon: ComponentType<{ className?: string }> }[] = [
  { id: "mission-control", label: "Mission Control", icon: Gauge },
  { id: "escalations", label: "Escalations", icon: Activity },
  { id: "runbooks", label: "Runbooks", icon: ClipboardList },
  { id: "coverage", label: "Coverage", icon: Radar },
  { id: "tooling", label: "Tooling", icon: Wrench },
  { id: "metrics", label: "Metrics", icon: Route },
  { id: "automation", label: "Automation", icon: Bot },
  { id: "decision-brief", label: "Decision Brief", icon: BriefcaseBusiness },
  { id: "process-flow", label: "Process Flow", icon: GitBranch },
];

type Props = {
  active: SectionId;
  onChange: (id: SectionId) => void;
};

export function SidebarNav({ active, onChange }: Props) {
  return (
    <aside className="w-72 border-r border-slate-800 bg-slate-950 p-4">
      <h1 className="mb-1 text-base font-semibold text-slate-100">Enforcement Response</h1>
      <p className="mb-4 text-xs text-slate-400">Command Center</p>
      <nav className="space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition ${
                isActive
                  ? "bg-blue-500/20 text-blue-100 ring-1 ring-blue-400/40"
                  : "text-slate-300 hover:bg-slate-800"
              }`}
              onClick={() => onChange(item.id)}
              type="button"
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
