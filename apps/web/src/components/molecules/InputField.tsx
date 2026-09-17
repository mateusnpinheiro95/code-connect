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
      <div className="w-full">
        <label htmlFor={inputId} className="mb-2 block text-lg text-text-primary">
          {label}
        </label>
        <Input
          ref={ref}
          id={inputId}
          hasError={!!error}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-error">{error}</p>
        )}
      </div>
    )
  }
)

InputField.displayName = 'InputField'
