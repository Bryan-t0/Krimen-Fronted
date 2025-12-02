import { useEffect, useMemo, useState } from 'react'
import ProductCard from '../components/ProductCard'
import { useParams } from 'react-router-dom'

async function fetchProductos() {
    const res = await fetch("http://localhost:8080/api/v1/productos")
    return await res.json()
}

export default function Categorias() {

    const { cat } = useParams()
    const [productos, setProductos] = useState([])
    const [search, setSearch] = useState('')

    useEffect(() => {
        fetchProductos().then(data => {
            setProductos(data)
        })
    }, [])

    const filtered = useMemo(() => {
        return productos.filter(p =>
            p.nombre.toLowerCase().includes(search.toLowerCase()) &&
            (p.categoria?.toLowerCase() === cat.toLowerCase())
        )
    }, [productos, search, cat])

    return (
        <div className="container py-4">
            <h1 className="mb-3">Categoría: {cat}</h1>

            <div className="row g-2 mb-3">
                <div className="col-12 col-md-6">
                    <input
                        className="form-control"
                        placeholder="Buscar..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            <div className="row g-3">
                {filtered.map(p => (
                    <div key={p.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                        <ProductCard product={p} />
                    </div>
                ))}

                {filtered.length === 0 && <p>No hay productos en esta categoría</p>}
            </div>
        </div>
    )
}
