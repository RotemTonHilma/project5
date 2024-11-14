import { Outlet } from "react-router-dom";
import RegistrationNavBar from "./RegistrationNavBar";

export default function RegistrationLayout() {
    return (
        <>
            < RegistrationNavBar />
            <br />
            <Outlet />
        </>
    );
}