import React from 'react';
import ChatsBar from "./ChatsBar.tsx";

const Chat: React.FC = () => {
    return (
        <div className="chat">
            <ChatsBar/>
            <div className="chat-content">
                <p>Chat</p>
                <form>
                    <input placeholder="Enter message"/>
                    <button>Send</button>
                </form>
            </div>
        </div>
    )
};

export default Chat