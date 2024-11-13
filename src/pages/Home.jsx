import { useLoggedUser } from "../context/LoggedUserContext";
import { useContext } from "react";

function Home() {
    const { loggedUser, setLoggedUser } = useLoggedUser();
    return <h1>{`welcome, ${loggedUser.username}`}</h1>;
}

export default Home;
