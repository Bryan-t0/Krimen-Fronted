import { useEffect, useState } from 'react'

const API = "http://localhost:8080/api/v1/productos"

export default function Admin() {

    const [productos, setProductos] = useState([])
    const [nombre, setNombre] = useState('')
    const [precio, setPrecio] = useState('')
    const [editId, setEditId] = useState(null)

    const token = localStorage.getItem("token")

    async function cargar() {
        const res = await fetch(API)
        const data = await res.json()
        setProductos(data)
    }

    useEffect(() => {
        cargar()
    }, [])

    async function crear() {
        await fetch(API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify({ nombre, precio })
        })

        setNombre('')
        setPrecio('')
        cargar()
    }

    async function eliminar(id) {
        await fetch(`${API}/${id}`, {
            method: "DELETE",
            headers: { "Authorization": "Bearer " + token }
        })
        cargar()
    }

    async function actualizar() {
        await fetch(`${API}/${editId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify({ nombre, precio })
        })

        setEditId(null)
        setNombre('')
        setPrecio('')
        cargar()
    }

    return (
        <div className="container py-4">
            <h1 className="mb-3">Panel de Administración</h1>

            <div className="row mb-4">
                <div className="col-12 col-md-4">
                    <input className="form-control mb-2" placeholder="Nombre"
                           value={nombre} onChange={e => setNombre(e.target.value)} />

                    <input className="form-control mb-2" placeholder="Precio"
                           value={precio} onChange={e => setPrecio(e.target.value)} />

                    {editId ?
                        <button className="btn btn-warning w-100" onClick={actualizar}>Actualizar</button>
                        :
                        <button className="btn btn-success w-100" onClick={crear}>Crear</button>
                    }
                </div>

                <div className="col-12 col-md-8">
                    <table className="table">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {productos.map(p => (
                            <tr key={p.id}>
                                <td>{p.id}</td>
                                <td>{p.nombre}</td>
                                <td>${p.precio}</td>
                                <td>
                                    <button className="btn btn-sm btn-warning me-2"
                                            onClick={() => {
                                                setEditId(p.id)
                                                setNombre(p.nombre)
                                                setPrecio(p.precio)
                                            }}>
                                        Editar
                                    </button>

                                    <button className="btn btn-sm btn-danger"
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
    )
}
