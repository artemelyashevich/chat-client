import React from 'react';
import ChatsBar from "./ChatsBar.tsx";
import {useAppSelector, useChat} from "../hooks.ts";
import {useParams} from "react-router-dom";
import {useForm} from "react-hook-form";
import {IMessage} from "../types.ts";

const Chat: React.FC = () => {
    const params = useParams()
    // @ts-ignore
    const {users, messages, log, sendMessage, removeMessage} = useChat()
    const {user} = useAppSelector(store => store.user)


    const submit = (data: any): void => {
        // @ts-ignore
        sendMessage({
            sender: user._id,
            content: data.message,
            // @ts-ignore
            roomId: params.id,
        })
        reset()
    }

    const {handleSubmit, register, reset} = useForm()

    messages.forEach(message => {
        console.log(message.sender)
    })

    return (
        <div className="chat">
            <ChatsBar/>
            <div className="chat-content">
                <ul>
                    {
                        messages.length !== 0 && messages.map(
                            (message: IMessage, index: number) => (
                                <li className={
                                    message.sender === user._id
                                        ? "chat-message-right"
                                        : "chat-message-left"
                                } key={index}>
                                    <p className={
                                        message.sender === user._id
                                            ? "chat-content-right"
                                            : "chat-content-left"
                                    }>
                                        {message.content}
                                    </p>
                                </li>
                            )
                        )
                    }
                </ul>
                <form onSubmit={handleSubmit(submit)}>
                    <input {...register("message")} placeholder="Enter message"/>
                    <button type="submit">Send</button>
                </form>
            </div>
        </div>
    )
};

export default Chat