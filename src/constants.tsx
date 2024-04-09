import {ILeftBarNavs} from "./types.ts"
import {BsChatSquareDots, BsHouseDoor, BsPen, BsPerson} from "react-icons/bs";

export const leftBarNavs: ILeftBarNavs[] = [
    {
        element: <BsHouseDoor/>,
        path: "/"
    },
    {
        element: <BsPerson/>,
        path: "/profile"
    },
    {
        element: <BsPen/>,
        path: "/chat-new"
    },
    {
        element: <BsChatSquareDots/>,
        path: "/chats"
    },
]