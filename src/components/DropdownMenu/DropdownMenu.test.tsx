import { render, screen, fireEvent } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { describe, it, expect, vi } from 'vitest'
import { DropdownMenu } from './DropdownMenu'

const defaultItems = [
  { key: 'edit', label: 'Edit' },
  { key: 'delete', label: 'Delete', danger: true },
]

function renderDropdown(props = {}) {
  return render(
    <DropdownMenu
      trigger={<button>Actions</button>}
      items={defaultItems}
      {...props}
    />,
  )
}

describe('DropdownMenu', () => {
  it('renders the trigger', () => {
    renderDropdown()
    expect(screen.getByText('Actions')).toBeInTheDocument()
  })

  it('sets aria-haspopup on trigger', () => {
    renderDropdown()
    expect(screen.getByText('Actions')).toHaveAttribute('aria-haspopup', 'menu')
  })

  it('starts with menu closed (aria-expanded false)', () => {
    renderDropdown()
    expect(screen.getByText('Actions')).toHaveAttribute('aria-expanded', 'false')
  })

  it('opens menu on trigger click', () => {
    renderDropdown()
    fireEvent.click(screen.getByText('Actions'))
    expect(screen.getByText('Actions')).toHaveAttribute('aria-expanded', 'true')
  })

  it('renders menu items with menuitem role', () => {
    renderDropdown()
    const menuItems = screen.getAllByRole('menuitem')
    expect(menuItems.length).toBe(2)
  })

  it('calls onClick when menu item is clicked', () => {
    const onClick = vi.fn()
    const items = [{ key: 'edit', label: 'Edit', onClick }]
    render(
      <DropdownMenu trigger={<button>Actions</button>} items={items} />,
    )
    fireEvent.click(screen.getByText('Actions'))
    fireEvent.click(screen.getByText('Edit'))
    expect(onClick).toHaveBeenCalled()
  })

  it('renders dividers as separators', () => {
    const items = [
      { key: 'edit', label: 'Edit' },
      { key: 'div', label: '', divider: true },
      { key: 'delete', label: 'Delete' },
    ]
    render(
      <DropdownMenu trigger={<button>Actions</button>} items={items} />,
    )
    expect(screen.getByRole('separator')).toBeInTheDocument()
  })

  it('does not fire onClick for disabled items', () => {
    const onClick = vi.fn()
    const items = [{ key: 'edit', label: 'Edit', onClick, disabled: true }]
    render(
      <DropdownMenu trigger={<button>Actions</button>} items={items} />,
    )
    fireEvent.click(screen.getByText('Actions'))
    fireEvent.click(screen.getByText('Edit'))
    expect(onClick).not.toHaveBeenCalled()
  })

  it('has a menu role', () => {
    renderDropdown()
    expect(screen.getByRole('menu')).toBeInTheDocument()
  })

  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = renderDropdown()
      expect(await axe(container)).toHaveNoViolations()
    })
  })
})
