const API = "http://localhost:8080";

export async function getProductos() {
    const res = await fetch(`${API}/api/v1/productos`);
    return res.json();
}

export async function createProducto(prod, token) {
    const res = await fetch(`${API}/api/v1/productos`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(prod)
    });
    return res.json();
}

export async function login(email, password) {
    const res = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });

    return res.json();
}
