import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { InputField } from './InputField'

describe('InputField', () => {
  it('renders label and input', () => {
    render(<InputField label="Email" />)
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('displays error message when error prop is provided', () => {
    render(<InputField label="Email" error="Email is required" />)
    expect(screen.getByText('Email is required')).toBeInTheDocument()
  })

  it('allows user input', async () => {
    const user = userEvent.setup()
    render(<InputField label="Username" />)
    
    const input = screen.getByRole('textbox')
    await user.type(input, 'john_doe')
    
    expect(input).toHaveValue('john_doe')
  })

  it('applies error styling to input when error exists', () => {
    render(<InputField label="Password" error="Too short" type="password" />)
    const input = screen.getByLabelText('Password')
    expect(input).toHaveClass('border-error')
  })
})
