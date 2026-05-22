import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";

function Dashboard() {

    const { usuario } = useAuth();

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
                        Chamados Hoje
                    </h2>

                    <p className="text-4xl font-bold mt-3">
                        12
                    </p>
                </div>

                <div className="
                    bg-white
                    p-6
                    rounded-2xl
                    shadow
                ">
                    <h2 className="text-gray-500">
                        Emergências
                    </h2>

                    <p className="text-4xl font-bold mt-3 text-red-500">
                        3
                    </p>
                </div>

                <div className="
                    bg-white
                    p-6
                    rounded-2xl
                    shadow
                ">
                    <h2 className="text-gray-500">
                        Usuários Ativos
                    </h2>

                    <p className="text-4xl font-bold mt-3">
                        28
                    </p>
                </div>

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
                        Chamados Recentes
                    </h2>

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
                                    Usuário
                                </th>

                                <th className="pb-3">
                                    Status
                                </th>

                                <th className="pb-3">
                                    Prioridade
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            <tr className="border-b">

                                <td className="py-4">
                                    #1023
                                </td>

                                <td>
                                    Leonardo
                                </td>

                                <td>

                                    <span className="
                                        bg-yellow-100
                                        text-yellow-700
                                        px-3
                                        py-1
                                        rounded-full
                                        text-sm
                                    ">
                                        Em andamento
                                    </span>

                                </td>

                                <td>
                                    Média
                                </td>

                            </tr>

                            <tr className="border-b">

                                <td className="py-4">
                                    #1024
                                </td>

                                <td>
                                    Carlos
                                </td>

                                <td>

                                    <span className="
                                        bg-red-100
                                        text-red-700
                                        px-3
                                        py-1
                                        rounded-full
                                        text-sm
                                    ">
                                        Emergência
                                    </span>

                                </td>

                                <td>
                                    Alta
                                </td>

                            </tr>

                            <tr>

                                <td className="py-4">
                                    #1025
                                </td>

                                <td>
                                    Maria
                                </td>

                                <td>

                                    <span className="
                                        bg-green-100
                                        text-green-700
                                        px-3
                                        py-1
                                        rounded-full
                                        text-sm
                                    ">
                                        Resolvido
                                    </span>

                                </td>

                                <td>
                                    Baixa
                                </td>

                            </tr>

                        </tbody>

                    </table>

                </div>

            </div>

        </Layout>
    );
}

export default Dashboard;