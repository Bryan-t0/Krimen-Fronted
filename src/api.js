const API = "http://localhost:8080";

// GET productos
export async function getProductos() {
    const res = await fetch(`${API}/api/producto`);
    return res.json();
}

// POST crear producto
export async function createProducto(prod, token) {
    const res = await fetch(`${API}/api/producto`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(prod)
    });
    return res.json();
}

// LOGIN
export async function login(email, password) {
    const res = await fetch(`${API}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });

    return res.json();
}
