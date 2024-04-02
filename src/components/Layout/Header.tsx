import React from 'react'
import {useAppDispatch, useAppSelector} from '../../hooks'
import {NavLink, useNavigate} from 'react-router-dom'
import {logout} from "../../store/slices/authSlice.ts";

const Header: React.FC = () => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const {user} = useAppSelector(store => store.user)

    const handleLogOut = () => {
        dispatch(logout())
        navigate("/auth")
    }

    return (
        <header className='header'>
            <div className="header__left">
                <div className="header__left-logo">
                    <NavLink to={"/"}>
                        <h1>Logo</h1>
                    </NavLink>
                </div>
            </div>
            <div className="header__right">
                <div className="header__right-profile">
                    <NavLink to={"/profile"}>
                        <h1>{user.name}</h1>
                    </NavLink>
                </div>
                <button onClick={handleLogOut}>Log Out</button>
            </div>
        </header>
    )
}

export default Header