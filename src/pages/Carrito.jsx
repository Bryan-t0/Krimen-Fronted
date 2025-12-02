import { useCart } from '../context/CartContext'
import { Link } from 'react-router-dom'

export default function Carrito(){
  const { items, setQty, remove, total, clear } = useCart()
  return (
    <div className="container py-4">
      <h1 className="mb-3">Carrito</h1>
      {items.length===0 ? <p>Tu carrito está vacío</p> : (
        <div className="table-responsive">
          <table className="table align-middle">
            <thead><tr><th>Producto</th><th>Precio</th><th>Cantidad</th><th>Subtotal</th><th></th></tr></thead>
            <tbody>
              {items.map(it => (
                <tr key={it.id}>
                  <td>{it.name}</td>
                  <td>${it.price}</td>
                  <td style={{maxWidth:120}}>
                    <input className="form-control" type="number" min="1" value={it.qty} onChange={e=>setQty(it.id, parseInt(e.target.value||'1'))} />
                  </td>
                  <td>${it.price * it.qty}</td>
                  <td><button className="btn btn-sm btn-outline-danger" onClick={()=>remove(it.id)}>Quitar</button></td>
                </tr>
              ))}
            </tbody>
            <tfoot><tr><td colSpan="3" className="text-end fw-bold">Total</td><td className="fw-bold">${total}</td><td></td></tr></tfoot>
          </table>
          <div className="d-flex gap-2">
            <button className="btn btn-outline-secondary" onClick={clear}>Vaciar</button>
            <Link className="btn btn-dark" to="/checkout">Ir a pagar</Link>
          </div>
        </div>
      )}
    </div>
  )
}
