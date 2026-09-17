import { Logo } from '../atoms/Logo'

interface AuthBannerProps {
  imageSrc: string
  imageAlt?: string
  /** Intrinsic width of the banner asset (for CLS / LCP hints). */
  width?: number
  /** Intrinsic height of the banner asset (for CLS / LCP hints). */
  height?: number
}

function webpSrc(src: string): string | null {
  if (src.endsWith('.webp')) return null
  return src.replace(/\.(png|jpe?g)$/i, '.webp')
}

export function AuthBanner({
  imageSrc,
  imageAlt = 'Banner',
  width = 814,
  height = 1272,
}: AuthBannerProps) {
  const webp = webpSrc(imageSrc)

  return (
    <div className="relative h-full min-h-full w-full overflow-hidden bg-dark-card">
      <picture className="absolute inset-0 block h-full w-full">
        {webp ? <source srcSet={webp} type="image/webp" /> : null}
        <img
          src={imageSrc}
          alt={imageAlt}
          width={width}
          height={height}
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover object-center"
        />
      </picture>
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <Logo />
      </div>
    </div>
  )
}
