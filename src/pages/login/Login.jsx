import { useState, useContext } from "react";
import { useLoggedUser } from "../../context/LoggedUserContext";
import { useNavigate } from "react-router-dom";

function Login() {
    const [inputs, setInputs] = useState({});
    const { loggedUser, setLoggedUser } = useLoggedUser();
    const navigate = useNavigate();

    async function fetchUsers() {
        try {
            const res = await fetch("http://localhost:3000/users");
            if (!res.ok) throw Error("unable to obtain users");
            const data = await res.json();
            return data;
        } catch (err) {
            console.log(err);
        }
    }

    function userFromArray(userArray, userInputs) {
        return userArray.find((user) => user.username === userInputs.username && user.website === userInputs.website);
    }

    function handleChange(e) {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        setInputs((prev) => ({ ...inputs, [name]: value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const users = await fetchUsers();
        const userInArray = userFromArray(users, inputs);
        if (!userInArray) {
            alert("User does not exist.");
            return;
        }
        localStorage.setItem("user", userInArray.id);
        setLoggedUser(userInArray);
        navigate(`/user/${userInArray.id}`);
    }

    return (
        <>
            <h1>Log In</h1>
            <form onSubmit={handleSubmit}>
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
