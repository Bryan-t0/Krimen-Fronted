import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const email = localStorage.getItem("email");
        const rol = localStorage.getItem("rol");

        if (token && email && rol) {
            setUser({ email, role: rol });
        }
    }, []);

    function login(data) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("email", data.email);
        localStorage.setItem("rol", data.rol);

        setUser({
            email: data.email,
            role: data.rol
        });
    }

    function logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        localStorage.removeItem("rol");
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
