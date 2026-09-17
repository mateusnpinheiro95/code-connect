import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Logo } from './Logo'

describe('Logo', () => {
  it('renders brand logo', () => {
    render(<Logo />)
    expect(screen.getByRole('img', { name: /code connect/i })).toBeInTheDocument()
  })
})
