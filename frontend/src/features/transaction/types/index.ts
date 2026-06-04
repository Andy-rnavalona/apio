export type FluxType = "entrant" | "sortant";

export interface Flux {
  id: string;
  title: string;
  description: string;
  amount: number;
  category: string;
  subcategory: string;
  date: string;
  type: FluxType;
  status: "validé" | "en attente" | "rejeté";
}