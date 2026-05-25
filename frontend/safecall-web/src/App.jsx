import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import PrivateRoute from "./routes/PrivateRoute";
import Analytics from "./pages/Analytics";
import NovaDenuncia from "./pages/NovaDenuncia";
import Perfil from "./pages/Perfil";

function App() {

    return (
        <BrowserRouter>

            <Routes>

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/home"
                    element={
                        <PrivateRoute>
                            <Home />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/nova-denuncia"
                    element={
                        <PrivateRoute>
                            <NovaDenuncia />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/analytics"
                    element={
                        <PrivateRoute>
                            <Analytics />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/perfil"
                    element={
                        <PrivateRoute>
                            <Perfil />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="*"
                    element={<Navigate to="/login" />}
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;