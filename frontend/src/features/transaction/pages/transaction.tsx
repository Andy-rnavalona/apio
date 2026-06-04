"use client";

import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import type { FluxType } from "../types";
import { categories, mockFlux } from "../data/data";
import Field from "@/components/shared/field-shared";

const fmt = (n: number) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);

const fmtDate = (d: string) =>
  new Date(d).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" });

const statusStyle: Record<string, string> = {
  validé:      "bg-black text-white",
  "en attente": "bg-neutral-100 text-neutral-600 border border-neutral-200",
  rejeté:      "bg-neutral-200 text-neutral-500 line-through",
};

// ─── Icons ────────────────────────────────────────────────────────────────────

const PlusIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" className="w-3.5 h-3.5">
    <line x1="8" y1="2" x2="8" y2="14" /><line x1="2" y1="8" x2="14" y2="8" />
  </svg>
);

const SearchIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" className="w-3.5 h-3.5 text-neutral-400">
    <circle cx="7" cy="7" r="4.5" /><line x1="10.5" y1="10.5" x2="14" y2="14" />
  </svg>
);

const ArrowUpIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
    <line x1="8" y1="13" x2="8" y2="3" /><polyline points="4 7 8 3 12 7" />
  </svg>
);

const ArrowDownIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
    <line x1="8" y1="3" x2="8" y2="13" /><polyline points="4 9 8 13 12 9" />
  </svg>
);

// ─── Form state ───────────────────────────────────────────────────────────────

const emptyForm = { title: "", description: "", amount: "", category: "", subcategory: "", date: "" };

