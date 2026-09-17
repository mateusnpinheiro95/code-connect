import { useState } from 'react'
import { LoginPage } from './components/pages/LoginPage'
import { RegisterPage } from './components/pages/RegisterPage'

type AuthView = 'login' | 'register'

function App() {
  const [view, setView] = useState<AuthView>('login')

  if (view === 'register') {
    return <RegisterPage onNavigateToLogin={() => setView('login')} />
  }

  return <LoginPage onNavigateToRegister={() => setView('register')} />
}

export default App
