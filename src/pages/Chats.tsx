import React from "react"
import {useAppDispatch, useAppSelector} from "../hooks.ts";
import {getRooms} from "../store/slices/roomSlice.ts";
import {IRoom} from "../types.ts";

export const Chats: React.FC = () => {
    const dispatch = useAppDispatch()
    React.useEffect(() => {
        dispatch(getRooms())
    }, [])
    const {rooms, loading} = useAppSelector(store => store.room)
    return (
        <React.Fragment>
            {
                loading
                    ? <React.Fragment>
                        Loading...
                    </React.Fragment>
                    : <ul className='chats'>
                        {
                            rooms.map((room: IRoom, index: number) => (
                                <li key={index}>
                                    <h2>{room.title}</h2>
                                </li>
                            ))
                        }
                    </ul>
            }
        </React.Fragment>
    );
};
