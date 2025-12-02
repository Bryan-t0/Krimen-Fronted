import { listProducts } from '../data/store'
import ProductCard from '../components/ProductCard'

export default function Ofertas(){
  const products = listProducts({ offer:true })
  return (
    <div className="container py-4">
      <h1 className="mb-3">Ofertas</h1>
      <div className="row g-3">
        {products.map(p => <div key={p.id} className="col-12 col-sm-6 col-md-4 col-lg-3"><ProductCard product={p}/></div>)}
        {products.length===0 && <p>No hay ofertas</p>}
      </div>
    </div>
  )
}
