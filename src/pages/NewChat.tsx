import React from "react"
import {IRoom, IUser} from "../types.ts";
import {useAppDispatch, useAppSelector} from "../hooks.ts";
import {searchPeople} from "../store/slices/peopleSlice.ts";
import debounce from 'lodash.debounce'
import {createRoom, getRooms} from "../store/slices/roomSlice.ts";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";

// TODO: придумать красивую форму

export const NewChat: React.FC = () => {
    const peopleList: IUser[] = []
    const {people, loading} = useAppSelector(store => store.people)
    const {user} = useAppSelector(store => store.user)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const handleChange = (e: any): void => {
        dispatch(searchPeople(e.target.value))
    }
    const debounceSearch = debounce(handleChange, 300)
    const handleAddToChat = (user: IUser): void => {
        if (peopleList.includes(user)) {
            delete peopleList[peopleList.lastIndexOf(user)]
        } else {
            peopleList.push(user)
        }
    }
    const handleCreateChat = (): void => {
        console.log(peopleList)
        const room: IRoom = {
            title: peopleList[0].name,
            // @ts-ignore
            usersId: [user, ...peopleList].map(user => {
                return {"userId": user._id}
            }),
            creatorId: user._id
        }
        dispatch(createRoom(room))
        dispatch(getRooms())
        navigate(`/chats/`)
    }

    const {handleSubmit} = useForm()

    return (
        <React.Fragment>
            <h2 className="new-chat-label">Search People to create new chat...</h2>
            <form onSubmit={handleSubmit(handleCreateChat)} className="new-chat">
                <div className="search-people">
                    <input onChange={debounceSearch} placeholder="Search people..."/>
                    <ul className="friends-list">
                        {
                            loading
                                ? <p>Loading...</p>
                                : people.length > 0 && people.map((user: IUser, index: number) => (
                                <li key={index}>
                                    <h2>{user.name}</h2>
                                    <h2>{user.email}</h2>
                                    <button type="button" onClick={() => handleAddToChat(user)}>Add to chat</button>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <button type="submit">Create Chat</button>
            </form>
        </React.Fragment>
    )
}

export default NewChat