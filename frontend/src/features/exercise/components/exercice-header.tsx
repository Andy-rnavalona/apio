import { Button } from "@/components/ui/button";

// ─── Icons ────────────────────────────────────────────────────────────────────

const PlusIcon = () => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    className="w-3.5 h-3.5"
  >
    <line x1="8" y1="2" x2="8" y2="14" />
    <line x1="2" y1="8" x2="14" y2="8" />
  </svg>
);

// ─── Props ────────────────────────────────────────────────────────────────────

interface ExercicesHeaderProps {
  exerciceCount: number;
  onNew: () => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function ExercicesHeader({ exerciceCount, onNew }: ExercicesHeaderProps) {
  return (
    <div className="flex items-start justify-between mb-8">
      <div>
        <p className="text-[11px] font-medium tracking-[0.12em] uppercase text-neutral-400 mb-1">
          Finances
        </p>
        <h1 className="text-[28px] font-semibold tracking-tight text-black leading-none mb-2">
          Exercices
        </h1>
        <p className="text-[13px] text-neutral-500 leading-relaxed max-w-md">
          Organisez vos transactions par période comptable.{" "}
          <span className="text-neutral-400">
            {exerciceCount} exercice{exerciceCount > 1 ? "s" : ""} au total.
          </span>
        </p>
      </div>

      <Button
        onClick={onNew}
        className="h-8 px-3.5 bg-black hover:bg-neutral-800 text-white text-[13px] font-medium rounded-lg flex items-center gap-1.5 shadow-none transition-colors mt-1"
      >
        <PlusIcon />
        Nouvel exercice
      </Button>
    </div>
  );
}