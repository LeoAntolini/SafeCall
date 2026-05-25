import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";

import { useEffect, useState } from "react";
import api from "../services/api";

function Home() {

    const { usuario } = useAuth();

    const [denuncias, setDenuncias] = useState([]);
    const [busca, setBusca] = useState("");

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

    const denunciasFiltradas = denuncias.filter(
        (denuncia) =>

            denuncia.numeroTelefone
                .toLowerCase()
                .includes(
                    busca.toLowerCase()
                )

            ||

            denuncia.tipoGolpe
                .toLowerCase()
                .includes(
                    busca.toLowerCase()
                )
    );

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

    return (

        <Layout>

            <h1 className="
                text-3xl 
                md:text-4xl
                font-bold
                text-gray-800
            ">
                Home
            </h1>

            <p className="mt-3 text-gray-600">

                Bem-vindo de volta,
                {" "}
                {usuario?.nome}

            </p>

            <div className="
                bg-white
                rounded-2xl
                shadow
                p-6
                mt-8
            ">

                <h2 className="
                    text-2xl
                    font-bold
                    text-gray-800
                    mb-3
                ">
                    Sobre o SafeCall
                </h2>

                <p className="
                    text-gray-600
                    leading-relaxed
                ">
                    O SafeCall é uma plataforma
                    desenvolvida para ajudar usuários
                    a identificar, registrar e monitorar
                    golpes telefônicos e fraudes digitais.

                    O sistema permite denunciar números
                    suspeitos, analisar padrões de golpes
                    e compartilhar informações que ajudam
                    no combate a fraudes.
                </p>

            </div>

            <div className="
                bg-white
                rounded-2xl
                shadow
                p-6
                mt-10
            ">

                <div className="
                    flex
                    justify-between
                    items-center
                    mb-6
                ">

                    <h2 className="
                        text-2xl
                        font-bold
                    ">
                        Denúncias Recentes
                    </h2>

                </div>

                <div className="mb-6">

                    <input
                        type="text"
                        placeholder="
Buscar telefone ou tipo de golpe...
                        "
                        value={busca}
                        onChange={(e) =>
                            setBusca(e.target.value)
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

                <div className="overflow-x-auto">

                    <table className="w-full">

                        <thead>

                            <tr className="
                                border-b
                                text-left
                            ">

                                <th className="pb-4">
                                    Telefone
                                </th>

                                <th className="pb-4">
                                    Tipo de Golpe
                                </th>

                                <th className="pb-4">
                                    Risco
                                </th>

                                <th className="pb-4">
                                    Status
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
                                        {denuncia.numeroTelefone}
                                    </td>

                                    <td>
                                        {
                                            denuncia.tipoGolpe
                                                .replaceAll("_", " ")
                                        }
                                    </td>

                                    <td>

                                        <span className={`
                                            px-3
                                            py-1
                                            rounded-full
                                            text-sm

                                            ${getCorRisco(
                                                denuncia.nivelRisco
                                            )}
                                        `}>

                                            {denuncia.nivelRisco}

                                        </span>

                                    </td>

                                    <td>

                                        <span className="
                                            bg-blue-100
                                            text-blue-700
                                            px-3
                                            py-1
                                            rounded-full
                                            text-sm
                                        ">
                                            {denuncia.status}
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

export default Home;