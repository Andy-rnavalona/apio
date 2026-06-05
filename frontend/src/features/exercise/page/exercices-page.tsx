"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner"
import { useExercices } from "../hooks/use-exercice.tsx";
import { ExercicesHeader } from "../components/exercice-header.tsx";
import { ExercicesKpiStrip } from "../components/exercice-skip-trip.tsx";
import { ExercicesGrid } from "../components/exercice-grid.tsx";
import { NouvelExerciceDrawer } from "../components/exercice-drawer.tsx";
import { type Exercice } from "../types/type.ts";

export default function ExercicesPage() {
    const {
        exercices,
        activeExercice,
        closedExercices,
        addExercice,
        cloturer,
    } = useExercices();
    const [drawerOpen, setDrawerOpen] = useState(false);

    function handleInspect(id: string) {
        // Navigate to detail — hook up your router here
        toast.success( "Inspection", {
            description: `Ouverture de l'exercice ${exercices.find((e) => e.id === id)?.name}…`,
        });
    }

    function handleCloturer(id: string) {
        cloturer(id);
        const name = exercices.find((e) => e.id === id)?.name ?? "l'exercice";
        toast.info(`${name} clôturé`,{
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
        toast.success("Exercice créé",{
            description: `${data.name} a été créé avec succès.`,
        });
    }

    return (
        <div
            className="min-h-screen bg-white w-full"
            style={{ fontFamily: "'DM Sans', 'Geist', system-ui, sans-serif" }}
        >
            <div
                className={cn(
                    "transition-all duration-300 ease-in-out",
                    drawerOpen ? "mr-110" : "mr-0",
                )}
            >
                <div className="mx-auto px-8 py-10">
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
        </div>
    );
}
