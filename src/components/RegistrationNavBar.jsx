import { NavLink } from "react-router-dom";


export default function RegistrationNavBar() {

    const activeStyle = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616",
    };

    return (
        <nav>
            <NavLink style={({ isActive }) => (isActive ? activeStyle : null)} to="login">Log In</NavLink>
            <NavLink style={({ isActive }) => (isActive ? activeStyle : null)} to="register">Register</NavLink>
        </nav>
    );
}