import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import { Toaster } from "react-hot-toast";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Perfil from "./pages/Perfil";
import Analytics from "./pages/Analytics";
import NovaDenuncia from "./pages/NovaDenuncia";

import PrivateRoute from "./routes/PrivateRoute";

function App() {

    return (

        <BrowserRouter>

            <Toaster
                position="top-right"
                reverseOrder={false}
            />

            <Routes>

                <Route
                    path="/"
                    element={<Login />}
                />

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

            </Routes>

        </BrowserRouter>
    );
}

export default App;