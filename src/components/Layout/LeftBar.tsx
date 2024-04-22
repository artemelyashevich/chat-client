import React from "react"
import {leftBarNavs} from "../../constants.tsx"
import {NavLink, useNavigate} from "react-router-dom"
import {BsDoorClosed} from "react-icons/bs";
import {useAppDispatch} from "../../hooks.ts";
import {logout} from "../../store/slices/authSlice.ts";

const LeftBar: React.FC = () => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const handleLogOut = (): void => {
        dispatch(logout())
        navigate("/auth")
    }

    return (
        <section className="leftBar">
            <ul>
                {
                    leftBarNavs.map(((x, index) => (
                        <li className="leftBar-item" key={index}>
                            <NavLink to={x.path} className={({isActive}) =>
                                isActive
                                    ? "leftBar-item leftBar-item-active"
                                    : "leftBar-item"
                            }>
                                {x.element}
                            </NavLink>
                        </li>
                    )))
                }
            </ul>
            <span className='leftBar-logout'>
            <BsDoorClosed onClick={handleLogOut}/>
            </span>
        </section>
    );
};

export default LeftBar