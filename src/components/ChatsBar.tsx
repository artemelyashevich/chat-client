import React from 'react';
import {IRoom} from "../types.ts";
import {NavLink} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../hooks.ts";
import {getRooms} from "../store/slices/roomSlice.ts";

const ChatsBar: React.FC = () => {
    const dispatch = useAppDispatch()
    React.useEffect(() => {
        dispatch(getRooms())
    }, [])
    const {rooms, loading} = useAppSelector(store => store.room)
    return (
        <React.Fragment>
            <ul className='chats'>
                {loading
                    ? <React.Fragment>Loading...</React.Fragment>
                    : rooms.map((room: IRoom, index: number) => (
                        <NavLink to={`/chat/${room._id}`}>
                            <li key={index}>
                                {room.title}
                            </li>
                        </NavLink>
                    ))
                }
            </ul>
        </React.Fragment>
    );
};

export default ChatsBar;
