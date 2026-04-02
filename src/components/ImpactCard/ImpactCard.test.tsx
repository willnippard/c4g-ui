import { render } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { describe, it, expect } from 'vitest'
import { ImpactCard } from './ImpactCard'

describe('ImpactCard accessibility', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(
      <ImpactCard label="Volunteers" stat="1,234" description="Active volunteers this quarter" />,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
