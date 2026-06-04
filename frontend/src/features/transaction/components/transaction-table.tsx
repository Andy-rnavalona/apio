import type { Flux } from "../types";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

type transactionTableProps = {
    filtered: Flux[];
};

const ArrowUpIcon = () => (
    <svg
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-3 h-3"
    >
        <line x1="8" y1="13" x2="8" y2="3" />
        <polyline points="4 7 8 3 12 7" />
    </svg>
);

const ArrowDownIcon = () => (
    <svg
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-3 h-3"
    >
        <line x1="8" y1="3" x2="8" y2="13" />
        <polyline points="4 9 8 13 12 9" />
    </svg>
);
const fmt = (n: number) =>
    new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "EUR",
        maximumFractionDigits: 0,
    }).format(n);

const fmtDate = (d: string) =>
    new Date(d).toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });

const statusStyle: Record<string, string> = {
    validé: "bg-black text-white",
    "en attente": "bg-neutral-100 text-neutral-600 border border-neutral-200",
    rejeté: "bg-neutral-200 text-neutral-500 line-through",
};

export default function TransactionTable({ filtered }: transactionTableProps) {
    return (
        <div>
            <div className="rounded-xl border border-neutral-100 overflow-hidden">
                <Table className="w-full text-[14px]">
                    <TableHeader>
                        <TableRow className="border-b border-neutral-100 bg-neutral-50">
                            {[
                                "ID",
                                "Titre",
                                "Catégorie",
                                "Date",
                                "Statut",
                                "Montant",
                            ].map((h) => (
                                <th
                                    key={h}
                                    className={cn(
                                        "px-4 py-2.5 text-left text-[11px] font-semibold text-neutral-400 tracking-wider uppercase",
                                        h === "Montant" && "text-right",
                                    )}
                                >
                                    {h}
                                </th>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filtered.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={6}
                                    className="px-4 py-16 text-center text-neutral-400 text-[13px]"
                                >
                                    Aucun flux trouvé
                                </TableCell>
                            </TableRow>
                        ) : (
                            filtered.map((f, i) => (
                                <TableRow
                                    key={f.id}
                                    className={cn(
                                        "border-b border-neutral-100/70 transition-colors duration-100 cursor-pointer group",
                                        "hover:bg-neutral-50/80",
                                        i === filtered.length - 1 &&
                                            "border-b-0",
                                    )}
                                >
                                    <TableCell className="px-4 py-3.5">
                                        <span className="font-mono text-[11px] text-neutral-400">
                                            {f.id}
                                        </span>
                                    </TableCell>
                                    <TableCell className="px-4 py-3.5">
                                        <p className="font-medium text-black">
                                            {f.title}
                                        </p>
                                        <p className="text-neutral-400 text-[11px] mt-0.5 truncate max-w-55">
                                            {f.description}
                                        </p>
                                    </TableCell>
                                    <TableCell className="px-4 py-3.5">
                                        <span className="text-neutral-600">
                                            {f.category}
                                        </span>
                                        <span className="text-neutral-300 mx-1">
                                            /
                                        </span>
                                        <span className="text-neutral-400">
                                            {f.subcategory}
                                        </span>
                                    </TableCell>
                                    <TableCell className="px-4 py-3.5 text-neutral-500 whitespace-nowrap">
                                        {fmtDate(f.date)}
                                    </TableCell>
                                    <TableCell className="px-4 py-3.5">
                                        <span
                                            className={cn(
                                                "inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium",
                                                statusStyle[f.status],
                                            )}
                                        >
                                            {f.status}
                                        </span>
                                    </TableCell>
                                    <TableCell className="px-4 py-3.5 text-right">
                                        <span
                                            className={cn(
                                                "font-semibold tabular-nums flex items-center justify-end gap-1",
                                                f.type === "entrant"
                                                    ? "text-black"
                                                    : "text-neutral-500",
                                            )}
                                        >
                                            {f.type === "entrant" ? (
                                                <ArrowUpIcon />
                                            ) : (
                                                <ArrowDownIcon />
                                            )}
                                            {fmt(f.amount)}
                                        </span>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
            {/* Footer count */}
            <p className="mt-3 text-[11px] text-neutral-400 text-right">
                {filtered.length} résultat
                {filtered.length > 1 ? "s" : ""}
            </p>
        </div>
    );
}
