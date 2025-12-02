import { listProducts, createProduct, updateProduct, deleteProduct, resetStore } from '@/data/store.js'
import { PRODUCTS } from '@/data/products.js'

describe('store CRUD', function(){
  beforeEach(() => resetStore(PRODUCTS))

  it('lista con filtro por oferta', function(){
    const offers = listProducts({ offer: true })
    expect(offers.length).toBeGreaterThan(0)
    expect(offers.every(p => p.offer === true)).toBeTrue()
  })

  it('crea, actualiza y elimina', function(){
    const p = createProduct({ name:'Test', price:1000, category:'ropa', offer:false, stock:1 })
    const upd = updateProduct(p.id, { price:2000 })
    expect(upd.price).toBe(2000)
    const ok = deleteProduct(p.id)
    expect(ok).toBeTrue()
  })
})
