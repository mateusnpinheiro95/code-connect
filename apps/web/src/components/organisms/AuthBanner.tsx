import { Logo } from '../atoms/Logo'

interface AuthBannerProps {
  imageSrc: string
  imageAlt?: string
}

export function AuthBanner({ imageSrc, imageAlt = 'Banner' }: AuthBannerProps) {
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-dark-card">
      <img
        src={imageSrc}
        alt={imageAlt}
        className="h-full w-full object-cover"
      />
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <Logo />
      </div>
    </div>
  )
}
