import React from 'react';
import {IMessage, IUser} from "../types.ts";

type TMessage = {
    message: IMessage,
    user: IUser,
}

const Message: React.FC<TMessage> = ({message, user}) => {
    const dateCreated = new Date(String(message.createdAt)).toLocaleDateString()
    return (
        <li className={
            message.sender === user._id
                ? "chat-message-right"
                : "chat-message-left"
        }>
            <p className={
                message.sender === user._id
                    ? "chat-content-right"
                    : "chat-content-left"
            }>
                {message.content}
                <span>{dateCreated}</span>
            </p>

        </li>
    );
};

export default Message;
