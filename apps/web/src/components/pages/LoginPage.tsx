import { useState } from 'react'
import { AuthTemplate } from '../templates/AuthTemplate'
import { LoginForm } from '../organisms/LoginForm'
import { SocialLoginSection } from '../organisms/SocialLoginSection'
import { login } from '../../services/auth'
import { getApiErrorMessage } from '../../services/errors'
import { setStoredToken } from '../../services/token'

interface LoginPageProps {
  onNavigateToRegister?: () => void
  onLoginSuccess?: () => void
}

export function LoginPage({
  onNavigateToRegister,
  onLoginSuccess,
}: LoginPageProps) {
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleLogin = async (data: {
    email: string
    password: string
    rememberMe: boolean
  }) => {
    setError(null)
    setIsSubmitting(true)

    try {
      const { access_token } = await login(data.email, data.password)
      setStoredToken(access_token)
      onLoginSuccess?.()
    } catch (err) {
      setError(getApiErrorMessage(err, 'Email ou senha inválidos.'))
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleForgotPassword = () => {
    console.log('Forgot password clicked')
    // TODO: Implement forgot password logic
  }

  const handleGithubLogin = () => {
    console.log('GitHub login clicked')
    // TODO: Implement GitHub OAuth
  }

  const handleGoogleLogin = () => {
    console.log('Google login clicked')
    // TODO: Implement Google OAuth
  }

  const handleRegisterClick = () => {
    onNavigateToRegister?.()
  }

  return (
    <AuthTemplate
      bannerImage="/banner_login.png"
      bannerAlt="Code Connect Login"
      bannerWidth={814}
      bannerHeight={1272}
      title="Login"
      subtitle="Boas-vindas! Faça seu login."
      footerText="Ainda não tem conta?"
      footerLinkText="Crie seu cadastro!"
      footerHref="#cadastro"
      footerIcon="register"
      footerLayout="stack"
      onFooterLinkClick={handleRegisterClick}
    >
      <div className="flex w-full flex-col gap-8">
        {error ? (
          <p role="alert" className="text-body-sm text-error">
            {error}
          </p>
        ) : null}

        <LoginForm
          onSubmit={handleLogin}
          onForgotPassword={handleForgotPassword}
        />

        {isSubmitting ? (
          <p className="text-body-sm text-text-secondary" aria-live="polite">
            Entrando…
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
