import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { LoggedUserContext } from "../../context/LoggedUserContext";
import { chooseNextId, fetchUsers, addUser } from "../../utils";


export default function RegDetails() {
    const navigate = useNavigate();
    const location = useLocation();
    const [detailedInputs, setDetailedInputs] = useState({});
    const { loggedUser, setLoggedUser } = useContext(LoggedUserContext);

    function handleDetailChange(e) {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        setDetailedInputs((prev) => ({ ...prev, [name]: value }));
    }

    async function handleDetailSubmit(e) {

        e.preventDefault();
        const users = await fetchUsers();
        const nextId = chooseNextId(users);

        const newUser = { ...location.state.initInputs, ...detailedInputs }

        //add to database
        const addUserResponse = await addUser(newUser, nextId)
        if (!addUserResponse) return;

        //add to logged user
        setLoggedUser(newUser);
        //add to local storage
        localStorage.setItem("user", nextId);
        //navigate to home
        navigate(`/user/${nextId}/home`);
    }

    return (
        <>
            {/* <h1>Hi, {location.state.initInputs.username}!</h1> */}
            <form onSubmit={handleDetailSubmit}>

                <label>Email:
                    <input type="email"
                        name="email"
                        value={detailedInputs.email || ""}
                        onChange={handleDetailChange} />
                </label>
                <br />
                <label>Name:
                    <input type="text"
                        name="name"
                        value={detailedInputs.name || ""}
                        onChange={handleDetailChange} />
                </label>
                <br />
                <label>Phone:
                    <input type="phone"
                        name="phone"
                        value={detailedInputs.phone || ""}
                        onChange={handleDetailChange} />
                </label>
                <br />
                <input type="submit" />
            </form>
        </>
    );

}