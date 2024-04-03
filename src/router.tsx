import {createBrowserRouter} from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home.tsx";
import Auth from "./pages/Auth.tsx";
import NotFound from "./pages/NotFound.tsx";
import {Profile} from "./pages/Profile.tsx";
import {Chats} from "./pages/Chats.tsx";
import NewChat from "./pages/NewChat.tsx";
import Friends from "./pages/Friends.tsx";
import SearchPeople from "./pages/SearchPeople.tsx";
import SearchChats from "./pages/SearchChats.tsx";
import Chat from "./pages/Chat.tsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children: [
            {
                path: "/",
                element: <Home/>
            },
            {
                path: "/profile",
                element: <Profile/>
            },
            {
                path: "/chat",
                children: [
                    {
                        path: "/",
                        element: <Chats/>
                    },
                    {
                        path: "/new",
                        element: <NewChat/>
                    },
                    {
                        path: "/:id",
                        element: <Chat/>
                    }
                ]
            },
            {
                path: "/friends",
                element: <Friends/>
            },
            {
                path: "/searchPeople",
                element: <SearchPeople/>
            },
            {
                path: "/searchChats",
                element: <SearchChats/>
            }
        ]
    },
    {
        path: "/auth",
        element: <Auth/>
    },
    {
        path: "*",
        element: <NotFound/>
    }
])