import { useState } from "react";

import { useAuth } from "../context/AuthContext";

import {
    useNavigate,
    Link,
    useLocation
} from "react-router-dom";

import {
    FaBars,
    FaTimes,
    FaSignOutAlt
} from "react-icons/fa";

function Layout({ children }) {

    const location = useLocation();

    const { usuario, logout } = useAuth();

    const navigate = useNavigate();

    const [menuAberto, setMenuAberto] =
        useState(false);

    function sair() {

        logout();

        navigate("/");
    }

    function fecharMenu() {

        setMenuAberto(false);
    }

    return (

        <div className="
            min-h-screen
            bg-gray-100
            flex
        ">

            {/* OVERLAY MOBILE */}

            {
                menuAberto && (

                    <div
                        onClick={fecharMenu}
                        className="
                            fixed
                            inset-0
                            bg-black/50
                            z-40
                            lg:hidden
                        "
                    />

                )
            }

            {/* SIDEBAR */}

            <aside className={`
                fixed
                top-0
                left-0
                z-50

                h-screen
                w-64

                bg-gray-900
                text-white
                p-6

                transform
                transition-transform
                duration-300

                ${menuAberto
                    ? "translate-x-0"
                    : "-translate-x-full"
                }

                lg:translate-x-0
                lg:static
            `}>

                <div className="
                    flex
                    items-center
                    justify-between
                    mb-10
                ">

                    <h1 className="
                        text-3xl
                        font-bold
                    ">
                        SafeCall
                    </h1>

                    <button
                        onClick={fecharMenu}
                        className="
                            lg:hidden
                            text-2xl
                        "
                    >
                        <FaTimes />
                    </button>

                </div>

                <nav className="space-y-3">

                    <Link
                        to="/home"
                        onClick={fecharMenu}
                        className={`
                            block
                            p-3
                            rounded-xl
                            transition

                            ${location.pathname === "/home"
                                ? `
                                    bg-blue-600
                                    text-white
                                `
                                : `
                                    text-gray-300
                                    hover:bg-white/10
                                `
                            }
                        `}
                    >
                        Home
                    </Link>

                    <Link
                        to="/nova-denuncia"
                        onClick={fecharMenu}
                        className={`
                            block
                            p-3
                            rounded-xl
                            transition

                            ${location.pathname === "/nova-denuncia"
                                ? `
                                    bg-blue-600
                                    text-white
                                `
                                : `
                                    text-gray-300
                                    hover:bg-white/10
                                `
                            }
                        `}
                    >
                        Nova Denúncia
                    </Link>

                    <Link
                        to="/analytics"
                        onClick={fecharMenu}
                        className={`
                            block
                            p-3
                            rounded-xl
                            transition

                            ${location.pathname === "/analytics"
                                ? `
                                    bg-blue-600
                                    text-white
                                `
                                : `
                                    text-gray-300
                                    hover:bg-white/10
                                `
                            }
                        `}
                    >
                        Analytics
                    </Link>

                    <Link
                        to="/perfil"
                        onClick={fecharMenu}
                        className={`
                            block
                            p-3
                            rounded-xl
                            transition

                            ${location.pathname === "/perfil"
                                ? `
                                    bg-blue-600
                                    text-white
                                `
                                : `
                                    text-gray-300
                                    hover:bg-white/10
                                `
                            }
                        `}
                    >
                        Perfil
                    </Link>

                </nav>

                <div className="mt-10">

                    <p className="
                        text-sm
                        text-gray-400
                    ">
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
                            rounded-lg
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

            {/* CONTEÚDO */}

            <main className="
                flex-1
                min-w-0
            ">

                {/* TOPBAR */}

                <header className="
                    bg-white
                    shadow-sm

                    px-4
                    md:px-10

                    py-4

                    flex
                    items-center
                    justify-between
                ">

                    <div className="
                        flex
                        items-center
                        gap-4
                    ">

                        <button
                            onClick={() =>
                                setMenuAberto(true)
                            }
                            className="
                                lg:hidden
                                text-2xl
                                text-gray-700
                            "
                        >
                            <FaBars />
                        </button>

                        <h2 className="
                            text-lg
                            md:text-2xl
                            font-bold
                            text-gray-800
                        ">
                            SafeCall
                        </h2>

                    </div>

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

                </header>

                {/* PÁGINAS */}

                <div className="
                    p-4
                    md:p-10
                ">

                    {children}

                </div>

            </main>

        </div>
    );
}

export default Layout;