import { useState, useContext } from "react";
import { useLoggedUser } from "../../context/LoggedUserContext";
import { useNavigate } from "react-router-dom";
import { fetchUsers, userFromArray } from "../../utils";

function Login() {
    const [inputs, setInputs] = useState({});
    const { loggedUser, setLoggedUser, logout, login } = useLoggedUser();
    const navigate = useNavigate();

    function handleChange(e) {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        setInputs((prev) => ({ ...prev, [name]: value }));
    }

    async function handleLogInSubmit(e) {
        e.preventDefault();
        const users = await fetchUsers();
        const userInArray = userFromArray(users, inputs);
        if (!userInArray) {
            alert("User does not exist.");
            return;
        }
        localStorage.setItem("user", userInArray.id);
        login();
        navigate(`/user/${userInArray.id}/home`);
    }

    return (
        <>
            <h1>Log In</h1>
            <form onSubmit={handleLogInSubmit}>
                <label>
                    {" "}
                    Username
                    <input type="text" name="username" value={inputs.username || ""} onChange={handleChange} />
                </label>
                <br />
                <label>
                    {" "}
                    Password (website)
                    <input type="password" name="website" value={inputs.website || ""} onChange={handleChange} />
                </label>
                <br />
                <input type="submit" />
            </form>
        </>
    );
}

export default Login;
