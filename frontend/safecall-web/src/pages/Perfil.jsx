import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";

import { useEffect, useState } from "react";
import api from "../services/api";

import toast from "react-hot-toast";

function Perfil() {

    const { usuario } = useAuth();

    const [denuncias, setDenuncias] = useState([]);

    const buscarDenunciasUsuario = async () => {

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

            const minhasDenuncias = response.data.filter(
                (denuncia) =>
                    denuncia.usuario.id === usuario.id
            );

            setDenuncias(minhasDenuncias);

        } catch (error) {

            console.log(error);

            toast.error("Erro ao buscar denúncias");
        }
    };

    useEffect(() => {

        if (usuario) {
            buscarDenunciasUsuario();
        }

    }, [usuario]);

    const alterarStatus = async (
        id,
        novoStatus
    ) => {

        try {

            const token = localStorage.getItem("token");

            await api.put(
                `/denuncias/${id}/status`,
                {
                    status: novoStatus
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            buscarDenunciasUsuario();

        } catch (error) {

            console.log(error);

            toast.error("Erro ao atualizar status");
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
                Perfil
            </h1>

            <p className="
                mt-3
                text-gray-600
            ">
                Informações da sua conta
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
                    mb-6
                ">
                    Dados do Usuário
                </h2>

                <div className="space-y-4">

                    <div>

                        <p className="
                            text-sm
                            text-gray-500
                        ">
                            Nome
                        </p>

                        <p className="font-medium">
                            {usuario?.nome}
                        </p>

                    </div>

                    <div>

                        <p className="
                            text-sm
                            text-gray-500
                        ">
                            Email
                        </p>

                        <p className="font-medium">
                            {usuario?.email}
                        </p>

                    </div>

                    <div>

                        <p className="
                            text-sm
                            text-gray-500
                        ">
                            Total de denúncias
                        </p>

                        <p className="font-medium">
                            {denuncias.length}
                        </p>

                    </div>

                </div>

            </div>

            <div className="
                bg-white
                rounded-2xl
                shadow
                p-6
                mt-10
            ">

                <h2 className="
                    text-2xl
                    font-bold
                    mb-6
                ">
                    Minhas Denúncias
                </h2>

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
                                    Tipo
                                </th>

                                <th className="pb-4">
                                    Status
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {
                                denuncias.length > 0 ? (

                                    denuncias.map((denuncia) => (

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

                                                <select
                                                    value={denuncia.status}
                                                    onChange={(e) =>
                                                        alterarStatus(
                                                            denuncia.id,
                                                            e.target.value
                                                        )
                                                    }
                                                    className="
                                                        border
                                                        rounded-lg
                                                        p-2
                                                    "
                                                >

                                                    <option value="PENDENTE">
                                                        PENDENTE
                                                    </option>

                                                    <option value="EM_ANALISE">
                                                        EM ANÁLISE
                                                    </option>

                                                    <option value="RESOLVIDO">
                                                        RESOLVIDO
                                                    </option>

                                                </select>

                                            </td>

                                        </tr>

                                    ))

                                ) : (

                                    <tr>

                                        <td
                                            colSpan="4"
                                            className="
                                                text-center
                                                py-10
                                                text-gray-400
                                            "
                                        >

                                            Nenhuma denúncia encontrada

                                        </td>

                                    </tr>

                                )
                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </Layout>
    );
}

export default Perfil;