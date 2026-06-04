import Field from "@/components/shared/field-shared";
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
import { Input } from "@/components/ui/input";
import { categories } from "../data/data";
import { useState } from "react";
import { Button } from "@/components/ui/button";

// ─── Form state ───────────────────────────────────────────────────────────────

const emptyForm = {
    title: "",
    description: "",
    amount: "",
    category: "",
    subcategory: "",
    date: "",
};

type TransactionFormProps = {
    drawerOpen: boolean;
    onOpenChange: (open: boolean) => void;
};

export default function TransactionForm({
    drawerOpen,
    onOpenChange,
}: TransactionFormProps) {
    const [form, setForm] = useState(emptyForm);
    const subcategories = form.category
        ? (categories[form.category] ?? [])
        : [];

    function handleSubmit() {
        onOpenChange(false);
        setForm(emptyForm);
    }

    return (
        <Sheet open={drawerOpen} onOpenChange={onOpenChange}>
            <SheetContent
                side="right"
                className="w-120 p-0 border-l border-neutral-100 shadow-[-20px_0_60px_rgba(0,0,0,0.04)] bg-white flex flex-col"
            >
                {/* Drawer header */}
                <SheetHeader className="px-7 pt-7 pb-5 border-b border-neutral-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-[10px] font-semibold tracking-[0.14em] uppercase text-neutral-400 mb-1">
                                Nouveau
                            </p>
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
                            onChange={(e) =>
                                setForm((p) => ({
                                    ...p,
                                    title: e.target.value,
                                }))
                            }
                            placeholder="Ex : Virement client Acme"
                            className="h-9 text-[13px] border-neutral-200 rounded-lg shadow-none focus-visible:ring-1 focus-visible:ring-neutral-300 placeholder:text-neutral-400"
                        />
                    </Field>

                    {/* Description */}
                    <Field label="Description">
                        <Textarea
                            value={form.description}
                            onChange={(e) =>
                                setForm((p) => ({
                                    ...p,
                                    description: e.target.value,
                                }))
                            }
                            placeholder="Détails du flux, référence, contexte…"
                            rows={3}
                            className="text-[13px] border-neutral-200 rounded-lg shadow-none focus-visible:ring-1 focus-visible:ring-neutral-300 resize-none placeholder:text-neutral-400 leading-relaxed"
                        />
                    </Field>

                    {/* Montant */}
                    <Field label="Montant" required>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 text-[13px] font-medium pointer-events-none">
                                €
                            </span>
                            <Input
                                type="number"
                                value={form.amount}
                                onChange={(e) =>
                                    setForm((p) => ({
                                        ...p,
                                        amount: e.target.value,
                                    }))
                                }
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
                                onValueChange={(v) =>
                                    setForm((p) => ({
                                        ...p,
                                        category: v,
                                        subcategory: "",
                                    }))
                                }
                            >
                                <SelectTrigger className="h-9 text-[13px] border-neutral-200 rounded-lg shadow-none focus:ring-1 focus:ring-neutral-300 data-placeholder:text-neutral-400">
                                    <SelectValue placeholder="Sélectionner" />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl border-neutral-100 shadow-xl text-[13px]">
                                    {Object.keys(categories).map((c) => (
                                        <SelectItem
                                            key={c}
                                            value={c}
                                            className="rounded-lg"
                                        >
                                            {c}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </Field>

                        <Field label="Sous-catégorie">
                            <Select
                                value={form.subcategory}
                                onValueChange={(v) =>
                                    setForm((p) => ({ ...p, subcategory: v }))
                                }
                                disabled={!form.category}
                            >
                                <SelectTrigger className="h-9 text-[13px] border-neutral-200 rounded-lg shadow-none focus:ring-1 focus:ring-neutral-300 disabled:opacity-40 data-placeholder:text-neutral-400">
                                    <SelectValue placeholder="Sélectionner" />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl border-neutral-100 shadow-xl text-[13px]">
                                    {subcategories.map((s) => (
                                        <SelectItem
                                            key={s}
                                            value={s}
                                            className="rounded-lg"
                                        >
                                            {s}
                                        </SelectItem>
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
                            onChange={(e) =>
                                setForm((p) => ({ ...p, date: e.target.value }))
                            }
                            className="h-9 text-[13px] border-neutral-200 rounded-lg shadow-none focus-visible:ring-1 focus-visible:ring-neutral-300 text-neutral-700"
                        />
                    </Field>
                </div>

                {/* Drawer footer */}
                <div className="px-7 py-5 border-t border-neutral-100 flex items-center justify-between gap-3 bg-white">
                    <Button
                        variant="ghost"
                        onClick={() => onOpenChange(false)}
                        className="h-9 px-4 text-[13px] text-neutral-500 hover:text-black hover:bg-neutral-100 rounded-lg font-medium"
                    >
                        Annuler
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        disabled={
                            !form.title ||
                            !form.amount ||
                            !form.category ||
                            !form.date
                        }
                        className="h-9 px-5 bg-black hover:bg-neutral-800 text-white text-[13px] font-medium rounded-lg shadow-none transition-colors disabled:opacity-30"
                    >
                        Enregistrer le flux
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    );
}
