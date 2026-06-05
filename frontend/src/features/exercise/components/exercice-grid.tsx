import { type Exercice } from "../types/type.ts";
import { ExerciceCard } from "./exercice-card.tsx";

// ─── Icons ────────────────────────────────────────────────────────────────────

const FolderIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-neutral-300">
    <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" />
  </svg>
);

// ─── Props ────────────────────────────────────────────────────────────────────

interface ExercicesGridProps {
  activeExercice: Exercice | undefined;
  closedExercices: Exercice[];
  onInspect: (id: string) => void;
  onCloturer: (id: string) => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function ExercicesGrid({
  activeExercice,
  closedExercices,
  onInspect,
  onCloturer,
}: ExercicesGridProps) {
  const hasAny = activeExercice || closedExercices.length > 0;

  if (!hasAny) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center gap-3">
        <FolderIcon />
        <p className="text-[14px] font-medium text-neutral-500">Aucun exercice trouvé</p>
        <p className="text-[13px] text-neutral-400 max-w-xs">
          Créez votre premier exercice pour commencer à organiser vos transactions par période.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Active exercice — full width spotlight */}
      {activeExercice && (
        <section>
          <SectionLabel>En cours</SectionLabel>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <ExerciceCard
              exercice={activeExercice}
              onInspect={onInspect}
              onCloturer={onCloturer}
              style={{ animationDelay: "0ms" }}
            />
          </div>
        </section>
      )}

      {/* Closed exercices grid */}
      {closedExercices.length > 0 && (
        <section>
          <SectionLabel>Clôturés</SectionLabel>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {closedExercices.map((ex, i) => (
              <ExerciceCard
                key={ex.id}
                exercice={ex}
                onInspect={onInspect}
                onCloturer={onCloturer}
                style={{ animationDelay: `${i * 40}ms` }}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

// ─── SectionLabel ─────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-neutral-400 mb-3">
      {children}
    </p>
  );
}