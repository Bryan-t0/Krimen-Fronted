import { useEffect, useMemo, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'

const NAME_RE  = /^[A-Za-zÁÉÍÓÚÑáéíóúñ ]{2,40}$/      
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/         
const ADDR_MIN = 8

export default function Checkout(){
  const { user } = useAuth()
  const { items, total, clear } = useCart()
  const nav = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [errors, setErrors] = useState({ name:'', email:'', address:'', general:'' })

  useEffect(()=>{
    if (user){
      setName(user.name || '')
      setEmail(user.email || '')
    }
  }, [user])

  const formValid = useMemo(()=>(
    NAME_RE.test(name.trim()) &&
    EMAIL_RE.test(email.trim()) &&
    address.trim().length >= ADDR_MIN &&
    items.length > 0
  ), [name, email, address, items])

  const onSubmit = (e) => {
    e.preventDefault()
    const next = { name:'', email:'', address:'', general:'' }

    if (!NAME_RE.test(name.trim()))      next.name = 'Solo letras y espacios (2–40)'
    if (!EMAIL_RE.test(email.trim()))    next.email = 'Correo no válido'
    if (address.trim().length < ADDR_MIN) next.address = `Dirección mínima ${ADDR_MIN} caracteres`
    if (items.length === 0)              next.general = 'Carrito vacío'

    if (Object.values(next).some(Boolean)) { setErrors(next); return }

    const ok = (total % 2 === 0)
    if (ok){
      clear()
      nav('/compra-exitosa')
    } else {
      nav('/compra-error')
    }
  }

  return (
    <div className="container py-4" style={{maxWidth:720}}>
      <h1>Checkout</h1>
      <p>Total a pagar: <strong>${Number(total).toLocaleString()}</strong></p>

      <form onSubmit={onSubmit} className="vstack gap-2" noValidate>
        <div>
          <input
            id="chk_name"
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            placeholder="Nombre"
            value={name}
            onChange={e=>setName(e.target.value.replace(/[^A-Za-zÁÉÍÓÚÑáéíóúñ ]+/g, ''))}
            required
            pattern="[A-Za-zÁÉÍÓÚÑáéíóúñ ]{2,40}"
          />
          <div id="e_chk_name" className="invalid-feedback" style={{display: errors.name ? 'block' : 'none'}}>
            {errors.name}
          </div>
        </div>

        <div>
          <input
            id="chk_email"
            type="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            placeholder="Correo"
            value={email}
            onChange={e=>setEmail(e.target.value)}
            required
          />
          <div id="e_chk_email" className="invalid-feedback" style={{display: errors.email ? 'block' : 'none'}}>
            {errors.email}
          </div>
        </div>

        <div>
          <input
            id="chk_address"
            className={`form-control ${errors.address ? 'is-invalid' : ''}`}
            placeholder="Dirección"
            value={address}
            onChange={e=>setAddress(e.target.value)}
            required
            minLength={ADDR_MIN}
          />
          <div id="e_chk_address" className="invalid-feedback" style={{display: errors.address ? 'block' : 'none'}}>
            {errors.address}
          </div>
        </div>

        {errors.general && <div className="alert alert-danger">{errors.general}</div>}

        <button className="btn btn-dark" disabled={!formValid}>Pagar</button>
      </form>
    </div>
  )
}
