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
        <>
            {
                loading
                    ? <p>Loading...</p>
                    : <div className="profile">
                        <div className="profile__left">
                            <img src={user.image} alt="avatar"/>
                        </div>
                        <div className="profile__right">
                            <h2>
                                {user.name}
                            </h2>
                            <h2>
                                {user.email}
                            </h2>
                        </div>
                    </div>
            }
            {
                error && <p className="errors">{error}</p>
            }
        </>
    )
}