import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { MetricsSnapshot } from "../types/models";

type Props = { data: MetricsSnapshot[] };

export function TrendChart({ data }: Props) {
  return (
    <section className="rounded-xl border border-slate-800 bg-slate-900 p-4">
      <h3 className="mb-3 text-sm font-semibold text-slate-200">Operational Trends</h3>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid stroke="#334155" strokeDasharray="3 3" />
            <XAxis dataKey="week" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="inboundEscalations" stroke="#60a5fa" />
            <Line type="monotone" dataKey="timeToDecisionMinutes" stroke="#f59e0b" />
            <Line type="monotone" dataKey="weekendVolume" stroke="#f87171" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
