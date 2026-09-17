import type { ReactNode } from 'react'
import { AuthBanner } from '../organisms/AuthBanner'
import { Link } from '../atoms/Link'

interface AuthTemplateProps {
  bannerImage: string
  bannerAlt?: string
  title: string
  subtitle: string
  children: ReactNode
  footerText: string
  footerLinkText: string
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

export function AuthTemplate({
  bannerImage,
  bannerAlt,
  title,
  subtitle,
  children,
  footerText,
  footerLinkText,
  onFooterLinkClick,
}: AuthTemplateProps) {
  return (
    <div className="relative flex min-h-svh w-full items-center justify-center overflow-hidden bg-dark p-4 sm:p-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180' viewBox='0 0 28 28' fill='none'%3E%3Cpath d='M11.5 8.5C9.5 6.5 6.4 6.5 4.4 8.5C2.4 10.5 2.4 13.6 4.4 15.6L8.2 19.4C10.2 21.4 13.3 21.4 15.3 19.4' stroke='%238B949E' stroke-width='1.6' stroke-linecap='round'/%3E%3Cpath d='M16.5 19.5C18.5 21.5 21.6 21.5 23.6 19.5C25.6 17.5 25.6 14.4 23.6 12.4L19.8 8.6C17.8 6.6 14.7 6.6 12.7 8.6' stroke='%238B949E' stroke-width='1.6' stroke-linecap='round'/%3E%3C/svg%3E")`,
          backgroundSize: '180px 180px',
        }}
      />

      <div className="relative z-10 flex w-full max-w-5xl overflow-hidden rounded-[32px] bg-dark-card shadow-2xl">
        <div className="hidden md:flex md:w-[407px] md:shrink-0 md:self-stretch">
          <AuthBanner imageSrc={bannerImage} imageAlt={bannerAlt} />
        </div>

        <div className="flex w-full flex-col items-center gap-6 px-8 py-10 sm:px-10 md:flex-1 md:px-12 md:py-14">
          <div className="flex w-full max-w-[318px] flex-col items-center gap-8">
            <div className="flex w-full flex-col gap-6">
              <h1 className="text-[31px] font-semibold leading-[1.5] text-text-primary">
                {title}
              </h1>
              <p className="text-[22px] font-normal leading-[1.5] text-text-primary">
                {subtitle}
              </p>
            </div>

            <div className="flex w-full flex-col gap-8">{children}</div>
          </div>

          <div className="flex w-full max-w-[318px] flex-col items-center gap-2 text-center">
            <p className="w-full text-[15px] leading-[1.5] text-text-primary">{footerText}</p>
            <Link
              variant="primary"
              href="#cadastro"
              onClick={(event) => {
                event.preventDefault()
                onFooterLinkClick?.()
              }}
              className="inline-flex items-center justify-center gap-3 text-lg font-normal leading-[1.5]"
            >
              {footerLinkText}
              <RegisterIcon />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
