import { render, screen, fireEvent } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { describe, it, expect, vi } from 'vitest'
import { Stepper } from './Stepper'

const defaultSteps = [
  { key: 'one', label: 'Step One' },
  { key: 'two', label: 'Step Two' },
  { key: 'three', label: 'Step Three' },
]

describe('Stepper', () => {
  it('renders all step labels', () => {
    render(<Stepper steps={defaultSteps} activeStep={0} />)
    expect(screen.getByText('Step One')).toBeInTheDocument()
    expect(screen.getByText('Step Two')).toBeInTheDocument()
    expect(screen.getByText('Step Three')).toBeInTheDocument()
  })

  it('renders as navigation with Progress label', () => {
    render(<Stepper steps={defaultSteps} activeStep={0} />)
    const nav = screen.getByRole('navigation')
    expect(nav).toHaveAttribute('aria-label', 'Progress')
  })

  it('marks active step with aria-current', () => {
    render(<Stepper steps={defaultSteps} activeStep={1} />)
    const step = screen.getByText('Step Two').closest('[aria-current]')
    expect(step).toHaveAttribute('aria-current', 'step')
  })

  it('renders step numbers', () => {
    render(<Stepper steps={defaultSteps} activeStep={0} />)
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
  })

  it('renders check icon for completed steps', () => {
    const { container } = render(
      <Stepper steps={defaultSteps} activeStep={2} />,
    )
    // Steps 0 and 1 are completed, should have check SVGs
    const svgs = container.querySelectorAll('svg')
    expect(svgs.length).toBeGreaterThanOrEqual(2)
  })

  it('renders step descriptions when provided', () => {
    const steps = [
      { key: 'one', label: 'Step One', description: 'First step desc' },
    ]
    render(<Stepper steps={steps} activeStep={0} />)
    expect(screen.getByText('First step desc')).toBeInTheDocument()
  })

  it('renders clickable buttons when onStepClick is provided', () => {
    const onClick = vi.fn()
    render(
      <Stepper steps={defaultSteps} activeStep={0} onStepClick={onClick} />,
    )
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBe(3)
    fireEvent.click(buttons[1])
    expect(onClick).toHaveBeenCalledWith(1)
  })

  it('does not render buttons when onStepClick is not provided', () => {
    render(<Stepper steps={defaultSteps} activeStep={0} />)
    expect(screen.queryAllByRole('button').length).toBe(0)
  })

  it('forwards className', () => {
    const { container } = render(
      <Stepper steps={defaultSteps} activeStep={0} className="custom" />,
    )
    expect(container.firstElementChild?.className).toContain('custom')
  })

  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(
        <Stepper steps={defaultSteps} activeStep={1} />,
      )
      expect(await axe(container)).toHaveNoViolations()
    })

    it('has no accessibility violations with clickable steps', async () => {
      const { container } = render(
        <Stepper steps={defaultSteps} activeStep={1} onStepClick={() => {}} />,
      )
      expect(await axe(container)).toHaveNoViolations()
    })
  })
})
