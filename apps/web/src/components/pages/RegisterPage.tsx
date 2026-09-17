import { AuthTemplate } from '../templates/AuthTemplate'
import { RegisterForm } from '../organisms/RegisterForm'
import { SocialLoginSection } from '../organisms/SocialLoginSection'

interface RegisterPageProps {
  onNavigateToLogin?: () => void
}

export function RegisterPage({ onNavigateToLogin }: RegisterPageProps) {
  const handleRegister = (data: {
    name: string
    email: string
    password: string
    rememberMe: boolean
  }) => {
    console.log('Register data:', data)
    // TODO: Implement register logic
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
    console.log('Login clicked')
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
        <RegisterForm onSubmit={handleRegister} />

        <SocialLoginSection
          onGithubLogin={handleGithubLogin}
          onGoogleLogin={handleGoogleLogin}
        />
      </div>
    </AuthTemplate>
  )
}
