import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RegisterForm } from './RegisterForm'

describe('RegisterForm', () => {
  it('renders all form fields', () => {
    render(<RegisterForm onSubmit={vi.fn()} />)

    expect(screen.getByLabelText(/^nome$/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/^email$/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument()
    expect(screen.getByRole('checkbox', { name: /lembrar-me/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /cadastrar/i })).toBeInTheDocument()
  })

  it('does not render forgot password link', () => {
    render(<RegisterForm onSubmit={vi.fn()} />)

    expect(screen.queryByText(/esqueci a senha/i)).not.toBeInTheDocument()
  })

  it('submits form with correct data', async () => {
    const user = userEvent.setup()
    const handleSubmit = vi.fn()

    render(<RegisterForm onSubmit={handleSubmit} />)

    await user.type(screen.getByLabelText(/^nome$/i), 'Maria Silva')
    await user.type(screen.getByLabelText(/^email$/i), 'maria@example.com')
    await user.type(screen.getByLabelText(/senha/i), 'password123')
    await user.click(screen.getByRole('checkbox', { name: /lembrar-me/i }))
    await user.click(screen.getByRole('button', { name: /cadastrar/i }))

    expect(handleSubmit).toHaveBeenCalledWith({
      name: 'Maria Silva',
      email: 'maria@example.com',
      password: 'password123',
      rememberMe: true,
    })
  })

  it('prevents submission with empty fields due to required validation', async () => {
    const user = userEvent.setup()
    const handleSubmit = vi.fn()

    render(<RegisterForm onSubmit={handleSubmit} />)

    await user.click(screen.getByRole('button', { name: /cadastrar/i }))

    expect(handleSubmit).not.toHaveBeenCalled()
  })
})
