import React from 'react'
import ReactDOM from 'react-dom/client'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider, useAuth } from '@/context/AuthContext.jsx'

function Guard({ children }){
  const { user } = useAuth()
  return user?.role === 'Administrador' ? children : <div data-testid="redir">redir</div>
}
function AdminPage(){ return <div data-testid="admin">PANEL</div> }

function App(){
  return (
    <Routes>
      <Route path="/" element={<div>home</div>} />
      <Route path="/admin" element={<Guard><AdminPage/></Guard>} />
    </Routes>
  )
}

describe('Admin guard', function(){
  it('muestra panel solo si role=Administrador', (done) => {
    const el = document.createElement('div'); document.body.appendChild(el)
    const root = ReactDOM.createRoot(el)

    localStorage.removeItem('auth_user')
    root.render(
      <AuthProvider>
        <MemoryRouter initialEntries={['/admin']}>
          <App/>
        </MemoryRouter>
      </AuthProvider>
    )
    setTimeout(() => {
      expect(el.textContent).toContain('redir')

      localStorage.setItem('auth_user', JSON.stringify({ role:'Administrador', email:'admin' }))
      root.render(
        <AuthProvider>
          <MemoryRouter initialEntries={['/admin']}>
            <App/>
          </MemoryRouter>
        </AuthProvider>
      )
      setTimeout(() => {
        expect(el.textContent).toContain('PANEL')
        root.unmount(); el.remove()
        done()
      }, 0)
    }, 0)
  })
})
