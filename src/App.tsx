import { createBrowserRouter, RouterProvider } from 'react-router'
import RootLayout from '@/layouts/RootLayout'
import { HomePage } from '@/features/home'
import { LoginPage } from '@/features/auth'
import NotFoundPage from '@/pages/NotFoundPage'
import { paths } from '@/routes/paths'

const router = createBrowserRouter([
  // Routes applicatives, encapsulées par le RootLayout (SideBar, etc.)
  {
    element: <RootLayout />,
    children: [
      { path: paths.home, element: <HomePage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
  // Route login indépendante, hors RootLayout (pas de SideBar)
  { path: paths.login, element: <LoginPage /> },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
