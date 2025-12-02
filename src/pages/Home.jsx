import { useEffect, useMemo, useState } from 'react'
import ProductCard from '../components/ProductCard'

async function fetchProductos() {
    const res = await fetch("http://localhost:8080/api/v1/productos")
    if (!res.ok) throw new Error("Error al obtener productos")
    return await res.json()
}

export default function Home() {

    const [search, setSearch] = useState('')
    const [onlyOffers, setOnlyOffers] = useState(false)
    const [productos, setProductos] = useState([])


    useEffect(() => {
        fetchProductos()
            .then(data => setProductos(data))
            .catch(err => console.error(err))
    }, [])


    const products = useMemo(() => {
        return productos.filter(p => {
            const matchSearch = p.nombre.toLowerCase().includes(search.toLowerCase())


            const matchOffer = onlyOffers ? p.offer === true : true

            return matchSearch && matchOffer
        })
    }, [productos, search, onlyOffers])

    return (
        <div className="container py-4">
            <h1 className="mb-3">Tienda</h1>

            { }
            <div className="row g-2 mb-3">

                <div className="col-12 col-md-6">
                    <input
                        className="form-control"
                        placeholder="Buscar..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>

                <div className="col-12 col-md-6 d-flex align-items-center gap-2">
                    <input
                        type="checkbox"
                        id="offers"
                        checked={onlyOffers}
                        onChange={e => setOnlyOffers(e.target.checked)}
                    />
                    <label htmlFor="offers" className="mb-0">Solo ofertas</label>
                </div>

            </div>

            { }
            <div className="row g-3">
                {products.map(p => (
                    <div key={p.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                        <ProductCard product={p} />
                    </div>
                ))}

                {products.length === 0 && <p>No hay productos</p>}
            </div>

        </div>
    )
}
