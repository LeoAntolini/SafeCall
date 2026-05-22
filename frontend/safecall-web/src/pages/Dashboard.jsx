import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Dashboard() {

    const navigate = useNavigate();

    const {
        usuario,
        logout
    } = useAuth();

    if (!usuario) {

        return (
            <h2>Carregando usuário...</h2>
        );
    }

    function sair() {

        logout();

        navigate("/");
    }

    return (

        <div>

            <h1>
                Dashboard
            </h1>

            <h2>
                Bem-vindo, {usuario.nome}
            </h2>

            <p>
                Email: {usuario.email}
            </p>

            <p>
                Cargo: {usuario.role}
            </p>

            <br />

            <button onClick={sair}>
                Sair
            </button>

        </div>
    );
}

export default Dashboard;