import LoggedUserProvider from "./context/LoggedUserContext";

import AppRouter from "./AppRouter.jsx";
function App() {
    return (
        <>
            <LoggedUserProvider>
                <AppRouter />
            </LoggedUserProvider>
        </>
    );
}

export default App;
