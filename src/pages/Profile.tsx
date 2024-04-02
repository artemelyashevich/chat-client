import React from "react"
import {useAppDispatch, useAppSelector} from "../hooks.ts";
import {fetchMe} from "../store/slices/userSlice.ts";

export const Profile: React.FC = () => {
    const {token} = useAppSelector(store => store.auth)
    const {user, loading, error} = useAppSelector(store => store.user)
    const dispatch = useAppDispatch()
    React.useEffect(() => {
        dispatch(fetchMe(token))
    }, [])
    return (
        <div className="profile">
            {
                loading
                    ? <p>Loading...</p>
                    : <div>
                        <img src={user.image} alt="avatar"/>
                        <h1>{user.name}</h1>
                        <h1>{user.email}</h1>
                    </div>
            }
            {
                error && <p className="errors">{error}</p>
            }
        </div>
    )
}