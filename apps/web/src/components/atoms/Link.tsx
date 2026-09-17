import type { AnchorHTMLAttributes, ReactNode } from 'react'

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary'
}

export function Link({
  children,
  variant = 'primary',
  className = '',
  ...props
}: LinkProps) {
  const variantStyles = {
    primary: 'text-primary hover:text-primary-dark',
    secondary: 'text-text-primary underline underline-offset-2 hover:text-primary',
  }

  return (
    <a
      className={`cursor-pointer text-body-sm transition-colors ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </a>
  )
}
