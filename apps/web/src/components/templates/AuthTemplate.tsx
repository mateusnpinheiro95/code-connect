import type { ReactNode } from 'react'
import { AuthBanner } from '../organisms/AuthBanner'
import { Link } from '../atoms/Link'

interface AuthTemplateProps {
  bannerImage: string
  bannerAlt?: string
  bannerWidth?: number
  bannerHeight?: number
  title: string
  subtitle: string
  children: ReactNode
  footerText: string
  footerLinkText: string
  footerHref?: string
  footerIcon?: 'register' | 'login'
  /** Login: stacked centered; Cadastro: inline row (Figma). */
  footerLayout?: 'stack' | 'inline'
  onFooterLinkClick?: () => void
}

function RegisterIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="text-primary"
    >
      <path
        d="M7 3H14L18 7V21H7V3Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M14 3V7H18" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M10 12H15M10 16H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function LoginIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="text-primary"
    >
      <path
        d="M10 17L15 12L10 7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 12H3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M19 4H13C12.4477 4 12 4.44772 12 5V8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M12 16V19C12 19.5523 12.4477 20 13 20H19"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M19 4V20"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function AuthTemplate({
  bannerImage,
  bannerAlt,
  bannerWidth,
  bannerHeight,
  title,
  subtitle,
  children,
  footerText,
  footerLinkText,
  footerHref = '#cadastro',
  footerIcon = 'register',
  footerLayout = 'inline',
  onFooterLinkClick,
}: AuthTemplateProps) {
  const FooterIcon = footerIcon === 'login' ? LoginIcon : RegisterIcon
  const isStackFooter = footerLayout === 'stack'

  return (
    <div className="relative flex min-h-svh w-full items-center justify-center overflow-hidden bg-dark p-4 sm:p-6">
      <div
        aria-hidden="true"
        className="bg-auth-pattern pointer-events-none absolute inset-0 opacity-30"
      />

      <div className="relative z-10 flex w-full max-w-auth-card items-stretch justify-between overflow-hidden rounded-auth bg-dark-card px-6 py-8 shadow-2xl md:px-auth-card-x md:py-auth-card-y">
        <div className="relative hidden min-h-0 md:flex md:w-auth-banner md:shrink-0 md:self-stretch">
          <AuthBanner
            imageSrc={bannerImage}
            imageAlt={bannerAlt}
            width={bannerWidth}
            height={bannerHeight}
          />
        </div>

        <main className="flex w-full flex-col items-center md:w-auth-form-col md:shrink-0">
          <div className="flex w-full flex-col items-center gap-6 px-0 md:px-8">
            <div className="flex w-full max-w-auth-form flex-col gap-10">
              <div className="flex w-full flex-col gap-6">
                <h1 className="text-display font-semibold text-text-primary">{title}</h1>
                <p className="text-subtitle font-normal text-text-primary">{subtitle}</p>
              </div>

              <div className="flex w-full flex-col gap-8">{children}</div>
            </div>

            <div
              className={
                isStackFooter
                  ? 'flex w-full max-w-auth-form flex-col items-center gap-2'
                  : 'flex w-full max-w-auth-form flex-wrap items-center gap-2'
              }
            >
              <p
                className={
                  isStackFooter
                    ? 'text-center text-body-sm text-text-primary'
                    : 'text-body text-text-primary'
                }
              >
                {footerText}
              </p>
              <Link
                variant="primary"
                href={footerHref}
                onClick={(event) => {
                  event.preventDefault()
                  onFooterLinkClick?.()
                }}
                className={
                  isStackFooter
                    ? 'inline-flex items-center justify-center gap-3 text-body font-normal'
                    : 'inline-flex items-center gap-3 text-body font-normal'
                }
              >
                {footerLinkText}
                <FooterIcon />
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
