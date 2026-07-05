import { coverageGaps, coverageSchedule, staffingRecommendation } from "../data/mockData";
import { CoverageConfidenceCard } from "../components/CoverageConfidenceCard";
import { coverageConfidence } from "../data/selectors";

export function CoverageScreen() {
  const confidence = coverageConfidence();
  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-[2fr,1fr]">
        <section className="rounded-xl border border-slate-800 bg-slate-900 p-4">
          <h2 className="mb-3 text-sm font-semibold text-slate-100">On-Call Coverage and Staffing</h2>
          <div className="overflow-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-slate-400">
                <tr>
                  <th className="px-2 py-2">Day</th>
                  <th className="px-2 py-2">Window</th>
                  <th className="px-2 py-2">Primary</th>
                  <th className="px-2 py-2">Backup</th>
                  <th className="px-2 py-2">Policy</th>
                  <th className="px-2 py-2">Legal</th>
                  <th className="px-2 py-2">Engineering</th>
                </tr>
              </thead>
              <tbody>
                {coverageSchedule.map((shift) => (
                  <tr className="border-t border-slate-800 text-slate-300" key={`${shift.day}-${shift.window}`}>
                    <td className="px-2 py-2">{shift.day}</td>
                    <td className="px-2 py-2">{shift.window}</td>
                    <td className="px-2 py-2">{shift.primary}</td>
                    <td className="px-2 py-2">{shift.backup}</td>
                    <td className="px-2 py-2">{shift.policyContact}</td>
                    <td className="px-2 py-2">{shift.legalContact}</td>
                    <td className="px-2 py-2">{shift.engineeringPartner}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <CoverageConfidenceCard score={confidence.score} status={confidence.status} reasons={confidence.reasons} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="rounded-xl border border-slate-800 bg-slate-900 p-4">
          <h3 className="mb-2 text-sm font-semibold text-slate-200">Coverage Gap Detector</h3>
          <ul className="list-disc space-y-1 pl-5 text-sm text-slate-300">
            {coverageGaps.map((gap) => (
              <li key={gap}>{gap}</li>
            ))}
          </ul>
        </section>
        <section className="rounded-xl border border-slate-800 bg-slate-900 p-4">
          <h3 className="mb-2 text-sm font-semibold text-slate-200">Staffing Recommendation</h3>
          <p className="text-sm text-slate-300">{staffingRecommendation}</p>
        </section>
      </div>
    </div>
  );
}
