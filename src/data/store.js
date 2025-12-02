
const API_URL = "http://localhost:8080/api/v1/productos";

// GET → obtener todos los productos
export async function listProducts() {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Error al obtener productos");
    return await res.json();
}

// POST → crear producto (solo ADMIN con token)
export async function createProduct(product, token) {
    const res = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(product)
    });

    if (!res.ok) throw new Error("Error al crear producto");
    return await res.json();
}

// PUT → actualizar producto
export async function updateProduct(id, product, token) {
    const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(product)
    });

    if (!res.ok) throw new Error("Error al actualizar producto");
    return await res.json();
}

// DELETE → eliminar producto
export async function deleteProduct(id, token) {
    const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    if (!res.ok) throw new Error("Error al eliminar producto");
    return true;
}
