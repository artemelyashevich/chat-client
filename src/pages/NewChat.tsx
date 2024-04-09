import React from "react"
import {IRoom, IUser} from "../types.ts";
import {useAppDispatch, useAppSelector} from "../hooks.ts";
import {searchPeople} from "../store/slices/peopleSlice.ts";
import debounce from 'lodash.debounce'
import {createRoom} from "../store/slices/roomSlice.ts";
import {useForm} from "react-hook-form";

export const NewChat: React.FC = () => {
    const peopleList: IUser[] = []
    const {people, loading} = useAppSelector(store => store.people)
    const {user} = useAppSelector(store => store.user)
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
            usersId: peopleList.map(user => user._id),
            creatorId: user._id
        }
        dispatch(createRoom(room))
     //   dispatch(getRooms())
      //  const {rooms} = useAppSelector(store => store.room)
      //  navigate(`/chats/${rooms[0]}`)
    }

    const {handleSubmit} = useForm()

    return (
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
    )
}

export default NewChat