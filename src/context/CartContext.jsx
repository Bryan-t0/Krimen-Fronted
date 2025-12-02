import { createContext, useContext, useMemo, useState } from 'react'

const CartCtx = createContext(null)

export function CartProvider({ children }){
  const [items, setItems] = useState([]) 

  const add = (product, qty=1) => {
    setItems(prev => {
      const i = prev.findIndex(x => x.id === product.id)
      if (i >= 0){
        const copy = [...prev]
        copy[i] = { ...copy[i], qty: copy[i].qty + qty }
        return copy
      }
      return [...prev, { id:product.id, name:product.name, price:product.price, qty }]
    })
  }

  const remove = (id) => setItems(prev => prev.filter(x => x.id !== id))
  const setQty = (id, qty) => setItems(prev => prev.map(x => x.id===id?{...x, qty:Math.max(1, qty)}:x))
  const clear = () => setItems([])

  const total = useMemo(()=> items.reduce((s, x)=> s + x.price * x.qty, 0), [items])
  return <CartCtx.Provider value={{ items, add, remove, setQty, clear, total }}>{children}</CartCtx.Provider>
}

export function useCart(){ return useContext(CartCtx) }
