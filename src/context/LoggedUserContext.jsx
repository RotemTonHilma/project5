import { createContext, useContext, useState } from "react";

export const LoggedUserContext = createContext();

export default function LoggedUserContextProvider({ children }) {
    const [loggedUser, setLoggedUser] = useState(null);
    return <LoggedUserContext.Provider value={{ loggedUser, setLoggedUser }}>{children}</LoggedUserContext.Provider>;
}

export const useLoggedUser = () => {
    return useContext(LoggedUserContext);
};
