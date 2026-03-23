import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { describe, it, expect, vi } from 'vitest'
import { Checkbox } from './Checkbox'

describe('Checkbox', () => {
  // --- Rendering ---
  it('renders a checkbox input', () => {
    render(<Checkbox />)
    expect(screen.getByRole('checkbox')).toBeInTheDocument()
  })

  it('renders label when provided', () => {
    render(<Checkbox label="Accept terms" />)
    expect(screen.getByText('Accept terms')).toBeInTheDocument()
  })

  it('renders description when provided', () => {
    render(<Checkbox label="Option" description="Extra detail" />)
    expect(screen.getByText('Extra detail')).toBeInTheDocument()
  })

  // --- Checked / unchecked ---
  it('is unchecked by default', () => {
    render(<Checkbox label="Test" />)
    expect(screen.getByRole('checkbox')).not.toBeChecked()
  })

  it('can be checked via defaultChecked', () => {
    render(<Checkbox label="Test" defaultChecked />)
    expect(screen.getByRole('checkbox')).toBeChecked()
  })

  it('toggles when clicked', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Checkbox label="Toggle" onChange={onChange} />)
    await user.click(screen.getByRole('checkbox'))
    expect(onChange).toHaveBeenCalledTimes(1)
  })

  // --- Indeterminate ---
  it('sets indeterminate property on the input', () => {
    render(<Checkbox label="Partial" indeterminate />)
    const checkbox = screen.getByRole('checkbox') as HTMLInputElement
    expect(checkbox.indeterminate).toBe(true)
  })

  // --- Disabled ---
  it('is disabled when disabled prop is set', () => {
    render(<Checkbox label="Disabled" disabled />)
    expect(screen.getByRole('checkbox')).toBeDisabled()
  })

  it('does not fire onChange when disabled', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Checkbox label="Disabled" disabled onChange={onChange} />)
    await user.click(screen.getByRole('checkbox'))
    expect(onChange).not.toHaveBeenCalled()
  })

  // --- Error state ---
  it('renders error message', () => {
    render(<Checkbox label="Field" error="Required" />)
    expect(screen.getByText('Required')).toBeInTheDocument()
  })

  it('sets aria-invalid when error is present', () => {
    render(<Checkbox label="Field" error="Required" />)
    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-invalid', 'true')
  })

  it('error message has role=alert', () => {
    render(<Checkbox label="Field" error="Required" />)
    expect(screen.getByRole('alert')).toHaveTextContent('Required')
  })

  // --- Label association ---
  it('associates label with checkbox via htmlFor', () => {
    render(<Checkbox label="My checkbox" />)
    const checkbox = screen.getByRole('checkbox')
    const label = screen.getByText('My checkbox').closest('label')
    expect(label).toHaveAttribute('for', checkbox.id)
  })

  it('uses custom id when provided', () => {
    render(<Checkbox label="Custom" id="custom-id" />)
    expect(screen.getByRole('checkbox')).toHaveAttribute('id', 'custom-id')
  })

  it('links description via aria-describedby', () => {
    render(<Checkbox label="Opt" description="Help text" />)
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toHaveAttribute('aria-describedby')
    const descId = checkbox.getAttribute('aria-describedby')!
    expect(document.getElementById(descId)).toHaveTextContent('Help text')
  })

  // --- Custom className ---
  it('accepts custom className', () => {
    render(<Checkbox label="Styled" className="my-checkbox" />)
    const label = screen.getByText('Styled').closest('label')
    expect(label?.className).toContain('my-checkbox')
  })
})

describe('Checkbox accessibility', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<Checkbox label="Accessible checkbox" />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('has no accessibility violations when checked', async () => {
    const { container } = render(<Checkbox label="Checked" defaultChecked />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('has no accessibility violations with error', async () => {
    const { container } = render(
      <Checkbox label="With error" error="This field is required" />,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('has no accessibility violations when disabled', async () => {
    const { container } = render(<Checkbox label="Disabled" disabled />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
