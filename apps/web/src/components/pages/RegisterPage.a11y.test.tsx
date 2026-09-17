import { describe, it } from 'vitest'
import { RegisterPage } from './RegisterPage'
import { expectNoA11yViolations } from '../../test/a11y'

describe('RegisterPage accessibility (WCAG AA)', () => {
  it('has no automated accessibility violations', async () => {
    await expectNoA11yViolations(<RegisterPage />)
  })
})
