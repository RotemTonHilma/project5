<<<<<<< HEAD
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/login/Login";
import LoggedUserProvider from "./context/LoggedUserContext";
import Home from "./components/Home";

function App() {

  return (

    <>
      <LoggedUserProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Login />} />
            <Route path="login" element={<Login />} />
            {/* <Route path="register" element={<Register />} /> */}
            <Route path="home" element={<Home />}>
              {/* <Route />
            <Route />
            <Route /> */}
            </Route>
          </Routes>
        </BrowserRouter>
      </LoggedUserProvider>
    </>
  )
=======
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
>>>>>>> main
}

export default App;
