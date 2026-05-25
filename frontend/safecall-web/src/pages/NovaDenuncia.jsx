import Layout from "../components/Layout";

import { useState } from "react";

import api from "../services/api";

function NovaDenuncia() {

    const [numeroTelefone, setNumeroTelefone] = useState("");
    const [tipoGolpe, setTipoGolpe] = useState("");
    const [descricao, setDescricao] = useState("");

    const [erro, setErro] = useState("");

    const formatarTelefone = (valor) => {

        valor = valor.replace(/\D/g, "");

        valor = valor.replace(
            /^(\d{2})(\d)/g,
            "($1) $2"
        );

        valor = valor.replace(
            /(\d)(\d{4})$/,
            "$1-$2"
        );

        return valor;
    };

    const criarDenuncia = async (e) => {

        e.preventDefault();

        setErro("");

        // VALIDAÇÕES

        if (!numeroTelefone.trim()) {

            setErro("O telefone é obrigatório.");
            return;
        }

        if (numeroTelefone.length < 15) {

            setErro("Digite um telefone válido.");
            return;
        }

        if (!tipoGolpe) {

            setErro("Selecione um tipo de golpe.");
            return;
        }

        try {

            const token = localStorage.getItem("token");

            let riscoCalculado = "BAIXO";

            if (
                tipoGolpe === "FALSO_BANCO" ||
                tipoGolpe === "PIX_FALSO"
            ) {

                riscoCalculado = "ALTO";

            } else if (
                tipoGolpe === "FALSA_CENTRAL" ||
                tipoGolpe === "CLONAGEM_WHATSAPP"
            ) {

                riscoCalculado = "MEDIO";
            }

            await api.post(
                "/denuncias",
                {
                    numeroTelefone,
                    tipoGolpe,
                    descricao,
                    nivelRisco: riscoCalculado
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setNumeroTelefone("");
            setTipoGolpe("");
            setDescricao("");

            alert("Denúncia registrada com sucesso!");

        } catch (error) {

            console.log(error);

            setErro("Erro ao registrar denúncia.");
        }
    };

    return (

        <Layout>

            <div className="
                max-w-3xl
                mx-auto
            ">

                <div className="
                    bg-white
                    rounded-2xl
                    shadow
                    p-8
                ">

                    <h1 className="
                        text-4xl
                        font-bold
                        text-gray-800
                    ">
                        Nova Denúncia
                    </h1>

                    <p className="
                        text-gray-500
                        mt-2
                        mb-8
                    ">
                        Registre um número suspeito
                        e ajude a combater golpes telefônicos.
                    </p>

                    {
                        erro && (

                            <div className="
                                bg-red-100
                                text-red-700
                                border
                                border-red-300
                                p-4
                                rounded-xl
                                mb-6
                            ">
                                {erro}
                            </div>

                        )
                    }

                    <form
                        onSubmit={criarDenuncia}
                        className="space-y-5"
                    >

                        <div>

                            <label className="
                                block
                                mb-2
                                font-medium
                                text-gray-700
                            ">
                                Número de telefone
                            </label>

                            <input
                                type="text"
                                placeholder="(11) 99999-9999"
                                value={numeroTelefone}
                                maxLength={15}
                                onChange={(e) =>
                                    setNumeroTelefone(
                                        formatarTelefone(
                                            e.target.value
                                        )
                                    )
                                }
                                className="
                                    w-full
                                    border
                                    border-gray-300
                                    p-4
                                    rounded-xl
                                    outline-none
                                    focus:border-blue-500
                                "
                            />

                        </div>

                        <div>

                            <label className="
                                block
                                mb-2
                                font-medium
                                text-gray-700
                            ">
                                Tipo de golpe
                            </label>

                            <select
                                value={tipoGolpe}
                                onChange={(e) =>
                                    setTipoGolpe(
                                        e.target.value
                                    )
                                }
                                className="
                                    w-full
                                    border
                                    border-gray-300
                                    p-4
                                    rounded-xl
                                    outline-none
                                    focus:border-blue-500
                                "
                            >

                                <option value="">
                                    Selecione
                                </option>

                                <option value="FALSO_BANCO">
                                    Falso Banco
                                </option>

                                <option value="FALSA_CENTRAL">
                                    Falsa Central
                                </option>

                                <option value="PIX_FALSO">
                                    Golpe do PIX
                                </option>

                                <option value="CLONAGEM_WHATSAPP">
                                    Clonagem de WhatsApp
                                </option>

                                <option value="PREMIO_FALSO">
                                    Prêmio Falso
                                </option>

                                <option value="FALSO_SUPORTE">
                                    Falso Suporte Técnico
                                </option>

                                <option value="OUTRO">
                                    Outro
                                </option>

                            </select>

                        </div>

                        <div>

                            <label className="
                                block
                                mb-2
                                font-medium
                                text-gray-700
                            ">
                                Descrição
                            </label>

                            <textarea
                                placeholder="
Descreva como aconteceu o golpe...
                                "
                                value={descricao}
                                onChange={(e) =>
                                    setDescricao(
                                        e.target.value
                                    )
                                }
                                className="
                                    w-full
                                    border
                                    border-gray-300
                                    p-4
                                    rounded-xl
                                    h-36
                                    resize-none
                                    outline-none
                                    focus:border-blue-500
                                "
                            />

                        </div>

                        <button
                            type="submit"
                            className="
                                w-full
                                bg-blue-600
                                hover:bg-blue-700
                                transition
                                text-white
                                font-bold
                                p-4
                                rounded-xl
                            "
                        >
                            Registrar denúncia
                        </button>

                    </form>

                </div>

            </div>

        </Layout>
    );
}

export default NovaDenuncia;