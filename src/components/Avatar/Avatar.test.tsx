import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { describe, it, expect } from 'vitest'
import { Avatar } from './Avatar'

describe('Avatar', () => {
  it('renders without crashing', () => {
    const { container } = render(<Avatar />)
    expect(container.firstElementChild).toBeInTheDocument()
  })

  it('renders with an image when src is provided', () => {
    const { container } = render(<Avatar src="/photo.jpg" alt="Jane Doe" />)
    const img = container.querySelector('img')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', '/photo.jpg')
  })

  it('displays initials when name is provided and no src', () => {
    render(<Avatar name="Jane Doe" />)
    expect(screen.getByText('JD')).toBeInTheDocument()
  })

  it('displays single initial for single-word name', () => {
    render(<Avatar name="Jane" />)
    expect(screen.getByText('J')).toBeInTheDocument()
  })

  it('displays fallback ? when no name or src', () => {
    render(<Avatar />)
    expect(screen.getByText('?')).toBeInTheDocument()
  })

  it('uses alt prop for aria-label', () => {
    render(<Avatar alt="User photo" />)
    expect(screen.getByRole('img')).toHaveAttribute('aria-label', 'User photo')
  })

  it('uses name for aria-label when alt is not provided', () => {
    render(<Avatar name="Jane Doe" />)
    expect(screen.getByRole('img')).toHaveAttribute('aria-label', 'Jane Doe')
  })

  it('applies size sm', () => {
    const { container } = render(<Avatar size="sm" name="A" />)
    expect(container.firstElementChild?.className).toContain('w-8')
  })

  it('applies size lg', () => {
    const { container } = render(<Avatar size="lg" name="A" />)
    expect(container.firstElementChild?.className).toContain('w-16')
  })

  it('applies square variant', () => {
    const { container } = render(<Avatar variant="square" size="md" name="A" />)
    expect(container.firstElementChild?.className).toContain('rounded-lg')
  })

  it('forwards className', () => {
    const { container } = render(<Avatar className="custom" />)
    expect(container.firstElementChild?.className).toContain('custom')
  })

  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<Avatar name="Jane Doe" />)
      expect(await axe(container)).toHaveNoViolations()
    })

    it('has no accessibility violations with image', async () => {
      const { container } = render(<Avatar src="/photo.jpg" alt="Jane Doe" />)
      expect(await axe(container)).toHaveNoViolations()
    })
  })
})
