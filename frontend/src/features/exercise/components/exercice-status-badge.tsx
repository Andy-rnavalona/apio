import { cn } from "@/lib/utils";
import { type ExerciceStatus } from "../types/type.ts";

interface ExerciceStatusBadgeProps {
  status: ExerciceStatus;
  className?: string;
}

export function ExerciceStatusBadge({ status, className }: ExerciceStatusBadgeProps) {
  const isActive = status === "actif";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-md",
        isActive
          ? "bg-black text-white"
          : "bg-neutral-100 text-neutral-500 border border-neutral-200",
        className
      )}
    >
      <span
        className={cn(
          "w-1.5 h-1.5 rounded-full flex-shrink-0",
          isActive ? "bg-white" : "bg-neutral-400"
        )}
      />
      {isActive ? "Actif" : "Clôturé"}
    </span>
  );
}