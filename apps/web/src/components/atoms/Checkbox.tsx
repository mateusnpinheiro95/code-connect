import { forwardRef } from 'react'
import type { InputHTMLAttributes } from 'react'

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, className = '', id, ...props }, ref) => {
    return (
      <div className="flex items-start gap-2">
        <span className="relative mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded border-2 border-dark-lighter">
          <input
            ref={ref}
            type="checkbox"
            id={id}
            className={`peer absolute inset-0 z-10 size-full cursor-pointer appearance-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${className}`}
            {...props}
          />
          <svg
            className="pointer-events-none size-4 text-text-primary opacity-0 peer-checked:opacity-100"
            viewBox="0 0 12 12"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M2.5 6.2L4.8 8.5L9.5 3.5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        {label && (
          <label htmlFor={id} className="cursor-pointer text-[15px] text-text-secondary">
            {label}
          </label>
        )}
      </div>
    )
  }
)

Checkbox.displayName = 'Checkbox'
