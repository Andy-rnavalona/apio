import "./App.css";
import LoginPage from "./features/login/pages/login";
import { createBrowserRouter, RouterProvider } from "react-router";
import RootLayout from "@/layouts/RootLayout";
import { HomePage } from "@/features/home";
import NotFoundPage from "@/pages/NotFoundPage";
import { paths } from "@/routes/paths";
import TransactionPage from "./features/transaction/pages/transaction";
import ExercicesPage from "./features/exercise/page/exercices-page";

const router = createBrowserRouter([
    // Home Page
    { path: paths.home, element: <HomePage /> },
    // Routes applicatives, encapsulées par le RootLayout (SideBar)
    {
        element: <RootLayout />,
        children: [
            { path: paths.transaction, element: <TransactionPage /> },
            { path: paths.exercise, element: <ExercicesPage /> },
        ],
    },
    // Route login indépendante, hors RootLayout (pas de SideBar)
    { path: paths.login, element: <LoginPage /> },
    // Not Found Page
    { path: "*", element: <NotFoundPage /> },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
