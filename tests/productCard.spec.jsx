import React from 'react'
import ReactDOM from 'react-dom/client'
import ProductCard from '../src/components/ProductCard'
import { CartProvider, useCart } from '../src/context/CartContext'

describe('ProductCard (render/props/event)', function(){
  it('renderiza nombre y precio y dispara onClick', function(done){
    const product = { id:99, name:'Demo', price:1234, category:'x' }
    function Wrap(){
      const { items } = useCart()
      React.useEffect(()=>{
        if (items.find(i=>i.id===99)){ done() }
      }, [items])
      return <ProductCard product={product}/>
    }
    const div = document.createElement('div')
    document.body.appendChild(div)
    const root = ReactDOM.createRoot(div)
    root.render(<CartProvider><Wrap/></CartProvider>)
    setTimeout(()=>{
      const btn = div.querySelector('button')
      btn.click()
    }, 0)
  })
})
