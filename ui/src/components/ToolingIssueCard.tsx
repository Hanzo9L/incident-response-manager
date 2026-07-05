import type { ToolingIssue } from "../types/models";

type Props = {
  issue: ToolingIssue;
};

export function ToolingIssueCard({ issue }: Props) {
  return (
    <article className="rounded-xl border border-slate-800 bg-slate-900 p-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold text-slate-100">{issue.name}</h4>
        <span className="rounded-full bg-slate-800 px-2 py-1 text-xs text-slate-300">{issue.severity}</span>
      </div>
      <p className="mt-2 text-sm text-slate-300">Impact: {issue.operationalImpact}</p>
      <p className="mt-1 text-xs text-slate-400">Owner: {issue.engineeringOwner}</p>
      <p className="mt-1 text-xs text-slate-400">Workaround: {issue.workaround}</p>
      <p className="mt-1 text-xs text-slate-400">Status: {issue.status}</p>
      <p className="mt-1 text-xs text-slate-400">ETA: {issue.eta}</p>
      <p className="mt-1 text-xs text-slate-400">Escalation path: {issue.escalationPath}</p>
    </article>
  );
}
