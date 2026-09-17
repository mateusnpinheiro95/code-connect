import { forwardRef } from 'react'
import type { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ hasError, className = '', ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`w-full rounded border bg-dark-lighter px-4 py-2 text-[15px] text-dark-card transition-colors placeholder:text-dark-card/70 focus:outline-none focus:ring-2 focus:ring-primary/60 ${hasError ? 'border-error' : 'border-transparent'} ${className}`}
        {...props}
      />
    )
  }
)

Input.displayName = 'Input'
