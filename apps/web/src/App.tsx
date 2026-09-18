import { useEffect, useState } from 'react'
import { LoginPage } from './components/pages/LoginPage'
import { RegisterPage } from './components/pages/RegisterPage'
import { getMe, type UserResponse } from './services/auth'
import {
  clearStoredToken,
  getStoredToken,
} from './services/token'

type AuthView = 'login' | 'register' | 'authenticated'

function App() {
  const [view, setView] = useState<AuthView>(() =>
    getStoredToken() ? 'authenticated' : 'login',
  )
  const [user, setUser] = useState<UserResponse | null>(null)

  useEffect(() => {
    if (view !== 'authenticated') {
      return
    }

    const token = getStoredToken()
    if (!token) {
      return
    }

    let cancelled = false

    getMe(token)
      .then((profile) => {
        if (!cancelled) {
          setUser(profile)
        }
      })
      .catch(() => {
        if (!cancelled) {
          clearStoredToken()
          setUser(null)
          setView('login')
        }
      })

    return () => {
      cancelled = true
    }
  }, [view])

  const handleLogout = () => {
    clearStoredToken()
    setUser(null)
    setView('login')
  }

  if (view === 'authenticated') {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-dark px-4 text-text-primary">
        <h1 className="text-display font-sans">
          {user ? `Olá, ${user.name}!` : 'Carregando…'}
        </h1>
        {user ? (
          <p className="text-body text-text-secondary">{user.email}</p>
        ) : null}
        <button
          type="button"
          onClick={handleLogout}
          className="rounded-button bg-primary px-6 py-3 text-body text-on-primary hover:bg-primary-dark"
        >
          Sair
        </button>
      </main>
    )
  }

  if (view === 'register') {
    return <RegisterPage onNavigateToLogin={() => setView('login')} />
  }

  return (
    <LoginPage
      onNavigateToRegister={() => setView('register')}
      onLoginSuccess={() => setView('authenticated')}
    />
  )
}

export default App
