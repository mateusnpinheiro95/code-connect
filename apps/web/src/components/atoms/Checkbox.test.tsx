import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Checkbox } from './Checkbox'

describe('Checkbox', () => {
  it('renders with label', () => {
    render(<Checkbox id="remember" label="Lembrar-me" />)
    expect(screen.getByLabelText('Lembrar-me')).toBeInTheDocument()
  })

  it('toggles checked state when clicked', async () => {
    const user = userEvent.setup()
    render(<Checkbox id="terms" label="Aceito" />)

    const checkbox = screen.getByLabelText('Aceito')
    expect(checkbox).not.toBeChecked()

    await user.click(checkbox)
    expect(checkbox).toBeChecked()
  })
})
