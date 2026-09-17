import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LoginForm } from './LoginForm'

describe('LoginForm', () => {
  it('renders all form fields', () => {
    render(<LoginForm onSubmit={vi.fn()} />)
    
    expect(screen.getByLabelText(/email ou usuário/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument()
    expect(screen.getByRole('checkbox', { name: /lembrar-me/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument()
  })

  it('submits form with correct data', async () => {
    const user = userEvent.setup()
    const handleSubmit = vi.fn()
    
    render(<LoginForm onSubmit={handleSubmit} />)
    
    await user.type(screen.getByLabelText(/email ou usuário/i), 'user@example.com')
    await user.type(screen.getByLabelText(/senha/i), 'password123')
    await user.click(screen.getByRole('checkbox', { name: /lembrar-me/i }))
    await user.click(screen.getByRole('button', { name: /login/i }))
    
    expect(handleSubmit).toHaveBeenCalledWith({
      email: 'user@example.com',
      password: 'password123',
      rememberMe: true,
    })
  })

  it('calls onForgotPassword when forgot password link is clicked', async () => {
    const user = userEvent.setup()
    const handleForgotPassword = vi.fn()
    
    render(<LoginForm onSubmit={vi.fn()} onForgotPassword={handleForgotPassword} />)
    
    await user.click(screen.getByText(/esqueci a senha/i))
    expect(handleForgotPassword).toHaveBeenCalledTimes(1)
  })

  it('prevents submission with empty fields due to required validation', async () => {
    const user = userEvent.setup()
    const handleSubmit = vi.fn()
    
    render(<LoginForm onSubmit={handleSubmit} />)
    
    await user.click(screen.getByRole('button', { name: /login/i }))
    
    // Form should not submit due to HTML5 validation
    expect(handleSubmit).not.toHaveBeenCalled()
  })
})
