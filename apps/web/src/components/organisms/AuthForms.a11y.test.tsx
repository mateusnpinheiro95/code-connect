import { describe, it, vi } from 'vitest'
import { LoginForm } from './LoginForm'
import { RegisterForm } from './RegisterForm'
import { expectNoA11yViolations } from '../../test/a11y'
import { InputField } from '../molecules/InputField'

describe('Auth forms accessibility (WCAG AA)', () => {
  it('LoginForm has no automated accessibility violations', async () => {
    await expectNoA11yViolations(<LoginForm onSubmit={vi.fn()} />)
  })

  it('RegisterForm has no automated accessibility violations', async () => {
    await expectNoA11yViolations(<RegisterForm onSubmit={vi.fn()} />)
  })

  it('InputField with error has no automated accessibility violations', async () => {
    await expectNoA11yViolations(
      <InputField label="Email" error="Email inválido" defaultValue="x" />,
    )
  })
})
