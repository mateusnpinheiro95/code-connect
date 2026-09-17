import { forwardRef } from 'react'
import type { InputHTMLAttributes } from 'react'
import { Checkbox } from '../atoms/Checkbox'
import { Link } from '../atoms/Link'

interface RememberMeCheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  onForgotPassword?: () => void
}

export const RememberMeCheckbox = forwardRef<HTMLInputElement, RememberMeCheckboxProps>(
  ({ onForgotPassword, ...props }, ref) => {
    return (
      <div className="flex w-full items-center justify-between gap-4">
        <Checkbox
          ref={ref}
          id="remember-me"
          label="Lembrar-me"
          {...props}
        />
        <Link
          variant="secondary"
          href="#esqueci-a-senha"
          onClick={(event) => {
            event.preventDefault()
            onForgotPassword?.()
          }}
        >
          Esqueci a senha
        </Link>
      </div>
    )
  }
)

RememberMeCheckbox.displayName = 'RememberMeCheckbox'
