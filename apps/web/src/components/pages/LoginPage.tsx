import { AuthTemplate } from '../templates/AuthTemplate'
import { LoginForm } from '../organisms/LoginForm'
import { SocialLoginSection } from '../organisms/SocialLoginSection'

interface LoginPageProps {
  onNavigateToRegister?: () => void
}

export function LoginPage({ onNavigateToRegister }: LoginPageProps) {
  const handleLogin = (data: { email: string; password: string; rememberMe: boolean }) => {
    console.log('Login data:', data)
    // TODO: Implement login logic
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
    console.log('Register clicked')
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
        <LoginForm
          onSubmit={handleLogin}
          onForgotPassword={handleForgotPassword}
        />

        <SocialLoginSection
          onGithubLogin={handleGithubLogin}
          onGoogleLogin={handleGoogleLogin}
        />
      </div>
    </AuthTemplate>
  )
}
