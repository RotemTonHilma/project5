import React, { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/login/Register";
import RegDetails from "./pages/login/RegDetails";
import ProtectedRoutes from "./components/ProtectedRoutes";
import UserLayout from "./components/UserLayout";
import Home from "./pages/Home";
import Info from "./pages/Info";
import TodosDisplay from "./pages/todos/TodosDisplay";
import Posts from "./pages/posts/Posts";
import Albums from "./pages/albums/Albums";
import Photos from "./pages/albums/Photos";
import { useLoggedUser } from "./context/LoggedUserContext";

export default function AppRouter() {
    const { loggedUser } = useLoggedUser();
    console.log("loggedUser: ", loggedUser);
    let loading;
    if (loggedUser === null || loggedUser === undefined) loading = true;
    console.log("loading: ", loading);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<RegistrationLayout />}>
                    <Route index element={<Navigate to="login" replace />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="register/details" element={<RegDetails />} />
                </Route>

                <Route path="user/:userId" element={<ProtectedRoutes>{!loading ? <UserLayout /> : <h1>Loading...</h1>}</ProtectedRoutes>}>
                    <Route index element={<Home />} />
                    <Route path="home" element={<Home />} />
                    <Route path="info" element={<Info />} />
                    <Route path="todos" element={<TodosDisplay />} />
                    <Route path="posts" element={<Posts />} />

                    <Route path="albums">
                        <Route index element={<Albums />} />
                        <Route path=":albumId/photos" element={<Photos />} />
                    </Route>
                </Route>
                <Route path="*" element={<h1>Error</h1>} />
            </Routes>
        </BrowserRouter>
    );
}
