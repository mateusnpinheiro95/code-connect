import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SocialLoginSection } from './SocialLoginSection'

describe('SocialLoginSection', () => {
  it('renders divider text', () => {
    render(<SocialLoginSection />)
    expect(screen.getByText(/ou entre com outras contas/i)).toBeInTheDocument()
  })

  it('renders GitHub and Google buttons', () => {
    render(<SocialLoginSection />)
    
    expect(screen.getByRole('button', { name: /github/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /gmail/i })).toBeInTheDocument()
  })

  it('calls onGithubLogin when GitHub button is clicked', async () => {
    const user = userEvent.setup()
    const handleGithubLogin = vi.fn()
    
    render(<SocialLoginSection onGithubLogin={handleGithubLogin} />)
    
    await user.click(screen.getByRole('button', { name: /github/i }))
    expect(handleGithubLogin).toHaveBeenCalledTimes(1)
  })

  it('calls onGoogleLogin when Google button is clicked', async () => {
    const user = userEvent.setup()
    const handleGoogleLogin = vi.fn()
    
    render(<SocialLoginSection onGoogleLogin={handleGoogleLogin} />)
    
    await user.click(screen.getByRole('button', { name: /gmail/i }))
    expect(handleGoogleLogin).toHaveBeenCalledTimes(1)
  })
})
