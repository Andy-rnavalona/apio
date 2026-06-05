import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Separator } from "@/components/ui/separator";
import { type Exercice } from "../types/type.ts";
import { ExerciceStatusBadge } from "././exercice-status-badge.tsx";
import { formatAriary, formatDate } from "../utils/format";

// ─── Icons ────────────────────────────────────────────────────────────────────

const CalendarIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
    <rect x="1.5" y="2.5" width="13" height="12" rx="2" />
    <line x1="1.5" y1="6" x2="14.5" y2="6" />
    <line x1="5" y1="1" x2="5" y2="4" />
    <line x1="11" y1="1" x2="11" y2="4" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
    <line x1="2" y1="8" x2="14" y2="8" />
    <polyline points="9 3 14 8 9 13" />
  </svg>
);

const HashIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" className="w-3.5 h-3.5">
    <line x1="3" y1="5" x2="13" y2="5" />
    <line x1="3" y1="11" x2="13" y2="11" />
    <line x1="6" y1="1.5" x2="5" y2="14.5" />
    <line x1="11" y1="1.5" x2="10" y2="14.5" />
  </svg>
);

const CurrencyIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" className="w-3.5 h-3.5">
    <circle cx="8" cy="8" r="6.5" />
    <path d="M6 10.5c0 .8.9 1.5 2 1.5s2-.7 2-1.5-1-1.5-2-1.5-2-.7-2-1.5S6.9 6 8 6s2 .7 2 1.5" />
    <line x1="8" y1="4.5" x2="8" y2="5.5" />
    <line x1="8" y1="11.5" x2="8" y2="12.5" />
  </svg>
);

const LockIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
    <rect x="2.5" y="7" width="11" height="8" rx="1.5" />
    <path d="M5 7V5a3 3 0 0 1 6 0v2" />
  </svg>
);

const InspectIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
    <circle cx="7" cy="7" r="5" />
    <line x1="10.5" y1="10.5" x2="14" y2="14" />
    <line x1="5" y1="7" x2="9" y2="7" />
    <line x1="7" y1="5" x2="7" y2="9" />
  </svg>
);

// ─── Props ────────────────────────────────────────────────────────────────────

interface ExerciceCardProps {
  exercice: Exercice;
  onInspect: (id: string) => void;
  onCloturer: (id: string) => void;
  style?: React.CSSProperties;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function ExerciceCard({ exercice, onInspect, onCloturer, style }: ExerciceCardProps) {
  const isActive = exercice.status === "actif";

  return (
    <div
      style={style}
      className={cn(
        "group relative flex flex-col bg-white rounded-2xl border transition-all duration-200 ease-out",
        "hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,0,0,0.07)]",
        isActive
          ? "border-neutral-300 shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
          : "border-neutral-100 shadow-[0_1px_4px_rgba(0,0,0,0.04)]"
      )}
    >
      {/* Active indicator strip */}
      {isActive && (
        <div className="absolute top-0 left-6 right-6 h-0.5 bg-black rounded-b-full" />
      )}

      <div className="p-6 flex flex-col gap-5 flex-1">

        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div>
            {isActive && (
              <p className="text-[10px] font-semibold tracking-[0.14em] uppercase text-neutral-400 mb-1.5">
                Exercice actif
              </p>
            )}
            <h3 className="text-[17px] font-semibold text-black tracking-tight leading-tight">
              {exercice.name}
            </h3>
          </div>
          <ExerciceStatusBadge status={exercice.status} className="shrink-0 mt-0.5" />
        </div>

        <Separator className="bg-neutral-100" />

        {/* Meta grid */}
        <div className="grid grid-cols-2 gap-3">
          <MetaItem icon={<CalendarIcon />} label="Début" value={formatDate(exercice.startDate)} />
          <MetaItem icon={<CalendarIcon />} label="Fin" value={formatDate(exercice.endDate)} />
          <MetaItem
            icon={<HashIcon />}
            label="Transactions"
            value={exercice.transactionCount.toLocaleString("fr-FR")}
          />
          <MetaItem
            icon={<CurrencyIcon />}
            label="Total traité"
            value={formatAriary(exercice.totalAmount)}
          />
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Actions */}
        <div className={cn("flex items-center gap-2 pt-1", !isActive && "justify-end")}>
          {isActive && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 px-3.5 text-[12px] font-medium rounded-lg border-neutral-200 text-neutral-600 hover:text-black hover:border-neutral-300 hover:bg-neutral-50 shadow-none gap-1.5 transition-colors"
                >
                  <LockIcon />
                  Clôturer
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="rounded-2xl border-neutral-100 shadow-2xl max-w-sm">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-[17px] font-semibold tracking-tight">
                    Clôturer l'exercice ?
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-[13px] text-neutral-500 leading-relaxed mt-1">
                    Cette action est irréversible. L'exercice{" "}
                    <strong className="text-black font-medium">{exercice.name}</strong> sera
                    définitivement clôturé et aucune nouvelle transaction ne pourra y être
                    rattachée.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="gap-2 mt-2">
                  <AlertDialogCancel className="h-9 px-4 text-[13px] font-medium rounded-lg border-neutral-200 hover:bg-neutral-50 shadow-none">
                    Annuler
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => onCloturer(exercice.id)}
                    className="h-9 px-4 text-[13px] font-medium rounded-lg bg-black hover:bg-neutral-800 text-white shadow-none"
                  >
                    Confirmer la clôture
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}

          <Button
            size="sm"
            onClick={() => onInspect(exercice.id)}
            className={cn(
              "h-8 px-3.5 text-[12px] font-medium rounded-lg shadow-none gap-1.5 transition-colors",
              isActive
                ? "bg-black hover:bg-neutral-800 text-white ml-auto"
                : "bg-black hover:bg-neutral-800 text-white"
            )}
          >
            <InspectIcon />
            Inspecter
            <ArrowRightIcon />
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── MetaItem ─────────────────────────────────────────────────────────────────

function MetaItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-1.5 text-neutral-400">
        {icon}
        <span className="text-[10px] font-semibold tracking-wider uppercase">{label}</span>
      </div>
      <p className="text-[13px] font-medium text-neutral-700 pl-0.5">{value}</p>
    </div>
  );
}