import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Register() {

    const navigate = useNavigate();

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const cadastrar = async (e) => {

        e.preventDefault();

        try {

            await api.post(
                "/usuarios",
                {
                    nome,
                    email,
                    senha
                }
            );

            alert("Conta criada com sucesso!");

            navigate("/login");

        } catch (error) {

            console.log(error);

            alert("Erro ao criar conta");
        }
    };

    return (

        <div className="
            min-h-screen
            flex
            items-center
            justify-center
            bg-gradient-to-br
            from-blue-950
            via-slate-900
            to-black
            p-6
        ">

            <div className="
                w-full
                max-w-md
                bg-white/10
                backdrop-blur-lg
                border
                border-white/10
                rounded-3xl
                shadow-2xl
                p-10
            ">

                <div className="text-center mb-10">

                    <h1 className="
                        text-5xl
                        font-bold
                        text-white
                    ">
                        SafeCall
                    </h1>

                    <p className="
                        text-gray-300
                        mt-3
                    ">
                        Crie sua conta na plataforma
                    </p>

                </div>

                <form
                    onSubmit={cadastrar}
                    className="space-y-5"
                >

                    <input
                        type="text"
                        placeholder="Nome"
                        value={nome}
                        onChange={(e) =>
                            setNome(e.target.value)
                        }
                        className="
                            w-full
                            p-4
                            rounded-xl
                            bg-white/10
                            border
                            border-white/10
                            text-white
                            placeholder-gray-400
                            outline-none
                            focus:border-blue-500
                        "
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        className="
                            w-full
                            p-4
                            rounded-xl
                            bg-white/10
                            border
                            border-white/10
                            text-white
                            placeholder-gray-400
                            outline-none
                            focus:border-blue-500
                        "
                    />

                    <input
                        type="password"
                        placeholder="Senha"
                        value={senha}
                        onChange={(e) =>
                            setSenha(e.target.value)
                        }
                        className="
                            w-full
                            p-4
                            rounded-xl
                            bg-white/10
                            border
                            border-white/10
                            text-white
                            placeholder-gray-400
                            outline-none
                            focus:border-blue-500
                        "
                    />

                    <button
                        type="submit"
                        className="
                            w-full
                            bg-blue-600
                            hover:bg-blue-700
                            transition
                            text-white
                            p-4
                            rounded-xl
                            font-bold
                        "
                    >
                        Criar Conta
                    </button>

                </form>

                <p className="
                    text-center
                    text-gray-400
                    mt-6
                ">

                    Já possui conta?

                    {" "}

                    <Link
                        to="/login"
                        className="
                            text-blue-400
                            hover:text-blue-300
                        "
                    >
                        Entrar
                    </Link>

                </p>

            </div>

        </div>
    );
}

export default Register;