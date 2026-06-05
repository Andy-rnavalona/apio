export type ExerciceStatus = "actif" | "cloture";

export interface Exercice  {
  id: string;
  name: string;
  status: ExerciceStatus;
  startDate: string; // ISO date string
  endDate: string;   // ISO date string
  transactionCount: number;
  totalAmount: number; // in Ariary
}