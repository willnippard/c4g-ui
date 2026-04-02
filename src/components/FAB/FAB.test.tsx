import { render } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { describe, it, expect } from 'vitest'
import { FAB } from './FAB'

describe('FAB accessibility', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<FAB aria-label="Add item" />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
