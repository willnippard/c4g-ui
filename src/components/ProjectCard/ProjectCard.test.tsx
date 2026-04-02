import { render } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { describe, it, expect } from 'vitest'
import { ProjectCard } from './ProjectCard'

describe('ProjectCard accessibility', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(
      <ProjectCard title="Community Garden" description="A project to build community gardens in urban areas." />,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
