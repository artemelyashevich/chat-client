import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Auth from "./pages/Auth.tsx";
import NotFound from "./pages/NotFound.tsx";
import { Profile } from "./pages/Profile.tsx";
import { Chats } from "./pages/Chats.tsx";
import NewChat from "./pages/NewChat.tsx";
import Chat from "./pages/Chat.tsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Profile />
            },
            {
                path: "/chats",
                element: <Chats />,
            },
            {
                path: "/chat-new",
                element: <NewChat />
            },
            {
                path: "/chat/:id",
                element: <Chat />
            }
        ]
    },
    {
        path: "/auth",
        element:
            <Auth />
    }
    ,
    {
        path: "*",
        element:
            <NotFound />
    }
])