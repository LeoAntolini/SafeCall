import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import api from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [token, setToken] = useState(
        localStorage.getItem("token")
    );

    const [usuario, setUsuario] = useState(null);

    async function buscarUsuario() {

        const tokenSalvo = localStorage.getItem("token");

        if (!tokenSalvo) {
            return;
        }

        try {

            const response = await api.get(
                "/usuarios/me",
                {
                    headers: {
                        Authorization: `Bearer ${tokenSalvo}`
                    }
                }
            );

            setUsuario(response.data);

        } catch (error) {

            console.log(error);

            logout();
        }
    }

    useEffect(() => {
        buscarUsuario();
    }, []);

    function login(novoToken) {

        localStorage.setItem("token", novoToken);

        setToken(novoToken);

        buscarUsuario();
    }

    function logout() {

        localStorage.removeItem("token");

        setToken(null);

        setUsuario(null);
    }

    return (

        <AuthContext.Provider
            value={{
                token,
                usuario,
                login,
                logout,
                autenticado: !!token
            }}
        >

            {children}

        </AuthContext.Provider>

    );
}

export function useAuth() {
    return useContext(AuthContext);
}