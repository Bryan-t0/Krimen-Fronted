import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useAuth } from './context/AuthContext'

import NavBar from './components/NavBar'
import Home from './pages/Home'
import Categorias from './pages/Categorias'
import Carrito from './pages/Carrito'
import Checkout from './pages/Checkout'
import CompraOK from './pages/CompraOK'
import CompraError from './pages/CompraError'
import Ofertas from './pages/Ofertas'
import Admin from './pages/Admin'
import Login from './pages/Login'
import Register from './pages/Register'

function AdminGuard({ children }) {
    const { user, ready } = useAuth()
    const loc = useLocation()

    if (!ready) return null
    if (user?.role?.toUpperCase() === 'ADMIN') return children
    return <Navigate to="/login" replace state={{ from: loc }} />
}

export default function App() {
    return (
        <>
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/categorias/:cat" element={<Categorias />} />
                <Route path="/carrito" element={<Carrito />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/compra-exitosa" element={<CompraOK />} />
                <Route path="/compra-error" element={<CompraError />} />
                <Route path="/ofertas" element={<Ofertas />} />

                <Route path="/admin" element={<AdminGuard><Admin /></AdminGuard>} />

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </>
    )
}
