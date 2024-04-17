import {useDispatch, useSelector, TypedUseSelectorHook} from "react-redux"
import {RootState, AppDispatch} from './store'
import React from "react"
import {IMessage, IUser} from "./types.ts";
import io from "socket.io-client";
import {useParams} from "react-router-dom";


export const useAppDispatch = () => useDispatch<AppDispatch>()

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useChat = () => {
    const params = useParams()
    const {user} = useAppSelector(store => store.user)
    const [users, setUsers] = React.useState<IUser[]>([])
    const [log, setLog] = React.useState<string | null>(null)
    const [messages, setMessages] = React.useState<IMessage[]>([])
    const {current: socket} = React.useRef(
        io("http://localhost:8080", {
            query: {
                roomId: params.id,
                userId: user._id
            }
        })
    )

    React.useEffect(() => {
        socket.emit('user:add', user)
        socket.emit('message:get')
        socket.on('log', (log): void => {
            setLog(log)
        })
        socket.on('user_list:update', (users): void => {
            setUsers(users)
        })
        socket.on('message_list:update', (messages): void => {
            setMessages(messages)
        })
    }, [])

    const sendMessage = (message: IMessage): void => {
        socket.emit('message:add', message)
    }

    const removeMessage = (message: IMessage): void => {
        socket.emit('message:remove', message)
    }

    return {users, messages, log, sendMessage, removeMessage}
}