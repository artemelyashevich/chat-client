import React from "react"
import {useAppDispatch, useAppSelector} from "../hooks.ts";
import {fetchMe} from "../store/slices/userSlice.ts";
import {SlSettings} from "react-icons/sl";
import ProfileForm from "../components/ProfileForm.tsx";

// TODO: добавить возможность изменять профиль

export const Profile: React.FC = () => {
    const {user, loading, error} = useAppSelector(store => store.user)
    const {token} = useAppSelector(store => store.auth)
    const [active, setActive] = React.useState<boolean>(false)
    const dispatch = useAppDispatch()
    React.useEffect(() => {
        dispatch(fetchMe(token))
    }, [token])

    return (
        <React.Fragment>
            {
                loading
                    ? <p>Loading...</p>
                    : <React.Fragment>
                        <h1 className='profile_label'>Edit your profile</h1>
                        <div className="profile">
                            <div className="profile__left">
                                <img src={user.image} alt="avatar"/>
                            </div>
                            <div className="profile__right">
                            <span className={`profile__right-settings profile__right-settings${active && '-active'}`}>
                            <SlSettings onClick={() => setActive(!active)}/>
                            </span>
                                <ProfileForm user={user} active={active} setActive={setActive}/>
                            </div>
                        </div>
                    </React.Fragment>
            }
            {
                error && <p className="errors">{error}</p>
            }
        </React.Fragment>
    )
}