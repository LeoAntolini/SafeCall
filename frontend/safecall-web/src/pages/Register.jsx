import { useState } from "react";
import api from "../services/api";
import { Link, useNavigate } from "react-router-dom";

function Register() {

    const navigate = useNavigate();

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    async function handleRegister(e) {

        e.preventDefault();

        try {

            await api.post("/usuarios", {
                nome,
                email,
                senha
            });

            alert("Usuário criado com sucesso!");

            navigate("/");

        } catch (error) {

            console.log(error);

            alert("Erro ao cadastrar");
        }
    }

    return (
        <div>

            <h1>Cadastro</h1>

            <form onSubmit={handleRegister}>

                <input
                    type="text"
                    placeholder="Nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />

                <br />
                <br />

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <br />
                <br />

                <input
                    type="password"
                    placeholder="Senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                />

                <br />
                <br />

                <button type="submit">
                    Criar conta
                </button>

            </form>

            <br />

            <Link to="/">
                Já tenho conta
            </Link>

        </div>
    );
}

export default Register;