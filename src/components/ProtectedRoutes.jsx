import { Navigate } from "react-router-dom";
import { useLoggedUser } from "../context/LoggedUserContext";

export default function ProtectedRoutes({ children }) {
    // place holder

    const { loggedUser: token } = useLoggedUser();
    console.log("token: ", token);
    if (token !== null && token !== undefined) {
        if (!token) return <Navigate to="/login" replace />;
    }
    return children;
}
