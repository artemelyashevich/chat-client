import React from 'react'
import { useAppDispatch } from '../../hooks'
import { useNavigate } from 'react-router-dom'
import {logout} from "../../store/slices/authSlice.ts";

const Header: React.FC = () => {

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleLogOut = () => {
    dispatch(logout())
    navigate("/auth")
  }

  return (
    <header className='header'>
      <div className="header__left">

      </div>
      <div className="header__right">
        <button onClick={handleLogOut}>Log Out</button>
      </div>
    </header>
  )
}

export default Header