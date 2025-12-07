import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Register() {

    const navigate = useNavigate()
    const { setUser } = useAuth()

    const [nombre, setNombre] = useState('')
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    async function handleSubmit(e) {
        e.preventDefault()
        setError('')
        setSuccess('')

        if (!nombre.trim()) {
            setError("El nombre es obligatorio")
            return
        }

        if (!email.includes("@") || !email.includes(".")) {
            setError("Correo inválido")
            return
        }

        if (pass.length < 4) {
            setError("La contraseña debe tener mínimo 4 caracteres")
            return
        }

        const res = await fetch("http://localhost:8080/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                nombre,
                email,
                password: pass
            })
        })

        if (!res.ok) {
            setError("No se pudo registrar (correo ya existe)")
            return
        }

        const data = await res.json()

        localStorage.setItem("email", data.email)
        localStorage.setItem("rol", data.rol)
        localStorage.setItem("token", "")

        setUser({
            email: data.email,
            role: data.rol
        })

        setSuccess("Cuenta creada correctamente")

        setTimeout(() => {
            navigate("/login")
        }, 1200)
    }

    return (
        <div className="container py-4">
            <h1 className="mb-3">Registrarse</h1>

            <form onSubmit={handleSubmit} className="col-12 col-md-6">

                <input
                    className="form-control mb-3"
                    placeholder="Nombre"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                />

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
                {success && <p className="text-success fw-bold">{success}</p>}

                <button className="btn btn-success w-100">
                    Crear cuenta
                </button>

            </form>
        </div>
    )
}
