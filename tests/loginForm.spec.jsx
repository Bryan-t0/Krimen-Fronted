import React from 'react'
import ReactDOM from 'react-dom/client'
import { MemoryRouter } from 'react-router-dom'
import { AuthProvider } from '@/context/AuthContext.jsx'
import Login from '@/pages/Login.jsx'

describe('Login form', function(){
  it('deshabilita submit con email inválido y pass corto', (done) => {
    const el = document.createElement('div'); document.body.appendChild(el)
    const root = ReactDOM.createRoot(el)

    root.render(
      <AuthProvider>
        <MemoryRouter initialEntries={['/login']}>
          <Login/>
        </MemoryRouter>
      </AuthProvider>
    )

    setTimeout(() => {
      const email = el.querySelector('#login_email')
      const pass  = el.querySelector('#login_pass')
      const btn   = el.querySelector('button')

      expect(email).not.toBeNull()
      expect(pass).not.toBeNull()
      expect(btn).not.toBeNull()

      email.value = 'sin-arroba'
      email.dispatchEvent(new Event('input', {bubbles:true}))
      pass.value = '123'
      pass.dispatchEvent(new Event('input', {bubbles:true}))

      setTimeout(() => {
        expect(btn.disabled).toBeTrue()
        root.unmount(); el.remove()
        done()
      }, 0)
    }, 0)
  })
})
