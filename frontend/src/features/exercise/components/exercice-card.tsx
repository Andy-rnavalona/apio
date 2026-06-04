"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

import { useExercices } from "./hooks/useExercices";
import { ExercicesHeader } from "./components/ExercicesHeader";
import { ExercicesKpiStrip } from "./components/ExercicesKpiStrip";
import { ExercicesGrid } from "./components/ExercicesGrid";
import { NouvelExerciceDrawer } from "./components/NouvelExerciceDrawer";
import { Exercice } from "./types/exercice.types";

export default function ExercicesPage() {
    const {
        exercices,
        activeExercice,
        closedExercices,
        addExercice,
        cloturer,
    } = useExercices();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const { toast } = useToast();

    function handleInspect(id: string) {
        // Navigate to detail — hook up your router here
        toast({
            title: "Inspection",
            description: `Ouverture de l'exercice ${exercices.find((e) => e.id === id)?.name}…`,
        });
    }

    function handleCloturer(id: string) {
        cloturer(id);
        const name = exercices.find((e) => e.id === id)?.name ?? "l'exercice";
        toast({
            title: `${name} clôturé`,
            description: "L'exercice a été clôturé avec succès.",
        });
    }

    function handleCreate(
        data: Omit<
            Exercice,
            "id" | "status" | "transactionCount" | "totalAmount"
        >,
    ) {
        addExercice(data);
        toast({
            title: "Exercice créé",
            description: `${data.name} a été créé avec succès.`,
        });
    }

    return (
        <div
            className="min-h-screen bg-white"
            style={{ fontFamily: "'DM Sans', 'Geist', system-ui, sans-serif" }}
        >
            <div
                className={cn(
                    "transition-all duration-300 ease-in-out",
                    drawerOpen ? "mr-[440px]" : "mr-0",
                )}
            >
                <div className="max-w-[1100px] mx-auto px-8 py-10">
                    <ExercicesHeader
                        exerciceCount={exercices.length}
                        onNew={() => setDrawerOpen(true)}
                    />
                    <ExercicesKpiStrip exercices={exercices} />
                    <ExercicesGrid
                        activeExercice={activeExercice}
                        closedExercices={closedExercices}
                        onInspect={handleInspect}
                        onCloturer={handleCloturer}
                    />
                </div>
            </div>

            <NouvelExerciceDrawer
                open={drawerOpen}
                onOpenChange={setDrawerOpen}
                hasActiveExercice={!!activeExercice}
                onSubmit={handleCreate}
            />

            <Toaster />
        </div>
    );
}
