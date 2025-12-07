import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

export default function Ofertas() {

    const [productos, setProductos] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/v1/productos")
            .then(res => res.json())
            .then(data => setProductos(data.filter(p => p.offer === true)));
    }, []);

    return (
        <div className="container py-4">
            <h1 className="mb-3">Ofertas</h1>

            <div className="row g-3">
                {productos.map(p => (
                    <div key={p.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                        <ProductCard product={p} />
                    </div>
                ))}

                {productos.length === 0 && <p>No hay ofertas</p>}
            </div>
        </div>
    );
}
