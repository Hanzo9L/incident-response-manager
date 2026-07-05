import { useMemo, useState } from "react";
import { ToolingIssueCard } from "../components/ToolingIssueCard";
import { toolingIssues } from "../data/mockData";
import type { Severity, ToolingIssue } from "../types/models";

export function ToolingScreen() {
  const [severityFilter, setSeverityFilter] = useState<Severity | "All">("All");
  const [statusFilter, setStatusFilter] = useState<ToolingIssue["status"] | "All">("All");

  const filtered = useMemo(
    () =>
      toolingIssues.filter((issue) => {
        const severityMatch = severityFilter === "All" || issue.severity === severityFilter;
        const statusMatch = statusFilter === "All" || issue.status === statusFilter;
        return severityMatch && statusMatch;
      }),
    [severityFilter, statusFilter],
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 p-4">
        <h2 className="mr-3 text-sm font-semibold text-slate-100">Tooling Health</h2>
        <select
          className="rounded-md border border-slate-700 bg-slate-950 px-2 py-1 text-xs text-slate-200"
          value={severityFilter}
          onChange={(event) => setSeverityFilter(event.target.value as Severity | "All")}
        >
          <option value="All">All severities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <select
          className="rounded-md border border-slate-700 bg-slate-950 px-2 py-1 text-xs text-slate-200"
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value as ToolingIssue["status"] | "All")}
        >
          <option value="All">All statuses</option>
          <option value="In progress">In progress</option>
          <option value="Scoped">Scoped</option>
          <option value="Awaiting prioritization">Awaiting prioritization</option>
          <option value="Resolved">Resolved</option>
        </select>
      </div>
      <div className="grid gap-4 xl:grid-cols-2">
        {filtered.map((issue) => (
          <ToolingIssueCard key={issue.id} issue={issue} />
        ))}
      </div>
    </div>
  );
}
