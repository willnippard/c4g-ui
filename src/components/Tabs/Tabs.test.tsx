import { render, screen, fireEvent } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { describe, it, expect, vi } from 'vitest'
import { Tabs } from './Tabs'

const defaultTabs = [
  { key: 'one', label: 'Tab One' },
  { key: 'two', label: 'Tab Two' },
  { key: 'three', label: 'Tab Three' },
]

describe('Tabs', () => {
  it('renders all tabs', () => {
    render(<Tabs tabs={defaultTabs} activeKey="one" onTabChange={() => {}} />)
    expect(screen.getByText('Tab One')).toBeInTheDocument()
    expect(screen.getByText('Tab Two')).toBeInTheDocument()
    expect(screen.getByText('Tab Three')).toBeInTheDocument()
  })

  it('marks the active tab with aria-selected', () => {
    render(<Tabs tabs={defaultTabs} activeKey="two" onTabChange={() => {}} />)
    expect(screen.getByText('Tab Two').closest('button')).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByText('Tab One').closest('button')).toHaveAttribute('aria-selected', 'false')
  })

  it('calls onTabChange when a tab is clicked', () => {
    const onChange = vi.fn()
    render(<Tabs tabs={defaultTabs} activeKey="one" onTabChange={onChange} />)
    fireEvent.click(screen.getByText('Tab Two'))
    expect(onChange).toHaveBeenCalledWith('two')
  })

  it('does not call onTabChange for disabled tabs', () => {
    const onChange = vi.fn()
    const tabs = [
      { key: 'one', label: 'Tab One' },
      { key: 'two', label: 'Tab Two', disabled: true },
    ]
    render(<Tabs tabs={tabs} activeKey="one" onTabChange={onChange} />)
    fireEvent.click(screen.getByText('Tab Two'))
    expect(onChange).not.toHaveBeenCalled()
  })

  it('renders a tablist role', () => {
    render(<Tabs tabs={defaultTabs} activeKey="one" onTabChange={() => {}} />)
    expect(screen.getByRole('tablist')).toBeInTheDocument()
  })

  it('renders children as tab panel', () => {
    render(
      <Tabs tabs={defaultTabs} activeKey="one" onTabChange={() => {}}>
        <p>Panel content</p>
      </Tabs>,
    )
    expect(screen.getByRole('tabpanel')).toBeInTheDocument()
    expect(screen.getByText('Panel content')).toBeInTheDocument()
  })

  it('supports keyboard navigation with ArrowRight', () => {
    const onChange = vi.fn()
    render(<Tabs tabs={defaultTabs} activeKey="one" onTabChange={onChange} />)
    const firstTab = screen.getByText('Tab One').closest('button')!
    fireEvent.keyDown(firstTab, { key: 'ArrowRight' })
    // Should focus the next tab
    expect(document.activeElement).toBe(screen.getByText('Tab Two').closest('button'))
  })

  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(
        <Tabs tabs={defaultTabs} activeKey="one" onTabChange={() => {}}>
          <p>Panel content</p>
        </Tabs>,
      )
      expect(await axe(container)).toHaveNoViolations()
    })
  })
})
