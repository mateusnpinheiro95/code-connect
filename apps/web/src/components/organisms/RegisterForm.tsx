import { useState } from 'react'
import type { FormEvent } from 'react'
import { InputField } from '../molecules/InputField'
import { RememberMeCheckbox } from '../molecules/RememberMeCheckbox'
import { Button } from '../atoms/Button'

interface RegisterFormProps {
  onSubmit: (data: {
    name: string
    email: string
    password: string
    rememberMe: boolean
  }) => void
}

function ArrowForwardIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <path
        d="M5 12H19M19 12L13 6M19 12L13 18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function RegisterForm({ onSubmit }: RegisterFormProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSubmit({ name, email, password, rememberMe })
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-8">
      <div className="flex w-full flex-col gap-4">
        <InputField
          label="Nome"
          type="text"
          placeholder="Nome completo"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <InputField
          label="Email"
          type="email"
          placeholder="Digite seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <div className="flex w-full flex-col gap-2">
          <InputField
            label="Senha"
            type="password"
            placeholder="••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <RememberMeCheckbox
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
        </div>
      </div>

      <Button type="submit" fullWidth>
        Cadastrar
        <ArrowForwardIcon />
      </Button>
    </form>
  )
}
