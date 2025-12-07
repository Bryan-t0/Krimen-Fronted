import { useEffect, useState } from "react";

const API = "http://localhost:8080/api/v1/productos";

export default function Admin() {
    const [productos, setProductos] = useState([]);

    const [nombre, setNombre] = useState("");
    const [precio, setPrecio] = useState("");
    const [categoria, setCategoria] = useState("ropa");
    const [oferta, setOferta] = useState(false);
    const [stock, setStock] = useState("");
    const [image, setImage] = useState("");

    const [editId, setEditId] = useState(null);

    const token = localStorage.getItem("token");

    async function cargar() {
        const res = await fetch(API);
        const data = await res.json();
        setProductos(data);
    }

    useEffect(() => {
        cargar();
    }, []);

    async function crear() {
        await fetch(API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
            body: JSON.stringify({ nombre, precio, categoria, oferta, stock, image }),
        });

        resetForm();
        cargar();
    }

    async function eliminar(id) {
        await fetch(`${API}/${id}`, {
            method: "DELETE",
            headers: { Authorization: "Bearer " + token },
        });
        cargar();
    }

    async function actualizar() {
        await fetch(`${API}/${editId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
            body: JSON.stringify({ nombre, precio, categoria, oferta, stock, image }),
        });

        resetForm();
        cargar();
    }

    function resetForm() {
        setEditId(null);
        setNombre("");
        setPrecio("");
        setCategoria("ropa");
        setOferta(false);
        setStock("");
        setImage("");
    }

    return (
        <div className="container py-4">
            <h1 className="mb-3">Panel de Administración</h1>

            <div className="row mb-4">

                {/* FORMULARIO */}
                <div className="col-12 col-md-4">

                    <input
                        className="form-control mb-2"
                        placeholder="Nombre"
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                    />

                    <input
                        className="form-control mb-2"
                        placeholder="Precio"
                        type="number"
                        value={precio}
                        onChange={e => setPrecio(e.target.value)}
                    />

                    <select
                        className="form-control mb-2"
                        value={categoria}
                        onChange={e => setCategoria(e.target.value)}>
                        <option value="ropa">Ropa</option>
                        <option value="accesorios">Accesorios</option>
                    </select>

                    <div className="form-check mb-2">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            checked={oferta}
                            onChange={(e) => setOferta(e.target.checked)}
                        />
                        <label className="form-check-label">Oferta</label>
                    </div>

                    <input
                        className="form-control mb-2"
                        placeholder="Stock"
                        type="number"
                        value={stock}
                        onChange={e => setStock(e.target.value)}
                    />

                    <input
                        className="form-control mb-3"
                        placeholder="URL Imagen"
                        value={image}
                        onChange={e => setImage(e.target.value)}
                    />

                    {editId ? (
                        <button className="btn btn-warning w-100" onClick={actualizar}>
                            Actualizar
                        </button>
                    ) : (
                        <button className="btn btn-success w-100" onClick={crear}>
                            Crear
                        </button>
                    )}
                </div>

                {/* LISTA */}
                <div className="col-12 col-md-8">
                    <table className="table">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Cat</th>
                            <th>Of</th>
                            <th>Stock</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {productos.map(p => (
                            <tr key={p.id}>
                                <td>{p.id}</td>
                                <td>{p.nombre}</td>
                                <td>${p.precio}</td>
                                <td>{p.categoria}</td>
                                <td>{p.oferta ? "Sí" : "No"}</td>
                                <td>{p.stock}</td>
                                <td>
                                    <button
                                        className="btn btn-sm btn-warning me-2"
                                        onClick={() => {
                                            setEditId(p.id);
                                            setNombre(p.nombre);
                                            setPrecio(p.precio);
                                            setCategoria(p.categoria);
                                            setOferta(p.oferta);
                                            setStock(p.stock);
                                            setImage(p.image);
                                        }}>
                                        Editar
                                    </button>

                                    <button
                                        className="btn btn-sm btn-danger"
                                        onClick={() => eliminar(p.id)}>
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
}
