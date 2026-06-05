/**
 * Format a number as Ariary currency
 */
export function formatAriary(amount: number): string {
  return new Intl.NumberFormat("fr-MG", {
    style: "decimal",
    maximumFractionDigits: 0,
  }).format(amount) + " Ar";
}

/**
 * Format an ISO date string as dd/mm/yyyy
 */
export function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

/**
 * Return the year from an ISO date string
 */
export function getYear(iso: string): string {
  return new Date(iso).getFullYear().toString();
}