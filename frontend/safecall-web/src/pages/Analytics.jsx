import Layout from "../components/Layout";

import { useEffect, useState } from "react";

import api from "../services/api";

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer
} from "recharts";


function Analytics() {

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

            alert("Erro ao buscar analytics");
        }
    };

    useEffect(() => {
        buscarDenuncias();
    }, []);

    const rankingGolpes = {};

    denuncias.forEach((denuncia) => {

        if (rankingGolpes[denuncia.tipoGolpe]) {

            rankingGolpes[denuncia.tipoGolpe]++;

        } else {

            rankingGolpes[denuncia.tipoGolpe] = 1;
        }
    });

    const dadosGrafico = Object.entries(
        rankingGolpes
    ).map(([tipo, quantidade]) => ({

        name: tipo.replaceAll("_", " "),
        value: quantidade

    }));

    const COLORS = [
        "#2563eb",
        "#dc2626",
        "#f59e0b",
        "#16a34a",
        "#9333ea",
        "#0891b2"
    ];

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

    const numerosCriticos = Object.entries(
        rankingNumeros
    ).filter(
        ([_, quantidade]) => quantidade >= 5
    );

    return (

        <Layout>

            <div className="
                bg-white
                rounded-2xl
                shadow
                p-8
            ">

                <h1 className="
                    text-3xl
                    md:text-4xl
                    font-bold
                    text-gray-800
                ">
                    Analytics
                </h1>

                <p className="
                    text-gray-500
                    mt-2
                    mb-10
                ">
                    Monitoramento inteligente
                    de padrões de golpes.
                </p>

                <div className="
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    xl:grid-cols-3
                    gap-6
                    mb-10
                ">

                    <div className="
                        bg-blue-50
                        p-6
                        rounded-2xl
                    ">

                        <h2 className="text-gray-500">
                            Total de Denúncias
                        </h2>

                        <p className="
                            text-3xl
                            md:text-4xl
                            font-bold
                            mt-3
                            text-blue-700
                        ">
                            {denuncias.length}
                        </p>

                    </div>

                    <div className="
                        bg-red-50
                        p-6
                        rounded-2xl
                    ">

                        <h2 className="text-gray-500">
                            Alto Risco
                        </h2>

                        <p className="
                            text-3xl
                            md:text-4xl
                            font-bold
                            mt-3
                            text-red-600
                        ">
                            {
                                denuncias.filter(
                                    (d) =>
                                        d.nivelRisco === "ALTO"
                                ).length
                            }
                        </p>

                    </div>

                    <div className="
                        bg-green-50
                        p-6
                        rounded-2xl
                    ">

                        <h2 className="text-gray-500">
                            Tipos de Golpe
                        </h2>

                        <p className="
                            text-3xl
                            md:text-4xl
                            font-bold
                            mt-3
                            text-green-600
                        ">
                            {
                                Object.keys(
                                    rankingGolpes
                                ).length
                            }
                        </p>

                    </div>

                </div>

                <div className="
                    bg-gray-50
                    rounded-2xl
                    p-6
                ">

                    <h2 className="
                        text-2xl
                        font-bold
                        mb-6
                    ">
                        Distribuição de Golpes
                    </h2>

                    <div
                        style={{
                            width: "100%",
                            height: 300,
                        }}

                    >

                        <ResponsiveContainer
                            width="100%"
                            height="100%"
                        >

                            <PieChart>

                                <Pie
                                    data={dadosGrafico}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={130}
                                    label
                                >

                                    {dadosGrafico.map(
                                        (_, index) => (

                                            <Cell
                                                key={index}
                                                fill={
                                                    COLORS[
                                                    index % COLORS.length
                                                    ]
                                                }
                                            />

                                        )
                                    )}

                                </Pie>

                                <Tooltip />

                            </PieChart>

                        </ResponsiveContainer>

                    </div>

                </div>

                <div className="
                    bg-white
                    border
                    rounded-2xl
                    p-6
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
                                        pb-4
                                    "
                                >

                                    <span className="
                                        font-medium
                                    ">
                                        {
                                            tipo.replaceAll(
                                                "_",
                                                " "
                                            )
                                        }
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
                {
                    numerosCriticos.length > 0 && (

                        <div className="
                            bg-red-100
                            border
                            border-red-300
                            text-red-700
                            p-6
                            rounded-2xl
                            mt-10
                        ">

                            <h2 className="
                                text-2xl
                                font-bold
                                mb-3
                            ">
                                ⚠️ Alerta de Fraude
                            </h2>

                            <p>

                                Existem
                                {" "}

                                <strong>
                                    {numerosCriticos.length}
                                </strong>

                                {" "}
                                números com alta reincidência
                                de denúncias.

                            </p>

                        </div>

                    )
                }

                <div className="
                    bg-white
                    border
                    rounded-2xl
                    p-6
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
                                        pb-4
                                    "
                                >

                                    <span className="
                                        font-medium
                                    ">
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

            </div>

        </Layout>
    );
}

export default Analytics;