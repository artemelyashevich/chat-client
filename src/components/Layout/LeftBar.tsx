import React from "react"
import {leftBarNavs} from "../../constants.ts"
import {NavLink} from "react-router-dom"

const LeftBar: React.FC = () => {
    return (
        <section className="leftBar">
            <ul>
                {
                    leftBarNavs.map(x => (
                        <li key={x.title}>
                            <NavLink to={x.path} className={({ isActive }) =>
                                isActive
                                    ? "leftBar-item-active"
                                    : "leftBar-item"
                            }>
                                <p>{x.title}</p>
                            </NavLink>
                        </li>
                    ))
                }
            </ul>
        </section>
    );
};

export default LeftBar