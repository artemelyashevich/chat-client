import React from "react"
import ChatsBar from "../components/ChatsBar.tsx";
import {useAppDispatch, useAppSelector} from "../hooks.ts";
import {getRooms} from "../store/slices/roomSlice.ts";
import {NavLink} from "react-router-dom";

export const Chats: React.FC = () => {
    const dispatch = useAppDispatch()
    React.useEffect(() => {
        dispatch(getRooms())
    }, [])
    const {rooms, loading} = useAppSelector(store => store.room)
    return (
        <React.Fragment>
            <div className='chats-container'>
                <ChatsBar/>
                <div className='chat-content-text'>
                    {
                        !loading && rooms.length === 0
                            ? <React.Fragment>
                                <NavLink to={'/chat-new'}>
                                    Create new chat
                                </NavLink>
                            </React.Fragment>
                            : <React.Fragment>Select chat to send message</React.Fragment>
                    }
                </div>
            </div>
        </React.Fragment>
    );
};
