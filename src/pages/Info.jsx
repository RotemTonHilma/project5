import { useLoggedUser } from "../context/LoggedUserContext";


export default function Info() {
    const { loggedUser, setLoggedUser } = useLoggedUser();

    return (
        <>
            <h1>Info</h1>
            <section>
                <div> Name: {loggedUser.name ? loggedUser.name : 'You haven\'t set a name'}</div>
                <div> Username: {loggedUser.username ? loggedUser.username : 'Error: no username available. Log in again'}</div>
                <div> Email: {loggedUser.email ? loggedUser.email : 'You haven\'t set an email'}</div>
                <div> Phone: {loggedUser.phone ? loggedUser.phone : 'You haven\'t set a phone number'}</div>
            </section>
        </>


    );
}
