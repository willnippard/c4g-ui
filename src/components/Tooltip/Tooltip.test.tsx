import { render, screen, fireEvent, act } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { Tooltip } from './Tooltip'

describe('Tooltip', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders the trigger element', () => {
    render(
      <Tooltip content="Tip text">
        <button>Hover me</button>
      </Tooltip>,
    )
    expect(screen.getByText('Hover me')).toBeInTheDocument()
  })

  it('does not show tooltip by default', () => {
    render(
      <Tooltip content="Tip text">
        <button>Hover me</button>
      </Tooltip>,
    )
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
  })

  it('shows tooltip on mouse enter after delay', () => {
    render(
      <Tooltip content="Tip text" delay={200}>
        <button>Hover me</button>
      </Tooltip>,
    )
    fireEvent.mouseEnter(screen.getByText('Hover me'))
    act(() => {
      vi.advanceTimersByTime(200)
    })
    expect(screen.getByRole('tooltip')).toBeInTheDocument()
    expect(screen.getByText('Tip text')).toBeInTheDocument()
  })

  it('hides tooltip on mouse leave', () => {
    render(
      <Tooltip content="Tip text" delay={0}>
        <button>Hover me</button>
      </Tooltip>,
    )
    fireEvent.mouseEnter(screen.getByText('Hover me'))
    act(() => {
      vi.advanceTimersByTime(0)
    })
    expect(screen.getByRole('tooltip')).toBeInTheDocument()
    fireEvent.mouseLeave(screen.getByText('Hover me'))
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
  })

  it('shows tooltip on focus', () => {
    render(
      <Tooltip content="Tip text" delay={0}>
        <button>Focus me</button>
      </Tooltip>,
    )
    fireEvent.focus(screen.getByText('Focus me'))
    act(() => {
      vi.advanceTimersByTime(0)
    })
    expect(screen.getByRole('tooltip')).toBeInTheDocument()
  })

  it('hides tooltip on blur', () => {
    render(
      <Tooltip content="Tip text" delay={0}>
        <button>Focus me</button>
      </Tooltip>,
    )
    fireEvent.focus(screen.getByText('Focus me'))
    act(() => {
      vi.advanceTimersByTime(0)
    })
    fireEvent.blur(screen.getByText('Focus me'))
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
  })

  it('sets aria-describedby on trigger when visible', () => {
    render(
      <Tooltip content="Tip text" delay={0}>
        <button>Hover me</button>
      </Tooltip>,
    )
    fireEvent.mouseEnter(screen.getByText('Hover me'))
    act(() => {
      vi.advanceTimersByTime(0)
    })
    const tooltip = screen.getByRole('tooltip')
    const trigger = screen.getByText('Hover me')
    expect(trigger).toHaveAttribute('aria-describedby', tooltip.id)
  })

  describe('accessibility', () => {
    it('has no accessibility violations when tooltip is visible', async () => {
      vi.useRealTimers()
      const { container } = render(
        <Tooltip content="Tip text" delay={0}>
          <button>Hover me</button>
        </Tooltip>,
      )
      fireEvent.mouseEnter(screen.getByText('Hover me'))
      // Wait for the timeout with real timers
      await new Promise((r) => setTimeout(r, 10))
      expect(await axe(container)).toHaveNoViolations()
    })
  })
})
