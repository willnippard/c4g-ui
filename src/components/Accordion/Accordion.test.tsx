import { render, screen, fireEvent } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { describe, it, expect } from 'vitest'
import { Accordion } from './Accordion'

const defaultItems = [
  { key: 'one', title: 'Section One', content: 'Content one' },
  { key: 'two', title: 'Section Two', content: 'Content two' },
  { key: 'three', title: 'Section Three', content: 'Content three' },
]

describe('Accordion', () => {
  it('renders all item titles', () => {
    render(<Accordion items={defaultItems} />)
    expect(screen.getByText('Section One')).toBeInTheDocument()
    expect(screen.getByText('Section Two')).toBeInTheDocument()
    expect(screen.getByText('Section Three')).toBeInTheDocument()
  })

  it('all panels are collapsed by default', () => {
    render(<Accordion items={defaultItems} />)
    const buttons = screen.getAllByRole('button')
    buttons.forEach((btn) => {
      expect(btn).toHaveAttribute('aria-expanded', 'false')
    })
  })

  it('expands a panel on click', () => {
    render(<Accordion items={defaultItems} />)
    fireEvent.click(screen.getByText('Section One'))
    expect(screen.getByText('Section One').closest('button')).toHaveAttribute(
      'aria-expanded',
      'true',
    )
  })

  it('collapses a panel when clicked again', () => {
    render(<Accordion items={defaultItems} />)
    fireEvent.click(screen.getByText('Section One'))
    fireEvent.click(screen.getByText('Section One'))
    expect(screen.getByText('Section One').closest('button')).toHaveAttribute(
      'aria-expanded',
      'false',
    )
  })

  it('closes other panels when not in multiple mode', () => {
    render(<Accordion items={defaultItems} />)
    fireEvent.click(screen.getByText('Section One'))
    fireEvent.click(screen.getByText('Section Two'))
    expect(screen.getByText('Section One').closest('button')).toHaveAttribute(
      'aria-expanded',
      'false',
    )
    expect(screen.getByText('Section Two').closest('button')).toHaveAttribute(
      'aria-expanded',
      'true',
    )
  })

  it('allows multiple panels open when multiple=true', () => {
    render(<Accordion items={defaultItems} multiple />)
    fireEvent.click(screen.getByText('Section One'))
    fireEvent.click(screen.getByText('Section Two'))
    expect(screen.getByText('Section One').closest('button')).toHaveAttribute(
      'aria-expanded',
      'true',
    )
    expect(screen.getByText('Section Two').closest('button')).toHaveAttribute(
      'aria-expanded',
      'true',
    )
  })

  it('respects defaultOpenKeys', () => {
    render(<Accordion items={defaultItems} defaultOpenKeys={['two']} />)
    expect(screen.getByText('Section Two').closest('button')).toHaveAttribute(
      'aria-expanded',
      'true',
    )
  })

  it('does not toggle disabled items', () => {
    const items = [
      { key: 'one', title: 'Disabled', content: 'Content', disabled: true },
    ]
    render(<Accordion items={items} />)
    const btn = screen.getByText('Disabled').closest('button')!
    expect(btn).toBeDisabled()
  })

  it('renders region roles for panels', () => {
    render(<Accordion items={defaultItems} />)
    const regions = screen.getAllByRole('region')
    expect(regions.length).toBe(3)
  })

  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<Accordion items={defaultItems} />)
      expect(await axe(container)).toHaveNoViolations()
    })

    it('has no accessibility violations with expanded panel', async () => {
      const { container } = render(
        <Accordion items={defaultItems} defaultOpenKeys={['one']} />,
      )
      expect(await axe(container)).toHaveNoViolations()
    })
  })
})
