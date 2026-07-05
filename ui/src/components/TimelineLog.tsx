import type { TimelineEvent } from "../types/models";

type Props = { events: TimelineEvent[] };

export function TimelineLog({ events }: Props) {
  return (
    <div className="overflow-auto rounded-lg border border-slate-800">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-900 text-slate-400">
          <tr>
            <th className="px-3 py-2">Time</th>
            <th className="px-3 py-2">Action</th>
            <th className="px-3 py-2">Owner</th>
            <th className="px-3 py-2">Rationale</th>
            <th className="px-3 py-2">Follow-up</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={`${event.time}-${event.action}`} className="border-t border-slate-800 text-slate-300">
              <td className="px-3 py-2">{event.time}</td>
              <td className="px-3 py-2">{event.action}</td>
              <td className="px-3 py-2">{event.owner}</td>
              <td className="px-3 py-2">{event.rationale}</td>
              <td className="px-3 py-2">{event.followUp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
