import { FloatingSidebar } from "@/components/layout/sidebar";
import { Outlet } from "react-router";

/**
 * Layout racine partagé par toutes les routes.
 * Mettre ici les éléments persistants (header, footer, providers de contexte…).
 * <Outlet /> rend la route enfant active.
 */
function RootLayout() {
    return (
        <div className="min-h-screen">
            <FloatingSidebar />
            <div className="ml-20 min-h-screen py-2 px-5 flex">
                <Outlet />
            </div>
        </div>
    );
}

export default RootLayout;
