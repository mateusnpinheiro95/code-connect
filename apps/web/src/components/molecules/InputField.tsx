import { forwardRef } from 'react'
import type { InputHTMLAttributes } from 'react'
import { Input } from '../atoms/Input'

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, error, id, ...props }, ref) => {
    const inputId = id || label.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="flex w-full flex-col gap-2">
        <label htmlFor={inputId} className="text-body text-text-primary">
          {label}
        </label>
        <Input
          ref={ref}
          id={inputId}
          hasError={!!error}
          {...props}
        />
        {error && (
          <p className="text-body-sm text-error">{error}</p>
        )}
      </div>
    )
  }
)

InputField.displayName = 'InputField'
