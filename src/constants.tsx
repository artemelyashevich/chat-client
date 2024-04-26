import { ILeftBarNavs } from "./types.ts"
import { BsChatSquareDots, BsPen, BsPerson } from "react-icons/bs";

export const leftBarNavs: ILeftBarNavs[] = [
    {
        element: <BsPerson />,
        path: "/"
    },
    {
        element: <BsPen />,
        path: "/chat-new"
    },
    {
        element: <BsChatSquareDots />,
        path: "/chats"
    },
]