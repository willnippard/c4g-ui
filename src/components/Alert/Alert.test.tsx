import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Alert } from './Alert'

describe('Alert', () => {
  // --- Rendering ---
  it('renders without crashing with default props', () => {
    render(<Alert>Something happened</Alert>)
    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(screen.getByText('Something happened')).toBeInTheDocument()
  })

  it('renders children text', () => {
    render(<Alert variant="success">Operation completed</Alert>)
    expect(screen.getByText('Operation completed')).toBeInTheDocument()
  })

  it('renders all variant types without errors', () => {
    const variants = ['success', 'error', 'warning', 'info'] as const
    variants.forEach((variant) => {
      const { unmount } = render(
        <Alert variant={variant}>Alert message</Alert>,
      )
      expect(screen.getByRole('alert')).toBeInTheDocument()
      unmount()
    })
  })

  it('renders action button when action prop is provided', () => {
    render(
      <Alert action={{ label: 'Retry', onClick: () => {} }}>
        Something failed
      </Alert>,
    )
    expect(screen.getByText('Retry')).toBeInTheDocument()
  })

  it('does not render action button when action prop is omitted', () => {
    render(<Alert>No action here</Alert>)
    expect(screen.queryByText('Retry')).not.toBeInTheDocument()
  })

  it('renders dismiss button when onDismiss is provided', () => {
    render(<Alert onDismiss={() => {}}>Dismissable alert</Alert>)
    expect(screen.getByLabelText('Dismiss alert')).toBeInTheDocument()
  })

  it('does not render dismiss button when onDismiss is omitted', () => {
    render(<Alert>Non-dismissable</Alert>)
    expect(screen.queryByLabelText('Dismiss alert')).not.toBeInTheDocument()
  })

  // --- Accessibility ---
  it('has role="alert"', () => {
    render(<Alert>Accessible alert</Alert>)
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  it('renders variant icons with aria-hidden="true" SVG elements', () => {
    const { container } = render(<Alert variant="success">Success</Alert>)
    const svgs = container.querySelectorAll('svg[aria-hidden="true"]')
    expect(svgs.length).toBeGreaterThanOrEqual(1)
  })

  it('renders different icons per variant', () => {
    const variants = ['success', 'error', 'warning', 'info'] as const
    variants.forEach((variant) => {
      const { container, unmount } = render(
        <Alert variant={variant}>Alert</Alert>,
      )
      const svgs = container.querySelectorAll('svg[aria-hidden="true"]')
      expect(svgs.length).toBeGreaterThanOrEqual(1)
      unmount()
    })
  })

  it('dismiss button has aria-label', () => {
    render(<Alert onDismiss={() => {}}>Alert</Alert>)
    const dismissBtn = screen.getByLabelText('Dismiss alert')
    expect(dismissBtn).toBeInTheDocument()
  })

  // --- Interaction ---
  it('calls onDismiss when dismiss button is clicked', async () => {
    const user = userEvent.setup()
    const onDismiss = vi.fn()
    render(<Alert onDismiss={onDismiss}>Dismiss me</Alert>)
    await user.click(screen.getByLabelText('Dismiss alert'))
    expect(onDismiss).toHaveBeenCalledTimes(1)
  })

  it('calls action.onClick when action button is clicked', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(
      <Alert action={{ label: 'Undo', onClick }}>Action alert</Alert>,
    )
    await user.click(screen.getByText('Undo'))
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