export default function TransactionPage() {
  const [tab, setTab] = useState<FluxType>("entrant");
  const [search, setSearch] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const subcategories = form.category ? categories[form.category] ?? [] : [];

  const filtered = useMemo(() =>
    mockFlux.filter(f =>
      f.type === tab &&
      (f.title.toLowerCase().includes(search.toLowerCase()) ||
       f.category.toLowerCase().includes(search.toLowerCase()))
    ), [tab, search]);

  const total = filtered.reduce((s, f) => s + f.amount, 0);

  function handleSubmit() {
    setDrawerOpen(false);
    setForm(emptyForm);
  }

  return (
    <div className="min-h-screen w-full bg-white font-[system-ui]">

      {/* ── Main content ── */}
      <div
        className={cn(
          "transition-all duration-300 ease-in-out",
          drawerOpen ? "mr-120" : "mr-0"
        )}
      >
        <div className="mx-auto px-8 py-10">
          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <p className="text-[11px] font-medium tracking-[0.12em] uppercase text-neutral-400 mb-1">Finances</p>
              <h1 className="text-[28px] font-semibold tracking-tight text-black leading-none">Flux</h1>
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
              { label: "Transactions", value: filtered.length.toString() },
              { label: "En attente", value: filtered.filter(f => f.status === "en attente").length.toString() },
            ].map((kpi, i) => (
              <div key={i} className="bg-neutral-50 rounded-xl px-4 py-3.5 border border-neutral-100">
                <p className="text-[11px] font-medium text-neutral-400 tracking-wide uppercase mb-1">{kpi.label}</p>
                <p className="text-[20px] font-semibold text-black tracking-tight">{kpi.value}</p>
              </div>
            ))}
          </div>

          {/* Tabs + Search */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-0.5 bg-neutral-100 rounded-lg p-0.5">
              {(["entrant", "sortant"] as FluxType[]).map(t => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={cn(
                    "px-4 py-1.5 rounded-md text-[13px] font-medium transition-all duration-150 capitalize",
                    tab === t
                      ? "bg-white text-black shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
                      : "text-neutral-500 hover:text-neutral-700"
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
                onChange={e => setSearch(e.target.value)}
                placeholder="Rechercher…"
                className="pl-7 h-8 w-56 text-[13px] bg-neutral-50 border-neutral-200 rounded-lg placeholder:text-neutral-400 focus-visible:ring-1 focus-visible:ring-neutral-300 focus-visible:border-neutral-300 shadow-none"
              />
            </div>
          </div>

          {/* Table */}
          <div className="rounded-xl border border-neutral-100 overflow-hidden">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="border-b border-neutral-100 bg-neutral-50">
                  {["ID", "Titre", "Catégorie", "Date", "Statut", "Montant"].map(h => (
                    <th key={h} className={cn(
                      "px-4 py-2.5 text-left text-[11px] font-semibold text-neutral-400 tracking-wider uppercase",
                      h === "Montant" && "text-right"
                    )}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-16 text-center text-neutral-400 text-[13px]">
                      Aucun flux trouvé
                    </td>
                  </tr>
                ) : filtered.map((f, i) => (
                  <tr
                    key={f.id}
                    className={cn(
                      "border-b border-neutral-100/70 transition-colors duration-100 cursor-pointer group",
                      "hover:bg-neutral-50/80",
                      i === filtered.length - 1 && "border-b-0"
                    )}
                  >
                    <td className="px-4 py-3.5">
                      <span className="font-mono text-[11px] text-neutral-400">{f.id}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <p className="font-medium text-black">{f.title}</p>
                      <p className="text-neutral-400 text-[11px] mt-0.5 truncate max-w-[220px]">{f.description}</p>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="text-neutral-600">{f.category}</span>
                      <span className="text-neutral-300 mx-1">/</span>
                      <span className="text-neutral-400">{f.subcategory}</span>
                    </td>
                    <td className="px-4 py-3.5 text-neutral-500 whitespace-nowrap">{fmtDate(f.date)}</td>
                    <td className="px-4 py-3.5">
                      <span className={cn("inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium", statusStyle[f.status])}>
                        {f.status}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <span className={cn(
                        "font-semibold tabular-nums flex items-center justify-end gap-1",
                        f.type === "entrant" ? "text-black" : "text-neutral-500"
                      )}>
                        {f.type === "entrant" ? <ArrowUpIcon /> : <ArrowDownIcon />}
                        {fmt(f.amount)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer count */}
          <p className="mt-3 text-[11px] text-neutral-400 text-right">
            {filtered.length} résultat{filtered.length > 1 ? "s" : ""}
          </p>

        </div>
      </div>

      {/* ── Drawer ── */}
      <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
        <SheetContent
          side="right"
          className="w-120 p-0 border-l border-neutral-100 shadow-[-20px_0_60px_rgba(0,0,0,0.04)] bg-white flex flex-col"
        >
          {/* Drawer header */}
          <SheetHeader className="px-7 pt-7 pb-5 border-b border-neutral-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-semibold tracking-[0.14em] uppercase text-neutral-400 mb-1">Nouveau</p>
                <SheetTitle className="text-[20px] font-semibold tracking-tight text-black leading-none m-0 p-0">
                  Flux financier
                </SheetTitle>
              </div>
            </div>
          </SheetHeader>

          {/* Form */}
          <div className="flex-1 overflow-y-auto px-7 py-6 space-y-5">

            {/* Titre */}
            <Field label="Titre" required>
              <Input
                value={form.title}
                onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
                placeholder="Ex : Virement client Acme"
                className="h-9 text-[13px] border-neutral-200 rounded-lg shadow-none focus-visible:ring-1 focus-visible:ring-neutral-300 placeholder:text-neutral-400"
              />
            </Field>

            {/* Description */}
            <Field label="Description">
              <Textarea
                value={form.description}
                onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
                placeholder="Détails du flux, référence, contexte…"
                rows={3}
                className="text-[13px] border-neutral-200 rounded-lg shadow-none focus-visible:ring-1 focus-visible:ring-neutral-300 resize-none placeholder:text-neutral-400 leading-relaxed"
              />
            </Field>

            {/* Montant */}
            <Field label="Montant" required>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 text-[13px] font-medium pointer-events-none">€</span>
                <Input
                  type="number"
                  value={form.amount}
                  onChange={e => setForm(p => ({ ...p, amount: e.target.value }))}
                  placeholder="0"
                  className="h-9 pl-7 text-[13px] border-neutral-200 rounded-lg shadow-none focus-visible:ring-1 focus-visible:ring-neutral-300 placeholder:text-neutral-400 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>
            </Field>

            <Separator className="bg-neutral-100" />

            {/* Catégorie + Sous-catégorie */}
            <div className="grid grid-cols-2 gap-3">
              <Field label="Catégorie" required>
                <Select
                  value={form.category}
                  onValueChange={v => setForm(p => ({ ...p, category: v, subcategory: "" }))}
                >
                  <SelectTrigger className="h-9 text-[13px] border-neutral-200 rounded-lg shadow-none focus:ring-1 focus:ring-neutral-300 data-placeholder:text-neutral-400">
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-neutral-100 shadow-xl text-[13px]">
                    {Object.keys(categories).map(c => (
                      <SelectItem key={c} value={c} className="rounded-lg">{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>

              <Field label="Sous-catégorie">
                <Select
                  value={form.subcategory}
                  onValueChange={v => setForm(p => ({ ...p, subcategory: v }))}
                  disabled={!form.category}
                >
                  <SelectTrigger className="h-9 text-[13px] border-neutral-200 rounded-lg shadow-none focus:ring-1 focus:ring-neutral-300 disabled:opacity-40 data-placeholder:text-neutral-400">
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-neutral-100 shadow-xl text-[13px]">
                    {subcategories.map(s => (
                      <SelectItem key={s} value={s} className="rounded-lg">{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </div>

            {/* Date */}
            <Field label="Date" required>
              <Input
                type="date"
                value={form.date}
                onChange={e => setForm(p => ({ ...p, date: e.target.value }))}
                className="h-9 text-[13px] border-neutral-200 rounded-lg shadow-none focus-visible:ring-1 focus-visible:ring-neutral-300 text-neutral-700"
              />
            </Field>

          </div>

          {/* Drawer footer */}
          <div className="px-7 py-5 border-t border-neutral-100 flex items-center justify-between gap-3 bg-white">
            <Button
              variant="ghost"
              onClick={() => setDrawerOpen(false)}
              className="h-9 px-4 text-[13px] text-neutral-500 hover:text-black hover:bg-neutral-100 rounded-lg font-medium"
            >
              Annuler
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!form.title || !form.amount || !form.category || !form.date}
              className="h-9 px-5 bg-black hover:bg-neutral-800 text-white text-[13px] font-medium rounded-lg shadow-none transition-colors disabled:opacity-30"
            >
              Enregistrer le flux
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

