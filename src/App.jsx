import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Login />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="home" element={<Home />}>
                    <Route />
                    <Route />
                    <Route />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
