import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/login/Login.jsx";
import Register from "./pages/login/Register.jsx";
import UserLayout from "./components/UserLayout";
import Info from "./pages/Info.jsx";
import Todos from "./pages/todos/Todos.jsx";
import Posts from "./pages/posts/Posts.jsx";
import Albums from "./pages/albums/Albums.jsx";
import ProtectedRoutes from "./components/ProtectedRoutes.jsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Login />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />

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
                    <Route path="todos" element={<Todos />} />
                    <Route path="posts" element={<Posts />} />
                    <Route path="albums" element={<Albums />} />
                </Route>
                <Route path="*" element={<h1>Error</h1>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
