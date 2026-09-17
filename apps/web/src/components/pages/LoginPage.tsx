import { AuthTemplate } from '../templates/AuthTemplate'
import { LoginForm } from '../organisms/LoginForm'
import { SocialLoginSection } from '../organisms/SocialLoginSection'

export function LoginPage() {
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
    // TODO: Navigate to register page
  }

  return (
    <AuthTemplate
      bannerImage="/banner_login.png"
      bannerAlt="Code Connect Login"
      title="Login"
      subtitle="Boas-vindas! Faça seu login."
      footerText="Ainda não tem conta?"
      footerLinkText="Crie seu cadastro!"
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
