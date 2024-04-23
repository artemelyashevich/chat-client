import React from "react"
import ChatsBar from "../components/ChatsBar.tsx";

export const Chats: React.FC = () => {
    return (
        <React.Fragment>
            <div className='chats-container'>
                <ChatsBar/>
                <div className='chat-content-right'></div>
            </div>
        </React.Fragment>
    );
};
