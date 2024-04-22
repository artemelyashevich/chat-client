import React from 'react'
import {NavLink} from 'react-router-dom'

const Header: React.FC = () => {

    return (
        <header className='header'>
            <div className="header__left">
                <div className="header__left-logo">
                    <NavLink to={"/"}>
                        <h1>Logo</h1>
                    </NavLink>
                </div>
            </div>
        </header>
    )
}

export default Header