import type { Flux } from "../types";

export const mockFlux: Flux[] = [
  { id: "FX-001", title: "Virement client Acme", description: "Paiement facture #2024-089", amount: 12400, category: "Ventes", subcategory: "Facturation", date: "2024-06-01", type: "entrant", status: "validé" },
  { id: "FX-002", title: "Abonnement Stripe", description: "Frais mensuel SaaS", amount: 320, category: "Infrastructure", subcategory: "SaaS", date: "2024-06-02", type: "sortant", status: "validé" },
  { id: "FX-003", title: "Remboursement TVA", description: "Crédit fiscal T1 2024", amount: 3870, category: "Fiscal", subcategory: "TVA", date: "2024-06-03", type: "entrant", status: "en attente" },
  { id: "FX-004", title: "Salaires juin", description: "Masse salariale équipe produit", amount: 28500, category: "RH", subcategory: "Salaires", date: "2024-06-05", type: "sortant", status: "validé" },
  { id: "FX-005", title: "Investisseur Series A", description: "Tranche 2 financement", amount: 150000, category: "Financement", subcategory: "Capital", date: "2024-06-06", type: "entrant", status: "validé" },
  { id: "FX-006", title: "Loyer bureaux", description: "Mensualité Q2 — Paris 9e", amount: 4200, category: "Immobilier", subcategory: "Bail commercial", date: "2024-06-07", type: "sortant", status: "validé" },
  { id: "FX-007", title: "Prestation design", description: "Mission UI/UX refonte app mobile", amount: 6800, category: "Prestataires", subcategory: "Design", date: "2024-06-08", type: "sortant", status: "en attente" },
  { id: "FX-008", title: "Licence Figma", description: "Organisation annuelle", amount: 756, category: "Infrastructure", subcategory: "Outils", date: "2024-06-09", type: "sortant", status: "validé" },
  { id: "FX-009", title: "Vente licence B2B", description: "Contrat annuel — TechCorp", amount: 24000, category: "Ventes", subcategory: "Licences", date: "2024-06-10", type: "entrant", status: "validé" },
  { id: "FX-010", title: "Remboursement note de frais", description: "Déplacements commerciaux mai", amount: 1240, category: "Frais", subcategory: "Déplacements", date: "2024-06-11", type: "sortant", status: "rejeté" },
];

// ─── Categories ───────────────────────────────────────────────────────────────

export const categories: Record<string, string[]> = {
  Ventes: ["Facturation", "Licences", "Abonnements"],
  Infrastructure: ["SaaS", "Serveurs", "Outils"],
  Fiscal: ["TVA", "IS", "Taxes locales"],
  RH: ["Salaires", "Primes", "Avantages"],
  Financement: ["Capital", "Emprunt", "Subventions"],
  Immobilier: ["Bail commercial", "Entretien", "Équipement"],
  Prestataires: ["Design", "Dev", "Conseil"],
  Frais: ["Déplacements", "Hébergement", "Restauration"],
};
