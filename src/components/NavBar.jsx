import { NavLink } from "react-router-dom";
import { useLoggedUser } from "../context/LoggedUserContext";

export default function Navbar() {
    const { loggedUser, setLogged, logout } = useLoggedUser();
    const activeStyle = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616",
    };
    return (
        <>
            <NavLink style={({ isActive }) => (isActive ? activeStyle : null)} to={"home"}>
                home
            </NavLink>
            <NavLink style={({ isActive }) => (isActive ? activeStyle : null)} to={"info"}>
                Info
            </NavLink>
            <NavLink style={({ isActive }) => (isActive ? activeStyle : null)} to={"todos"}>
                todos
            </NavLink>
            <NavLink style={({ isActive }) => (isActive ? activeStyle : null)} to={"posts"}>
                Posts
            </NavLink>
            <NavLink style={({ isActive }) => (isActive ? activeStyle : null)} to={"albums"}>
                Albums
            </NavLink>
            <button onClick={logout}>Logout</button>
        </>
    );
}
