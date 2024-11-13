import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import LoggedUserProvider from "./context/LoggedUserContext";
import Home from "./pages/Home.jsx";
import Register from "./pages/login/Register.jsx";
import UserLayout from "./components/UserLayout";
import Info from "./pages/Info.jsx";
import TodosDisplay from "./pages/todos/TodosDisplay.jsx";
import Posts from "./pages/posts/Posts.jsx";
import Albums from "./pages/albums/Albums.jsx";
import ProtectedRoutes from "./components/ProtectedRoutes.jsx";
import RegDetails from "./pages/login/RegDetails.jsx";
import Photos from "./pages/albums/Photos.jsx";
function App() {
    return (
        <>
            <LoggedUserProvider>
                <BrowserRouter>
                    <Routes>
                        <Route index element={<Login />} />
                        <Route path="login" element={<Login />} />
                        <Route path="register" element={<Register />} />
                        <Route path="register/details" element={<RegDetails />} />

                        <Route
                            path="user/:userId"
                            element={
                                <ProtectedRoutes>
                                    <UserLayout />
                                </ProtectedRoutes>
                            }
                        >
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
            </LoggedUserProvider>
        </>
    );
}

export default App;
