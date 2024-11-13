import { LoggedUserContext } from "../../context/LoggedUserContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUsers, userFromArray } from "../../utils";

export default function Register() {
    const [inputs, setInputs] = useState({});
    const { loggedUser, setLoggedUser } = useContext(LoggedUserContext);
    const navigate = useNavigate();

    async function handleRegisterSubmit(e) {
        e.preventDefault();
        const users = await fetchUsers();
        const userInArray = userFromArray(users, inputs);
        if (userInArray) {
            alert("User already taken. Try something else.");
            return;
        }
        navigate("/register/details", { state: { "initInputs": inputs } });
    }
    function handleChange(e) {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        setInputs((prev) => ({ ...prev, [name]: value }));
    }

    return (
        <>
            <h1>Register</h1>
            <form onSubmit={handleRegisterSubmit}>
                <label>
                    {" "}
                    Username
                    <input required type="text" name="username" value={inputs.username || ""} onChange={handleChange} />
                </label>
                <br />
                <label>
                    {" "}
                    Password (website)
                    <input required type="password" name="website" value={inputs.website || ""} onChange={handleChange} />
                </label>
                <br />
                <input type="submit" />
            </form>
        </>
    );
}
