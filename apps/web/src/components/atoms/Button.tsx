import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary'
  fullWidth?: boolean
}

export function Button({
  children,
  variant = 'primary',
  fullWidth = false,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center gap-2 rounded-button px-4 py-3 text-body font-semibold transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50'

  const variantStyles = {
    primary: 'bg-primary text-on-primary hover:bg-primary-dark',
    secondary:
      'border border-dark-lighter bg-dark-card text-text-primary hover:bg-dark-lighter/20',
  }

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
