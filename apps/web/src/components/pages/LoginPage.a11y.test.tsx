import { describe, it } from 'vitest'
import { LoginPage } from './LoginPage'
import { expectNoA11yViolations } from '../../test/a11y'

describe('LoginPage accessibility (WCAG AA)', () => {
  it('has no automated accessibility violations', async () => {
    await expectNoA11yViolations(<LoginPage />)
  })
})
