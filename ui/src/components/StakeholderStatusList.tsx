import type { StakeholderStatus } from "../types/models";

type Props = { items: StakeholderStatus[] };

export function StakeholderStatusList({ items }: Props) {
  return (
    <div className="overflow-auto rounded-lg border border-slate-800">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-900 text-slate-400">
          <tr>
            <th className="px-3 py-2">Team</th>
            <th className="px-3 py-2">Status</th>
            <th className="px-3 py-2">Owner</th>
            <th className="px-3 py-2">Last Update</th>
            <th className="px-3 py-2">Next Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={`${item.team}-${item.owner}`} className="border-t border-slate-800 text-slate-300">
              <td className="px-3 py-2">{item.team}</td>
              <td className="px-3 py-2">{item.status}</td>
              <td className="px-3 py-2">{item.owner}</td>
              <td className="px-3 py-2">{item.lastUpdate}</td>
              <td className="px-3 py-2">{item.nextAction}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
