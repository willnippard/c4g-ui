import { render } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { describe, it, expect } from 'vitest'
import { Toast } from './ImpactToast'

describe('ImpactToast accessibility', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<Toast title="Success" description="Operation completed" />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
