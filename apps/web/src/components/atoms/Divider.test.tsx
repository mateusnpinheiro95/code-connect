import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Divider } from './Divider'

describe('Divider', () => {
  it('renders divider with text', () => {
    render(<Divider text="ou entre com outras contas" />)
    expect(screen.getByText('ou entre com outras contas')).toBeInTheDocument()
  })

  it('renders plain divider without text', () => {
    const { container } = render(<Divider />)
    expect(container.firstChild).toBeInTheDocument()
    expect(screen.queryByText(/./)).not.toBeInTheDocument()
  })
})
