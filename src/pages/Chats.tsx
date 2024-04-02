import React from "react";
import {SocketApi} from "../api/socket-api.ts";

export const Chats: React.FC = () => {
    const [message, setMessage] = React.useState<string>("")
    const handleSendMessage = () => {
        console.log(message)
        SocketApi.sendMessage(message)
    }
    return (
        <div>
            <input onChange={e => setMessage(e.target.value)}/>
            <button onClick={handleSendMessage}>Submit</button>
        </div>
    );
};
