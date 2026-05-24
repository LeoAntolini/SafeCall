import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";

import { useEffect, useState } from "react";
import api from "../services/api";


function Dashboard() {

    const { usuario } = useAuth();
    const [denuncias, setDenuncias] = useState([]);

    const buscarDenuncias = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await api.get(
                "/denuncias",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setDenuncias(response.data);

        } catch (error) {

            console.log(error);

            alert("Erro ao buscar denúncias");
        }
    };

    useEffect(() => {
        buscarDenuncias();
    }, []);

    const [numeroTelefone, setNumeroTelefone] = useState("");
    const [tipoGolpe, setTipoGolpe] = useState("");
    const [descricao, setDescricao] = useState("");

    const criarDenuncia = async (e) => {

        e.preventDefault();

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

            buscarDenuncias();

            alert("Denúncia registrada!");

        } catch (error) {

            console.log(error);

            alert("Erro ao registrar denúncia");
        }
    };

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

    const getCorRisco = (risco) => {

        switch (risco) {

            case "ALTO":
                return `
                bg-red-100
                text-red-700
            `;

            case "MEDIO":
                return `
                bg-yellow-100
                text-yellow-700
            `;

            case "BAIXO":
                return `
                bg-green-100
                text-green-700
            `;

            default:
                return `
                bg-gray-100
                text-gray-700
            `;
        }
    };

    const [busca, setBusca] = useState("");

    const denunciasFiltradas = denuncias.filter((denuncia) =>
        denuncia.numeroTelefone
            .toLowerCase()
            .includes(busca.toLowerCase())
    );

    const rankingGolpes = {};

    denuncias.forEach((denuncia) => {

        if (rankingGolpes[denuncia.tipoGolpe]) {

            rankingGolpes[denuncia.tipoGolpe]++;

        } else {

            rankingGolpes[denuncia.tipoGolpe] = 1;
        }
    });

    const rankingNumeros = {};

    denuncias.forEach((denuncia) => {

        if (rankingNumeros[denuncia.numeroTelefone]) {

            rankingNumeros[
                denuncia.numeroTelefone
            ]++;

        } else {

            rankingNumeros[
                denuncia.numeroTelefone
            ] = 1;
        }
    });

    return (

        <Layout>

            <h1 className="
                text-4xl
                font-bold
                text-gray-800
            ">
                Dashboard
            </h1>

            <p className="mt-3 text-gray-600">

                Bem-vindo de volta,
                {" "}
                {usuario?.nome}

            </p>

            <div className="grid grid-cols-3 gap-6 mt-10">

                <div className="
                    bg-white
                    p-6
                    rounded-2xl
                    shadow
                ">
                    <h2 className="text-gray-500">
                        Total de Denúncias
                    </h2>

                    <p className="text-4xl font-bold mt-3">
                        {denuncias.length}
                    </p>
                    <p className="text-sm text-gray-400 mt-2">
                        denúncias registradas no sistema
                    </p>
                </div>

                <div className="
                    bg-white
                    p-6
                    rounded-2xl
                    shadow
                ">
                    <h2 className="text-gray-500">
                        Risco Elevado
                    </h2>

                    <p className="text-4xl font-bold mt-3 text-red-500">
                        {
                            denuncias.filter(
                                (d) => d.nivelRisco === "ALTO"
                            ).length
                        }
                    </p>
                    <p className="text-sm text-gray-400 mt-2">
                        denúncias classificadas como críticas
                    </p>
                </div>

                <div className="
                    bg-white
                    p-6
                    rounded-2xl
                    shadow
                ">
                    <h2 className="text-gray-500">
                        Números Denunciados
                    </h2>

                    <p className="text-4xl font-bold mt-3">
                        {
                            new Set(
                                denunciasFiltradas.map(
                                    (d) => d.numeroTelefone
                                )
                            ).size
                        }
                    </p>
                    <p className="text-sm text-gray-400 mt-2">
                        telefones únicos denunciados
                    </p>
                </div>

            </div>

            <div className="
                bg-white
                p-6
                rounded-2xl
                shadow
                mt-10
            ">

                <h2 className="
                    text-2xl
                    font-bold
                    mb-6
                ">
                    Golpes Mais Reportados
                </h2>

                <div className="space-y-4">

                    {Object.entries(rankingGolpes)
                        .sort((a, b) => b[1] - a[1])
                        .map(([tipo, quantidade]) => (

                            <div
                                key={tipo}
                                className="
                                    flex
                                    justify-between
                                    items-center
                                    border-b
                                    pb-3
                                "
                            >

                                <span className="font-medium">
                                    {tipo.replaceAll("_", " ")}
                                </span>

                                <span className="
                                    bg-blue-100
                                    text-blue-700
                                    px-3
                                    py-1
                                    rounded-full
                                    text-sm
                                ">
                                    {quantidade}
                                </span>

                            </div>

                        ))}

                </div>

            </div>

            <div className="
    bg-white
    p-6
    rounded-2xl
    shadow
    mt-10
">

                <h2 className="
        text-2xl
        font-bold
        mb-6
    ">
                    Números Mais Denunciados
                </h2>

                <div className="space-y-4">

                    {Object.entries(rankingNumeros)
                        .sort((a, b) => b[1] - a[1])
                        .map(([numero, quantidade]) => (

                            <div
                                key={numero}
                                className="
                        flex
                        justify-between
                        items-center
                        border-b
                        pb-3
                    "
                            >

                                <span className="font-medium">
                                    {numero}
                                </span>

                                <span className={`
                        px-3
                        py-1
                        rounded-full
                        text-sm

                        ${quantidade >= 5
                                        ? `
                                bg-red-100
                                text-red-700
                              `
                                        : `
                                bg-yellow-100
                                text-yellow-700
                              `
                                    }
                    `}>

                                    {quantidade} denúncias

                                </span>

                            </div>

                        ))}

                </div>

            </div>

            <div className="
                bg-white
                p-6
                rounded-2xl
                shadow
                mt-10
            ">

                <h2 className="
                text-2xl
                font-bold
                mb-6
            ">
                    Nova Denúncia
                </h2>

                <form
                    onSubmit={criarDenuncia}
                    className="space-y-4"
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
                        className="
                            w-full
                            border
                            p-3
                            rounded-lg
                        "
                    />

                    <select
                        value={tipoGolpe}
                        onChange={(e) =>
                            setTipoGolpe(e.target.value)
                        }
                        className="
                            w-full
                            border
                            p-3
                            rounded-lg
                        "
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
                        className="
                            w-full
                            border
                            p-3
                            rounded-lg
                        "
                    />



                    <button
                        type="submit"
                        className="
                            bg-blue-600
                            text-white
                            px-6
                            py-3
                            rounded-lg
                        "
                    >
                        Registrar denúncia
                    </button>

                </form>

            </div>


            <div className="mt-10">

                <div className="
                    bg-white
                    rounded-2xl
                    shadow
                    p-6
                ">

                    <h2 className="
                        text-2xl
                        font-bold
                        mb-6
                    ">
                        Denuncias Recentes
                    </h2>

                    <div className="mb-6">

                        <input
                            type="text"
                            placeholder="Buscar telefone..."
                            value={busca}
                            maxLength={15}
                            onChange={(e) =>
                                setBusca(
                                    formatarTelefone(e.target.value)
                                )
                            }
                            className="
                                w-full
                                border
                                p-3
                                rounded-lg
                            "
                        />

                    </div>
                    <table className="w-full">

                        <thead>

                            <tr className="
                                text-left
                                border-b
                            ">

                                <th className="pb-3">
                                    ID
                                </th>

                                <th className="pb-3">
                                    Telefone
                                </th>

                                <th className="pb-3">
                                    Tipo de Golpe
                                </th>

                                <th className="pb-3">
                                    Risco
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {denunciasFiltradas.map((denuncia) => (

                                <tr
                                    key={denuncia.id}
                                    className="border-b"
                                >

                                    <td className="py-4">
                                        #{denuncia.id}
                                    </td>

                                    <td>
                                        {denuncia.numeroTelefone}
                                    </td>

                                    <td>
                                        {denuncia.tipoGolpe}
                                    </td>

                                    <td>

                                        <span className={`
                                            ${getCorRisco(denuncia.nivelRisco)}
                                            px-3
                                            py-1
                                            rounded-full
                                            text-sm
                                        `}>
                                            {denuncia.nivelRisco}
                                        </span>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </Layout>
    );
}

export default Dashboard;