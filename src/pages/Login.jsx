import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Login() {

    const { setUser } = useAuth()
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
        setError('')

        const res = await fetch("http://localhost:8080/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password: pass })
        })

        if (!res.ok) {
            setError("Credenciales inválidas")
            return
        }

        const data = await res.json()

        localStorage.setItem("token", data.token)
        localStorage.setItem("rol", data.rol)
        localStorage.setItem("email", data.email)

        setUser({
            email: data.email,
            role: data.rol
        })

        navigate("/")
    }

    return (
        <div className="container py-4">
            <h1 className="mb-3">Iniciar sesión</h1>
            <form onSubmit={handleSubmit} className="col-12 col-md-6">

                <input
                    className="form-control mb-3"
                    type="email"
                    placeholder="Correo"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />

                <input
                    className="form-control mb-3"
                    type="password"
                    placeholder="Contraseña"
                    value={pass}
                    onChange={e => setPass(e.target.value)}
                />

                {error && <p className="text-danger">{error}</p>}

                <button className="btn btn-primary">Ingresar</button>

            </form>
        </div>
    )
}
