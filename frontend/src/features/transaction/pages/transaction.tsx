"use client";

import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import type { FluxType } from "../types";
import { mockFlux } from "../data/data";
import TransactionForm from "../components/form";
import TransactionTable from "../components/transaction-table";

const fmt = (n: number) =>
    new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "EUR",
        maximumFractionDigits: 0,
    }).format(n);



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

const SearchIcon = () => (
    <svg
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        className="w-3.5 h-3.5 text-neutral-400"
    >
        <circle cx="7" cy="7" r="4.5" />
        <line x1="10.5" y1="10.5" x2="14" y2="14" />
    </svg>
);



export default function TransactionPage() {
    const [tab, setTab] = useState<FluxType>("entrant");
    const [search, setSearch] = useState("");
    const [drawerOpen, setDrawerOpen] = useState(false);

    const filtered = useMemo(
        () =>
            mockFlux.filter(
                (f) =>
                    f.type === tab &&
                    (f.title.toLowerCase().includes(search.toLowerCase()) ||
                        f.category
                            .toLowerCase()
                            .includes(search.toLowerCase())),
            ),
        [tab, search],
    );

    const total = filtered.reduce((s, f) => s + f.amount, 0);

    return (
        <div className="min-h-screen w-full bg-white font-[system-ui]">
            {/* ── Main content ── */}
            <div
                className={cn(
                    "transition-all duration-300 ease-in-out",
                    drawerOpen ? "mr-120" : "mr-0",
                )}
            >
                <div className="mx-auto px-8 py-10">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-8">
                        <div>
                            <p className="text-[11px] font-medium tracking-[0.12em] uppercase text-neutral-400 mb-1">
                                Finances
                            </p>
                            <h1 className="text-[28px] font-semibold tracking-tight text-black leading-none">
                                Flux
                            </h1>
                        </div>
                        <Button
                            onClick={() => setDrawerOpen(true)}
                            className="h-8 px-3.5 bg-black hover:bg-neutral-800 text-white text-[13px] font-medium rounded-lg flex items-center gap-1.5 shadow-none transition-colors"
                        >
                            <PlusIcon />
                            Nouveau flux
                        </Button>
                    </div>
                    {/* KPI strip */}
                    <div className="grid grid-cols-3 gap-3 mb-8">
                        {[
                            { label: "Total affiché", value: fmt(total) },
                            {
                                label: "Transactions",
                                value: filtered.length.toString(),
                            },
                            {
                                label: "En attente",
                                value: filtered
                                    .filter((f) => f.status === "en attente")
                                    .length.toString(),
                            },
                        ].map((kpi, i) => (
                            <div
                                key={i}
                                className="bg-neutral-50 rounded-xl px-4 py-3.5 border border-neutral-100"
                            >
                                <p className="text-[11px] font-medium text-neutral-400 tracking-wide uppercase mb-1">
                                    {kpi.label}
                                </p>
                                <p className="text-[20px] font-semibold text-black tracking-tight">
                                    {kpi.value}
                                </p>
                            </div>
                        ))}
                    </div>
                    {/* Tabs + Search */}
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-0.5 bg-neutral-100 rounded-lg p-0.5">
                            {(["entrant", "sortant"] as FluxType[]).map((t) => (
                                <button
                                    key={t}
                                    onClick={() => setTab(t)}
                                    className={cn(
                                        "px-4 py-1.5 rounded-md text-[13px] font-medium transition-all duration-150 capitalize",
                                        tab === t
                                            ? "bg-white text-black shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
                                            : "text-neutral-500 hover:text-neutral-700",
                                    )}
                                >
                                    {t === "entrant" ? "Entrants" : "Sortants"}
                                </button>
                            ))}
                        </div>

                        <div className="relative">
                            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
                                <SearchIcon />
                            </span>
                            <Input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Rechercher…"
                                className="pl-7 h-8 w-56 text-[13px] bg-neutral-50 border-neutral-200 rounded-lg placeholder:text-neutral-400 focus-visible:ring-1 focus-visible:ring-neutral-300 focus-visible:border-neutral-300 shadow-none"
                            />
                        </div>
                    </div>
                    {/* Table */}
                    <TransactionTable filtered={filtered} />
                </div>
            </div>
            {/* ── Drawer of form ── */}
            <TransactionForm
                drawerOpen={drawerOpen}
                onOpenChange={setDrawerOpen}
            />
        </div>
    );
}
