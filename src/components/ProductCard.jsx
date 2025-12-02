import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {

    const { addToCart } = useCart();

    return (
        <div className="card shadow-sm h-100">
            {}
            <img
                src="https://via.placeholder.com/300x300?text=KRIMEN"
                className="card-img-top"
                alt={product.nombre}
            />

            <div className="card-body d-flex flex-column">

                <h5 className="card-title">{product.nombre}</h5>

                <p className="card-text fw-bold">
                    ${product.precio?.toLocaleString("es-CL")}
                </p>

                <button
                    className="btn btn-dark mt-auto"
                    onClick={() => addToCart(product)}
                >
                    Agregar al carrito
                </button>

            </div>
        </div>
    );
}
