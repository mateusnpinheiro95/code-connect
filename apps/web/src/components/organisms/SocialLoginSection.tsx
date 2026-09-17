import { Divider } from '../atoms/Divider'
import { SocialButton } from '../molecules/SocialButton'

interface SocialLoginSectionProps {
  onGithubLogin?: () => void
  onGoogleLogin?: () => void
}

export function SocialLoginSection({ onGithubLogin, onGoogleLogin }: SocialLoginSectionProps) {
  return (
    <div className="w-full space-y-2">
      <Divider text="ou entre com outras contas" />

      <div className="flex justify-center gap-6">
        <SocialButton
          provider="github"
          iconSrc="/Github.png"
          onClick={onGithubLogin}
        />
        <SocialButton
          provider="google"
          iconSrc="/Google.png"
          onClick={onGoogleLogin}
        />
      </div>
    </div>
  )
}
