import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import Auth from "./pages/Auth/Auth";
import NotFound from "./pages/NotFound/NotFound";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Home />
            }
        ]
    },
    {
        path: "/auth",
        element: <Auth />
    },
    {
        path: "*",
        element: <NotFound />
    }
])