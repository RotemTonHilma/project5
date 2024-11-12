import { createContext, useState } from "react";

export const LoggedUserContext = createContext();

export default function LoggedUserContextProvider({ children }) {
    const [loggedUser, setLoggedUser] = useState(null);
    return (
        <LoggedUserContext.Provider value={{ loggedUser, setLoggedUser }}>
            {children}
        </LoggedUserContext.Provider>
    );

}