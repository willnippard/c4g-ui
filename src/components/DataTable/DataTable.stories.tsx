import type { Meta, StoryObj } from '@storybook/react'
import { DataTable, type DataTableColumn } from './DataTable'
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
  { key: 'subtitle', header: 'Description' },
  { key: 'status', header: 'Status' },
  { key: 'date', header: 'Date', align: 'right' },
]

const richColumns: DataTableColumn<Organization>[] = [
  { key: 'name', header: 'Organization' },
  { key: 'subtitle', header: 'Description' },
  {
    key: 'status',
    header: 'Status',
    render: (row) => {
      const variant = row.status === 'active' ? 'primary' : row.status === 'pending' ? 'accent' : 'muted'
      return <Badge variant={variant}>{row.status}</Badge>
    },
  },
  { key: 'date', header: 'Date', align: 'right' },
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
    size: { control: 'select', options: ['compact', 'spacious', 'zoomed'] },
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

export const Compact: Story = {
  args: {
    columns: basicColumns,
    data: sampleData,
    keyExtractor: (row) => row.id,
    size: 'compact',
  },
}

export const Spacious: Story = {
  args: {
    columns: basicColumns,
    data: sampleData,
    keyExtractor: (row) => row.id,
    size: 'spacious',
  },
}

export const Zoomed: Story = {
  args: {
    columns: basicColumns,
    data: sampleData,
    keyExtractor: (row) => row.id,
    size: 'zoomed',
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
