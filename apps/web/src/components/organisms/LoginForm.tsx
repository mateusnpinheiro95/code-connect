import { useState } from 'react'
import type { FormEvent } from 'react'
import { InputField } from '../molecules/InputField'
import { RememberMeCheckbox } from '../molecules/RememberMeCheckbox'
import { Button } from '../atoms/Button'

interface LoginFormProps {
  onSubmit: (data: { email: string; password: string; rememberMe: boolean }) => void
  onForgotPassword?: () => void
}

export function LoginForm({ onSubmit, onForgotPassword }: LoginFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSubmit({ email, password, rememberMe })
  }

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-6">
      <div className="space-y-4">
        <InputField
          label="Email ou usuário"
          type="text"
          placeholder="usuario123"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <InputField
          label="Senha"
          type="password"
          placeholder="••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <RememberMeCheckbox
        checked={rememberMe}
        onChange={(e) => setRememberMe(e.target.checked)}
        onForgotPassword={onForgotPassword}
      />

      <Button type="submit" fullWidth>
        Login →
      </Button>
    </form>
  )
}
