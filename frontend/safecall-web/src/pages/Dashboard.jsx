function Dashboard() {

    const token = localStorage.getItem("token");

    function logout() {
        localStorage.removeItem("token");
        window.location.href = "/";
    }

    return (
        <div>
            <h1>Dashboard</h1>

            <p>Usuário autenticado</p>

            <p>
                Token:
            </p>

            <textarea
                value={token}
                readOnly
                rows={10}
                cols={60}
            />

            <br /><br />

            <button onClick={logout}>
                Sair
            </button>
        </div>
    );
}

export default Dashboard;