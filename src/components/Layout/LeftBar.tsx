import React from "react"
import {leftBarNavs} from "../../constants.tsx"
import {NavLink} from "react-router-dom"

const LeftBar: React.FC = () => {
    return (
        <section className="leftBar">
            <ul>
                {
                    leftBarNavs.map(((x, index) => (
                        <li className="leftBar-item" key={index}>
                            <NavLink to={x.path} className={({ isActive }) =>
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
        </section>
    );
};

export default LeftBar