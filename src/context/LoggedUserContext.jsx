import { createContext, useContext, useEffect, useState } from "react";
import { useFetch } from "../custom-hooks/useFetch";

export const LoggedUserContext = createContext();

export default function LoggedUserContextProvider({ children }) {
    const [loggedUser, setLoggedUser] = useState(null);
    const { data: allUsers } = useFetch("http://localhost:3000/users");
    console.log("allUsers: ", allUsers);

    useEffect(() => {
        const userId = localStorage.getItem("user");
        if (userId) {
            setLoggedUser(allUsers.find((item) => item.id === userId));
        } else {
            setLoggedUser(false);
        }
    }, [allUsers]);

    function login() {
        const userId = localStorage.getItem("user");
        if (userId) {
            setLoggedUser(allUsers.find((item) => item.id === userId));
        } else {
            setLoggedUser(false);
        }
    }

    const logout = () => {
        localStorage.setItem("user", null);
        setLoggedUser(false);
    };
    return <LoggedUserContext.Provider value={{ loggedUser, setLoggedUser, logout, login }}>{children}</LoggedUserContext.Provider>;
}

export const useLoggedUser = () => {
    return useContext(LoggedUserContext);
};
