import { useLoggedUser } from "../context/LoggedUserContext";

function Home() {
    const { loggedUser, setLoggedUser } = useLoggedUser();

    return <h1>welcome, {loggedUser.username}</h1>;
}

export default Home;
