import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { describe, it, expect, vi } from 'vitest'
import { Textarea } from './Textarea'

describe('Textarea', () => {
  // --- Rendering ---
  it('renders a textarea element', () => {
    render(<Textarea />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('renders label when provided', () => {
    render(<Textarea label="Description" />)
    expect(screen.getByText('Description')).toBeInTheDocument()
  })

  it('renders placeholder', () => {
    render(<Textarea placeholder="Enter text..." />)
    expect(screen.getByPlaceholderText('Enter text...')).toBeInTheDocument()
  })

  it('accepts user input', async () => {
    const user = userEvent.setup()
    render(<Textarea label="Notes" />)
    const textarea = screen.getByRole('textbox')
    await user.type(textarea, 'Hello world')
    expect(textarea).toHaveValue('Hello world')
  })

  // --- Label association ---
  it('associates label with textarea via htmlFor', () => {
    render(<Textarea label="Bio" />)
    const textarea = screen.getByRole('textbox')
    const label = screen.getByText('Bio')
    expect(label).toHaveAttribute('for', textarea.id)
  })

  it('uses custom id when provided', () => {
    render(<Textarea label="Bio" id="bio-field" />)
    expect(screen.getByRole('textbox')).toHaveAttribute('id', 'bio-field')
  })

  // --- Error state ---
  it('renders error message', () => {
    render(<Textarea label="Bio" error="Too short" />)
    expect(screen.getByText('Too short')).toBeInTheDocument()
  })

  it('error message has role=alert', () => {
    render(<Textarea label="Bio" error="Too short" />)
    expect(screen.getByRole('alert')).toHaveTextContent('Too short')
  })

  it('sets aria-invalid when error is present', () => {
    render(<Textarea label="Bio" error="Required" />)
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true')
  })

  it('links error to textarea via aria-describedby', () => {
    render(<Textarea label="Bio" error="Too short" />)
    const textarea = screen.getByRole('textbox')
    const describedBy = textarea.getAttribute('aria-describedby')!
    expect(document.getElementById(describedBy)).toHaveTextContent('Too short')
  })

  // --- Helper text ---
  it('renders helper text when no error', () => {
    render(<Textarea label="Bio" helperText="Max 200 characters" />)
    expect(screen.getByText('Max 200 characters')).toBeInTheDocument()
  })

  it('hides helper text when error is present', () => {
    render(<Textarea label="Bio" helperText="Max 200 chars" error="Too short" />)
    expect(screen.queryByText('Max 200 chars')).not.toBeInTheDocument()
    expect(screen.getByText('Too short')).toBeInTheDocument()
  })

  it('links helper text to textarea via aria-describedby', () => {
    render(<Textarea label="Bio" helperText="Hint" />)
    const textarea = screen.getByRole('textbox')
    const describedBy = textarea.getAttribute('aria-describedby')!
    expect(document.getElementById(describedBy)).toHaveTextContent('Hint')
  })

  // --- Disabled ---
  it('is disabled when disabled prop is set', () => {
    render(<Textarea label="Bio" disabled />)
    expect(screen.getByRole('textbox')).toBeDisabled()
  })

  it('does not accept input when disabled', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Textarea label="Bio" disabled onChange={onChange} />)
    await user.type(screen.getByRole('textbox'), 'text')
    expect(onChange).not.toHaveBeenCalled()
  })

  // --- Custom className ---
  it('accepts custom className', () => {
    render(<Textarea label="Bio" className="my-textarea" />)
    const textarea = screen.getByRole('textbox')
    expect(textarea.className).toContain('my-textarea')
  })

  // --- Forwarded props ---
  it('forwards rows attribute', () => {
    render(<Textarea label="Bio" rows={5} />)
    expect(screen.getByRole('textbox')).toHaveAttribute('rows', '5')
  })
})

describe('Textarea accessibility', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<Textarea label="Accessible textarea" />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('has no accessibility violations with error', async () => {
    const { container } = render(
      <Textarea label="With error" error="This field is required" />,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('has no accessibility violations when disabled', async () => {
    const { container } = render(<Textarea label="Disabled" disabled />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('has no accessibility violations with helper text', async () => {
    const { container } = render(
      <Textarea label="With helper" helperText="Some helpful text" />,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
