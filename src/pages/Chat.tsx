import React from 'react';
import ChatsBar from "../components/ChatsBar.tsx";
import {useAppSelector, useChat} from "../hooks.ts";
import {useParams} from "react-router-dom";
import {useForm} from "react-hook-form";
import {IMessage} from "../types.ts";
import Message from "../components/Message.tsx";

const Chat: React.FC = () => {
    const params = useParams()
    // @ts-ignore
    const {users, messages, log, sendMessage, removeMessage} = useChat()
    const {user} = useAppSelector(store => store.user)

    console.log(messages)

    const submit = (data: any): void => {
        // @ts-ignore
        sendMessage({
            sender: user._id,
            content: data.message.trim(''),
            // @ts-ignore
            roomId: params.id,
        })
        reset()
    }

    const {handleSubmit, register, reset} = useForm()

    return (
        <div className="chat">
            <ChatsBar/>
            <div className="chat-content">
                <ul>
                    {
                        messages.length !== 0 && messages.map(
                            (message: IMessage, index: number) => (
                                <Message message={message} user={user} key={index}/>
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