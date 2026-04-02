import { render } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { describe, it, expect } from 'vitest'
import { DataTable } from './DataTable'
import type { DataTableColumn } from './DataTable'

interface Row {
  id: string
  name: string
  role: string
}

const columns: DataTableColumn<Row>[] = [
  { key: 'name', header: 'Name' },
  { key: 'role', header: 'Role' },
]

const data: Row[] = [
  { id: '1', name: 'Alice', role: 'Engineer' },
  { id: '2', name: 'Bob', role: 'Designer' },
]

const keyExtractor = (row: Row) => row.id

describe('DataTable accessibility', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(
      <DataTable columns={columns} data={data} keyExtractor={keyExtractor} caption="Team members" />,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
