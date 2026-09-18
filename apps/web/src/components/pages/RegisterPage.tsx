import { useState } from 'react'
import { AuthTemplate } from '../templates/AuthTemplate'
import { RegisterForm } from '../organisms/RegisterForm'
import { SocialLoginSection } from '../organisms/SocialLoginSection'
import { register } from '../../services/auth'
import { getApiErrorMessage } from '../../services/errors'

interface RegisterPageProps {
  onNavigateToLogin?: () => void
}

export function RegisterPage({ onNavigateToLogin }: RegisterPageProps) {
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleRegister = async (data: {
    name: string
    email: string
    password: string
    rememberMe: boolean
  }) => {
    setError(null)
    setIsSubmitting(true)

    try {
      await register(data.name, data.email, data.password)
      onNavigateToLogin?.()
    } catch (err) {
      setError(getApiErrorMessage(err, 'Não foi possível criar a conta.'))
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleGithubLogin = () => {
    console.log('GitHub login clicked')
    // TODO: Implement GitHub OAuth
  }

  const handleGoogleLogin = () => {
    console.log('Google login clicked')
    // TODO: Implement Google OAuth
  }

  const handleLoginClick = () => {
    onNavigateToLogin?.()
  }

  return (
    <AuthTemplate
      bannerImage="/banner_register.png"
      bannerAlt="Code Connect Cadastro"
      bannerWidth={814}
      bannerHeight={1350}
      title="Cadastro"
      subtitle="Olá! Preencha seus dados."
      footerText="Já tem conta?"
      footerLinkText="Faça seu login!"
      footerHref="#login"
      footerIcon="login"
      footerLayout="inline"
      onFooterLinkClick={handleLoginClick}
    >
      <div className="flex w-full flex-col gap-8">
        {error ? (
          <p role="alert" className="text-body-sm text-error">
            {error}
          </p>
        ) : null}

        <RegisterForm onSubmit={handleRegister} />

        {isSubmitting ? (
          <p className="text-body-sm text-text-secondary" aria-live="polite">
            Cadastrando…
          </p>
        ) : null}

        <SocialLoginSection
          onGithubLogin={handleGithubLogin}
          onGoogleLogin={handleGoogleLogin}
        />
      </div>
    </AuthTemplate>
  )
}
