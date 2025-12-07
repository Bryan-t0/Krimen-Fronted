import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function NavBar() {

    const { user, logout } = useAuth();

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
            <Link className="navbar-brand" to="/">KRIMEN STORE</Link>

            <div className="collapse navbar-collapse show">
                <ul className="navbar-nav me-auto">

                    <li className="nav-item">
                        <Link className="nav-link" to="/">Inicio</Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to="/categorias/ropa">Ropa</Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to="/categorias/accesorios">Accesorios</Link>
                    </li>

                    {user?.role === "ADMIN" && (
                        <li className="nav-item">
                            <Link className="nav-link" to="/admin">ADMIN</Link>
                        </li>
                    )}

                </ul>

                <ul className="navbar-nav ms-auto">

                    {!user && (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">Iniciar sesión</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="/register">Registrarse</Link>
                            </li>
                        </>
                    )}

                    {user && (
                        <>
                            <li className="nav-item">
                                <span className="nav-link">{user.email}</span>
                            </li>

                            <li className="nav-item">
                                <button
                                    className="btn btn-sm btn-outline-light"
                                    onClick={logout}
                                >
                                    Cerrar sesión
                                </button>
                            </li>
                        </>
                    )}

                </ul>

            </div>
        </nav>
    );
}
