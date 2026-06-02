import { Outlet } from 'react-router'

/**
 * Layout racine partagé par toutes les routes.
 * Mettre ici les éléments persistants (header, footer, providers de contexte…).
 * <Outlet /> rend la route enfant active.
 */
function RootLayout() {
  return (
    <div className="min-h-screen">
      <span>SideBar</span>
      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default RootLayout
