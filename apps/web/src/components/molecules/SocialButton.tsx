import type { ButtonHTMLAttributes } from 'react'

interface SocialButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  provider: 'github' | 'google'
  iconSrc: string
}

export function SocialButton({ provider, iconSrc, ...props }: SocialButtonProps) {
  const providerLabels = {
    github: 'Github',
    google: 'Gmail',
  }

  return (
    <button
      className="group flex flex-col items-center justify-center gap-1 rounded-button bg-transparent p-3 transition-colors hover:bg-dark-lighter/20"
      {...props}
    >
      <img
        src={iconSrc}
        alt={`${provider} logo`}
        width={32}
        height={32}
        className="h-8 w-8"
      />
      <span className="text-label text-text-primary transition-colors">
        {providerLabels[provider]}
      </span>
    </button>
  )
}
