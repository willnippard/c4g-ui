import type { Meta, StoryObj } from '@storybook/react-vite'
import { DataTableAdvanced, type DataTableAdvancedColumn } from './DataTableAdvanced'
import { Badge } from '../Badge'

interface Volunteer {
  id: string
  name: string
  role: string
  organization: string
  status: 'active' | 'on-leave' | 'alumni'
  hours: number
  joinDate: string
}

const sampleData: Volunteer[] = [
  { id: '1', name: 'Aisha Patel', role: 'Developer', organization: 'Green Earth Initiative', status: 'active', hours: 240, joinDate: '2024-01-10' },
  { id: '2', name: 'Marcus Chen', role: 'Designer', organization: 'Code4Good Foundation', status: 'active', hours: 185, joinDate: '2024-03-22' },
  { id: '3', name: 'Sofia Reyes', role: 'Project Lead', organization: 'Community Harvest', status: 'on-leave', hours: 320, joinDate: '2023-08-05' },
  { id: '4', name: 'James Okafor', role: 'Developer', organization: 'Youth Mentorship Network', status: 'active', hours: 150, joinDate: '2024-06-01' },
  { id: '5', name: 'Lin Wei', role: 'QA Engineer', organization: 'Open Shelter Project', status: 'alumni', hours: 95, joinDate: '2023-11-14' },
  { id: '6', name: 'Elena Vasquez', role: 'Designer', organization: 'Green Earth Initiative', status: 'active', hours: 210, joinDate: '2024-02-18' },
  { id: '7', name: 'David Kim', role: 'Developer', organization: 'Code4Good Foundation', status: 'on-leave', hours: 175, joinDate: '2024-04-30' },
  { id: '8', name: 'Fatima Al-Rashid', role: 'Project Lead', organization: 'Community Harvest', status: 'active', hours: 290, joinDate: '2023-09-12' },
  { id: '9', name: 'Carlos Mendez', role: 'Developer', organization: 'Youth Mentorship Network', status: 'alumni', hours: 60, joinDate: '2024-07-20' },
  { id: '10', name: 'Priya Sharma', role: 'QA Engineer', organization: 'Open Shelter Project', status: 'active', hours: 130, joinDate: '2024-05-15' },
  { id: '11', name: 'Thomas Wright', role: 'Designer', organization: 'Green Earth Initiative', status: 'active', hours: 200, joinDate: '2024-01-28' },
  { id: '12', name: 'Yuki Tanaka', role: 'Developer', organization: 'Code4Good Foundation', status: 'active', hours: 310, joinDate: '2023-07-09' },
]

const columns: DataTableAdvancedColumn<Volunteer>[] = [
  { key: 'name', header: 'Volunteer' },
  { key: 'role', header: 'Role', filterable: true },
  { key: 'organization', header: 'Organization', filterable: true, maxWidth: '200px' },
  {
    key: 'status',
    header: 'Status',
    filterable: true,
    filterValue: (row) => row.status,
    render: (row) => {
      const variant = row.status === 'active' ? 'primary' : row.status === 'on-leave' ? 'accent' : 'muted'
      return <Badge variant={variant}>{row.status}</Badge>
    },
  },
  { key: 'hours', header: 'Hours', align: 'right' },
  { key: 'joinDate', header: 'Joined', align: 'right' },
]

const meta: Meta = {
  title: 'Components/DataTableAdvanced',
  component: DataTableAdvanced as React.ComponentType,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'An enhanced data table with built-in search filtering and per-column filter dropdowns. Wraps DataTable with a toolbar for interactive data exploration.',
      },
    },
  },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    searchPlaceholder: { control: 'text' },
    caption: { control: 'text' },
  },
}

export default meta
type Story = StoryObj

export const Default: Story = {
  render: (args) => (
    <DataTableAdvanced<Volunteer>
      columns={columns}
      data={sampleData}
      keyExtractor={(row) => row.id}
      caption="Volunteer directory"
      {...args}
    />
  ),
}

export const Small: Story = {
  render: () => (
    <DataTableAdvanced<Volunteer>
      columns={columns}
      data={sampleData}
      keyExtractor={(row) => row.id}
      size="sm"
      caption="Volunteer directory"
    />
  ),
}

export const Large: Story = {
  render: () => (
    <DataTableAdvanced<Volunteer>
      columns={columns}
      data={sampleData}
      keyExtractor={(row) => row.id}
      size="lg"
      caption="Volunteer directory"
    />
  ),
}

export const EmptyData: Story = {
  render: () => (
    <DataTableAdvanced<Volunteer>
      columns={columns}
      data={[]}
      keyExtractor={(row) => row.id}
      caption="Volunteer directory"
      emptyState="No volunteers have been added yet."
    />
  ),
}

export const CustomSearchPlaceholder: Story = {
  render: () => (
    <DataTableAdvanced<Volunteer>
      columns={columns}
      data={sampleData}
      keyExtractor={(row) => row.id}
      searchPlaceholder="Find a volunteer..."
      caption="Volunteer directory"
    />
  ),
}
