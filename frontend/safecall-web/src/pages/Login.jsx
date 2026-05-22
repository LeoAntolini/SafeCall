import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import api from "../services/api";

function Login() {

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    async function fazerLogin(e) {
        e.preventDefault();

        try {

            const response = await api.post("/auth/login", {
                email,
                senha
            });

            console.log(response.data);

            login(response.data.token);

            window.location.href = "/dashboard";

        } catch (error) {

            console.log(error);

            alert("Erro no login");
        }
    }

    return (
        <div>

            <h1>Login SafeCall</h1>

            <form onSubmit={fazerLogin}>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                />

                <br />
                <br />

                <input
                    type="password"
                    placeholder="Senha"
                    value={senha}
                    onChange={(e) =>
                        setSenha(e.target.value)
                    }
                />

                <br />
                <br />

                <button type="submit">
                    Entrar
                </button>


            </form>

            <br />

            <Link to="/register">
                Criar conta
            </Link>
        </div>
    );
}

export default Login;