import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
    FaHome,
    FaUser,
    FaExclamationTriangle,
    FaSignOutAlt
} from "react-icons/fa";

function Layout({ children }) {

    const { usuario, logout } = useAuth();

    const navigate = useNavigate();

    function sair() {

        logout();

        navigate("/");
    }

    return (

        <div className="flex min-h-screen bg-gray-100">

            {/* SIDEBAR */}

            <aside className="w-64 bg-gray-900 text-white p-6">

                <h1 className="text-3xl font-bold mb-10">
                    SafeCall
                </h1>

                <nav className="flex flex-col gap-4">

                    <button
                        className="
                            flex
                            items-center
                            gap-3
                            text-left
                            hover:text-blue-400
                            transition
                        "
                    >
                        <FaHome />

                        Dashboard
                    </button>

                    <button
                        className="
                            flex
                            items-center
                            gap-3
                            text-left
                            hover:text-blue-400
                            transition
                        "
                    >
                        <FaUser />

                        Perfil
                    </button>

                    <button
                        className="
                            flex
                            items-center
                            gap-3
                            text-left
                            hover:text-blue-400
                            transition
                        "
                    >
                        <FaExclamationTriangle />

                        Chamados
                    </button>

                </nav>

                <div className="mt-10">

                    <p className="text-sm text-gray-400">
                        Usuário logado
                    </p>

                    <h2 className="font-bold">
                        {usuario?.nome}
                    </h2>

                    <button
                        onClick={sair}
                        className="
                            mt-5
                            bg-red-500
                            px-4
                            py-2
                            rounded
                            hover:bg-red-600
                            transition
                            flex
                            items-center
                            gap-2
                        "
                    >
                        <FaSignOutAlt />

                        Sair
                    </button>

                </div>

            </aside>

            <main className="flex-1 bg-gray-100">

                {/* TOPBAR */}

                <header className="
                    bg-white
                    shadow-sm
                    px-10
                    py-4
                    flex
                    items-center
                    justify-between
                ">

                    <div>

                        <h2 className="
                            text-2xl
                            font-bold
                            text-gray-800
                        ">
                            Painel Administrativo
                        </h2>

                    </div>

                    <div className="
                        flex
                        items-center
                        gap-4
                    ">

                        <input
                            type="text"
                            placeholder="Buscar..."
                            className="
                                border
                                rounded-lg
                                px-4
                                py-2
                                outline-none
                                focus:ring-2
                                focus:ring-blue-400
                            "
                        />

                        <div className="
                            w-10
                            h-10
                            rounded-full
                            bg-blue-500
                            flex
                            items-center
                            justify-center
                            text-white
                            font-bold
                        ">

                            {usuario?.nome?.charAt(0)}

                        </div>

                    </div>

                </header>

                {/* CONTEÚDO */}

                <div className="p-10">

                    {children}

                </div>

            </main>

        </div>
    );
}

export default Layout;