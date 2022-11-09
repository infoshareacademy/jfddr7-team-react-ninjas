import { NavLink } from "react-router-dom";

export const Nav = () => {
    let activeStyle = {
        textDecoration: "underline",
      };
    return (
        <nav>
            <h1>Nav Panel</h1>
            <ul>
                <li>
                <NavLink
                   to="/"
                   style={({ isActive }) =>
                   isActive ? activeStyle : undefined}>

                   Home
                </NavLink>
                </li>            
            
                <li>
                <NavLink
                   to="register"
                   style={({ isActive }) =>
                   isActive ? activeStyle : undefined}>

                   Register
                </NavLink>
                </li>

                <li>
                <NavLink
                   to="login"
                   style={({ isActive }) =>
                   isActive ? activeStyle : undefined}>

                   Login
                </NavLink>
                </li>
            </ul>
        </nav>
    );
};
