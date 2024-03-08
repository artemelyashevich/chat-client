import React from 'react'
import { useAppDispatch } from '../../hooks'
import { logout } from '../../store/slices/userSlice'
import { useNavigate } from 'react-router-dom'

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