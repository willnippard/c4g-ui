import { render } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { describe, it, expect } from 'vitest'
import { DataTableAdvanced } from './DataTableAdvanced'
import type { DataTableAdvancedColumn } from './DataTableAdvanced'

interface Row {
  id: string
  name: string
  status: string
}

const columns: DataTableAdvancedColumn<Row>[] = [
  { key: 'name', header: 'Name' },
  { key: 'status', header: 'Status', filterable: true },
]

const data: Row[] = [
  { id: '1', name: 'Project A', status: 'Active' },
  { id: '2', name: 'Project B', status: 'Completed' },
]

const keyExtractor = (row: Row) => row.id

describe('DataTableAdvanced accessibility', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(
      <DataTableAdvanced columns={columns} data={data} keyExtractor={keyExtractor} caption="Projects" />,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
