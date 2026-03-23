import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { describe, it, expect } from 'vitest'
import { ProgressBar } from './ProgressBar'

describe('ProgressBar', () => {
  it('renders with progressbar role', () => {
    render(<ProgressBar value={50} />)
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })

  it('sets aria-valuenow to the value', () => {
    render(<ProgressBar value={75} />)
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '75')
  })

  it('sets aria-valuemin to 0', () => {
    render(<ProgressBar value={50} />)
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuemin', '0')
  })

  it('sets aria-valuemax to max prop', () => {
    render(<ProgressBar value={50} max={200} />)
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuemax', '200')
  })

  it('defaults aria-valuemax to 100', () => {
    render(<ProgressBar value={50} />)
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuemax', '100')
  })

  it('renders label when provided', () => {
    render(<ProgressBar value={50} label="Upload progress" />)
    expect(screen.getByText('Upload progress')).toBeInTheDocument()
  })

  it('uses label as aria-label', () => {
    render(<ProgressBar value={50} label="Upload" />)
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-label', 'Upload')
  })

  it('shows percentage when showValue is true', () => {
    render(<ProgressBar value={75} showValue />)
    expect(screen.getByText('75%')).toBeInTheDocument()
  })

  it('clamps percentage to 0-100', () => {
    render(<ProgressBar value={150} showValue />)
    expect(screen.getByText('100%')).toBeInTheDocument()
  })

  it('forwards className', () => {
    const { container } = render(<ProgressBar value={50} className="custom" />)
    expect(container.firstElementChild?.className).toContain('custom')
  })

  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<ProgressBar value={50} label="Progress" />)
      expect(await axe(container)).toHaveNoViolations()
    })

    it('has no accessibility violations with showValue', async () => {
      const { container } = render(
        <ProgressBar value={75} label="Upload" showValue />,
      )
      expect(await axe(container)).toHaveNoViolations()
    })
  })
})
