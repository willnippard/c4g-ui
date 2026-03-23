import { useState, useCallback } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { DataTable, type DataTableColumn, type SortDirection } from './DataTable'
import { Badge } from '../Badge'

interface Organization {
  id: string
  name: string
  subtitle: string
  status: 'active' | 'pending' | 'inactive'
  date: string
}

const basicColumns: DataTableColumn<Organization>[] = [
  { key: 'name', header: 'Organization' },
  { key: 'subtitle', header: 'Description', maxWidth: '200px' },
  { key: 'status', header: 'Status' },
  { key: 'date', header: 'Date', align: 'right' },
]

const sortableColumns: DataTableColumn<Organization>[] = [
  { key: 'name', header: 'Organization', sortable: true },
  { key: 'subtitle', header: 'Description', maxWidth: '200px' },
  { key: 'status', header: 'Status', sortable: true },
  { key: 'date', header: 'Date', align: 'right', sortable: true },
]

const richColumns: DataTableColumn<Organization>[] = [
  { key: 'name', header: 'Organization', sortable: true },
  { key: 'subtitle', header: 'Description', maxWidth: '200px' },
  {
    key: 'status',
    header: 'Status',
    sortable: true,
    render: (row) => {
      const variant = row.status === 'active' ? 'primary' : row.status === 'pending' ? 'accent' : 'muted'
      return <Badge variant={variant}>{row.status}</Badge>
    },
  },
  { key: 'date', header: 'Date', align: 'right', sortable: true },
]

const sampleData: Organization[] = [
  { id: '1', name: 'Green Earth Initiative', subtitle: 'Environmental conservation and education', status: 'active', date: '2025-12-01' },
  { id: '2', name: 'Code4Good Foundation', subtitle: 'Technology for social impact', status: 'active', date: '2025-11-15' },
  { id: '3', name: 'Community Harvest', subtitle: 'Local food bank and distribution', status: 'pending', date: '2025-10-20' },
  { id: '4', name: 'Youth Mentorship Network', subtitle: 'Connecting mentors with young people', status: 'active', date: '2025-09-05' },
  { id: '5', name: 'Open Shelter Project', subtitle: 'Housing assistance and advocacy', status: 'inactive', date: '2025-08-10' },
]

const meta: Meta<typeof DataTable<Organization>> = {
  title: 'Components/DataTable',
  component: DataTable,
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
}

export default meta
type Story = StoryObj<typeof DataTable<Organization>>

export const Default: Story = {
  args: {
    columns: basicColumns,
    data: sampleData,
    keyExtractor: (row) => row.id,
  },
}

export const Small: Story = {
  args: {
    columns: basicColumns,
    data: sampleData,
    keyExtractor: (row) => row.id,
    size: 'sm',
  },
}

export const Medium: Story = {
  args: {
    columns: basicColumns,
    data: sampleData,
    keyExtractor: (row) => row.id,
    size: 'md',
  },
}

export const Large: Story = {
  args: {
    columns: basicColumns,
    data: sampleData,
    keyExtractor: (row) => row.id,
    size: 'lg',
  },
}

export const Empty: Story = {
  args: {
    columns: basicColumns,
    data: [],
    keyExtractor: (row) => row.id,
  },
}

export const CustomRender: Story = {
  args: {
    columns: richColumns,
    data: sampleData,
    keyExtractor: (row) => row.id,
  },
}

export const ClientSideSort: Story = {
  args: {
    columns: sortableColumns,
    data: sampleData,
    keyExtractor: (row) => row.id,
  },
}

export const ClientSideSortWithCustomRender: Story = {
  args: {
    columns: richColumns,
    data: sampleData,
    keyExtractor: (row) => row.id,
  },
}

function ServerSideSortExample() {
  const [sortKey, setSortKey] = useState<string>('name')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')
  const [data, setData] = useState(sampleData)
  const [loading, setLoading] = useState(false)

  const handleSort = useCallback(
    (key: string, direction: SortDirection) => {
      setSortKey(key)
      setSortDirection(direction)
      setLoading(true)

      // Simulate an async server-side sort
      setTimeout(() => {
        const sorted = [...sampleData].sort((a, b) => {
          const aVal = (a as Record<string, unknown>)[key]
          const bVal = (b as Record<string, unknown>)[key]
          const cmp = String(aVal ?? '').localeCompare(String(bVal ?? ''))
          return direction === 'asc' ? cmp : -cmp
        })
        setData(sorted)
        setLoading(false)
      }, 500)
    },
    [],
  )

  return (
    <div>
      {loading && (
        <p className="text-on-surface-variant text-sm mb-2">Sorting...</p>
      )}
      <DataTable
        columns={sortableColumns}
        data={data}
        keyExtractor={(row) => row.id}
        sortKey={sortKey}
        sortDirection={sortDirection}
        onSort={handleSort}
      />
    </div>
  )
}

export const ServerSideSort: StoryObj = {
  render: () => <ServerSideSortExample />,
}
