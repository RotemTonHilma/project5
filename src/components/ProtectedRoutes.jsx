import { Navigate } from "react-router-dom";

export default function ProtectedRoutes({ children }) {
    // place holder
    const token = true;

    if (!token) return <Navigate to="/login" replace />;
    return children;
}
