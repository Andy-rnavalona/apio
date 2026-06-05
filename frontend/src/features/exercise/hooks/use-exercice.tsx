import { useState } from "react";
import { type Exercice } from "../types/type.ts";
import { mockExercices } from "../data/data.ts"

export interface UseExercicesReturn {
  exercices: Exercice[];
  activeExercice: Exercice | undefined;
  closedExercices: Exercice[];
  addExercice: (data: Omit<Exercice, "id" | "status" | "transactionCount" | "totalAmount">) => void;
  cloturer: (id: string) => void;
}

export function useExercices(): UseExercicesReturn {
  const [exercices, setExercices] = useState<Exercice[]>(mockExercices);

  const activeExercice = exercices.find((e) => e.status === "actif");
  const closedExercices = exercices
    .filter((e) => e.status === "cloture")
    .sort((a, b) => b.startDate.localeCompare(a.startDate));

  function addExercice(
    data: Omit<Exercice, "id" | "status" | "transactionCount" | "totalAmount">
  ) {
    const newEx: Exercice = {
      ...data,
      id: `ex-${Date.now()}`,
      status: "actif",
      transactionCount: 0,
      totalAmount: 0,
    };
    setExercices((prev) => [newEx, ...prev]);
  }

  function cloturer(id: string) {
    setExercices((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status: "cloture" } : e))
    );
  }

  return { exercices, activeExercice, closedExercices, addExercice, cloturer };
}