import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Link } from './Link'

describe('Link', () => {
  it('renders children', () => {
    render(<Link href="#cadastro">Crie seu cadastro!</Link>)
    expect(screen.getByRole('link', { name: /crie seu cadastro/i })).toBeInTheDocument()
  })

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()

    render(
      <Link href="#cadastro" onClick={handleClick}>
        Cadastro
      </Link>
    )

    await user.click(screen.getByRole('link'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
