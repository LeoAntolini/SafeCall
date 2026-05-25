import { useState } from "react";
import toast from "react-hot-toast";

import Layout from "../components/Layout";
import api from "../services/api";

function NovaDenuncia() {

    const [numeroTelefone, setNumeroTelefone] = useState("");
    const [tipoGolpe, setTipoGolpe] = useState("");
    const [descricao, setDescricao] = useState("");

    const [loading, setLoading] = useState(false);

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

        if (!numeroTelefone || !tipoGolpe) {

            toast.error(
                "Preencha telefone e tipo de golpe"
            );

            return;
        }

        try {

            setLoading(true);

            const token = localStorage.getItem("token");

            let riscoCalculado = "BAIXO";

            if (
                tipoGolpe === "FALSO_BANCO" ||
                tipoGolpe === "PIX_FALSO"
            ) {
                riscoCalculado = "ALTO";
            }

            else if (
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

            toast.success("Denúncia registrada!");

        } catch (error) {

            console.log(error);

            toast.error(
                "Erro ao registrar denúncia"
            );

        } finally {

            setLoading(false);
        }
    };

    return (

        <Layout>

            <div className="bg-white p-6 rounded-2xl shadow">

                <h1 className="text-3xl md:text-4xl font-bold mb-8">
                    Nova Denúncia
                </h1>

                <form
                    onSubmit={criarDenuncia}
                    className="space-y-5"
                >

                    <input
                        type="text"
                        placeholder="(11) 99999-9999"
                        value={numeroTelefone}
                        onChange={(e) =>
                            setNumeroTelefone(
                                formatarTelefone(e.target.value)
                            )
                        }
                        maxLength={15}
                        className="w-full border p-3 rounded-lg"
                    />

                    <select
                        value={tipoGolpe}
                        onChange={(e) =>
                            setTipoGolpe(e.target.value)
                        }
                        className="w-full border p-3 rounded-lg"
                    >

                        <option value="">
                            Selecione o tipo de golpe
                        </option>

                        <option value="FALSO_BANCO">
                            Falso Banco
                        </option>

                        <option value="FALSA_CENTRAL">
                            Falsa Central de Atendimento
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

                    <textarea
                        placeholder="Descrição"
                        value={descricao}
                        onChange={(e) =>
                            setDescricao(e.target.value)
                        }
                        className="w-full border p-3 rounded-lg"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="
                            w-full
                            md:w-auto
                            bg-blue-600
                            text-white
                            px-6
                            py-3
                            rounded-lg
                            hover:bg-blue-700
                            transition
                            disabled:opacity-50
                            disabled:cursor-not-allowed
                        "
                    >

                        {
                            loading
                                ? "Registrando..."
                                : "Registrar denúncia"
                        }

                    </button>

                </form>

            </div>

        </Layout>
    );
}

export default NovaDenuncia