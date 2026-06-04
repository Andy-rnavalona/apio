import { Exercice } from "../types/exercice.types";
import { formatAriary } from "../utils/format";

interface ExercicesKpiStripProps {
  exercices: Exercice[];
}

export function ExercicesKpiStrip({ exercices }: ExercicesKpiStripProps) {
  const totalTransactions = exercices.reduce((s, e) => s + e.transactionCount, 0);
  const totalAmount = exercices.reduce((s, e) => s + e.totalAmount, 0);
  const closedCount = exercices.filter((e) => e.status === "cloture").length;

  const kpis = [
    { label: "Exercices clôturés", value: closedCount.toString() },
    { label: "Transactions totales", value: totalTransactions.toLocaleString("fr-FR") },
    { label: "Volume traité", value: formatAriary(totalAmount) },
  ];

  return (
    <div className="grid grid-cols-3 gap-3 mb-8">
      {kpis.map((k, i) => (
        <div
          key={i}
          className="bg-neutral-50 rounded-xl px-4 py-3.5 border border-neutral-100"
        >
          <p className="text-[11px] font-medium text-neutral-400 tracking-wide uppercase mb-1">
            {k.label}
          </p>
          <p className="text-[20px] font-semibold text-black tracking-tight">{k.value}</p>
        </div>
      ))}
    </div>
  );
}