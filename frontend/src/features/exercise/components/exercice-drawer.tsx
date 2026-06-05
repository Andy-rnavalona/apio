import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { type Exercice } from "../types/type.ts";

// ─── Icons ────────────────────────────────────────────────────────────────────

const AlertIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-neutral-400 flex-shrink-0 mt-0.5">
    <circle cx="8" cy="8" r="6.5" />
    <line x1="8" y1="5" x2="8" y2="8.5" />
    <line x1="8" y1="11" x2="8" y2="11.2" strokeWidth={2} strokeLinecap="round" />
  </svg>
);

// ─── Types ────────────────────────────────────────────────────────────────────

type FormData = Pick<Exercice, "name" | "startDate" | "endDate">;
const emptyForm: FormData = { name: "", startDate: "", endDate: "" };

interface NouvelExerciceDrawerProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  hasActiveExercice: boolean;
  onSubmit: (data: Omit<Exercice, "id" | "status" | "transactionCount" | "totalAmount">) => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function NouvelExerciceDrawer({
  open,
  onOpenChange,
  hasActiveExercice,
  onSubmit,
}: NouvelExerciceDrawerProps) {
  const [form, setForm] = useState<FormData>(emptyForm);

  const isValid =
    form.name.trim() !== "" &&
    form.startDate !== "" &&
    form.endDate !== "" &&
    form.endDate > form.startDate;

  function handleSubmit() {
    if (!isValid) return;
    onSubmit(form);
    setForm(emptyForm);
    onOpenChange(false);
  }

  function handleClose() {
    setForm(emptyForm);
    onOpenChange(false);
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-110 p-0 border-l border-neutral-100 shadow-[-20px_0_60px_rgba(0,0,0,0.04)] bg-white flex flex-col"
      >
        {/* Header */}
        <SheetHeader className="px-7 pt-7 pb-5 border-b border-neutral-100">
          <p className="text-[10px] font-semibold tracking-[0.14em] uppercase text-neutral-400 mb-1">
            Exercices
          </p>
          <SheetTitle className="text-[20px] font-semibold tracking-tight text-black leading-none m-0 p-0">
            Nouvel exercice
          </SheetTitle>
        </SheetHeader>

        {/* Form body */}
        <div className="flex-1 overflow-y-auto px-7 py-6 space-y-5">

          {/* Warning if active exercice exists */}
          {hasActiveExercice && (
            <div className="flex items-start gap-2.5 bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3">
              <AlertIcon />
              <p className="text-[12px] text-neutral-500 leading-relaxed">
                Un exercice actif existe déjà. Le nouvel exercice sera créé mais un seul exercice peut
                être actif à la fois.
              </p>
            </div>
          )}

          {/* Nom */}
          <Field label="Nom de l'exercice" required>
            <Input
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              placeholder="Ex : Exercice 2027"
              className="h-9 text-[13px] border-neutral-200 rounded-lg shadow-none focus-visible:ring-1 focus-visible:ring-neutral-300 placeholder:text-neutral-400"
            />
          </Field>

          <Separator className="bg-neutral-100" />

          {/* Date de début */}
          <Field label="Date de début" required>
            <Input
              type="date"
              value={form.startDate}
              onChange={(e) => setForm((p) => ({ ...p, startDate: e.target.value }))}
              className="h-9 text-[13px] border-neutral-200 rounded-lg shadow-none focus-visible:ring-1 focus-visible:ring-neutral-300 text-neutral-700"
            />
          </Field>

          {/* Date de fin */}
          <Field label="Date de fin" required>
            <Input
              type="date"
              value={form.endDate}
              min={form.startDate || undefined}
              onChange={(e) => setForm((p) => ({ ...p, endDate: e.target.value }))}
              className="h-9 text-[13px] border-neutral-200 rounded-lg shadow-none focus-visible:ring-1 focus-visible:ring-neutral-300 text-neutral-700"
            />
            {form.startDate && form.endDate && form.endDate <= form.startDate && (
              <p className="text-[11px] text-neutral-500 mt-1">
                La date de fin doit être postérieure à la date de début.
              </p>
            )}
          </Field>
        </div>

        {/* Footer */}
        <div className="px-7 py-5 border-t border-neutral-100 flex items-center justify-between gap-3 bg-white">
          <Button
            variant="ghost"
            onClick={handleClose}
            className="h-9 px-4 text-[13px] text-neutral-500 hover:text-black hover:bg-neutral-100 rounded-lg font-medium shadow-none"
          >
            Annuler
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!isValid}
            className="h-9 px-5 bg-black hover:bg-neutral-800 text-white text-[13px] font-medium rounded-lg shadow-none transition-colors disabled:opacity-30"
          >
            Créer l'exercice
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

// ─── Field helper ─────────────────────────────────────────────────────────────

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-[12px] font-medium text-neutral-600 tracking-wide">
        {label}
        {required && <span className="ml-0.5 text-neutral-400">*</span>}
      </label>
      {children}
    </div>
  );
}