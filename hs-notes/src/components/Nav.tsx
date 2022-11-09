import { NavLink } from "react-router-dom";

export const Nav = () => {
    let activeStyle = {
        textDecoration: "underline",
      };
    return (
        <nav>
            <ul>
                <li>
                <NavLink
                   to="messages"
                   style={({ isActive }) =>
                   isActive ? activeStyle : undefined}>
                    
                   Home
                </NavLink>
                </li>
            </ul>
        </nav>
    );
};
