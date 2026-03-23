import type { Meta, StoryObj } from '@storybook/react'
import { EmptyState } from './EmptyState'
import { Button } from '../Button/Button'
import { Card } from '../Card/Card'

const meta: Meta<typeof EmptyState> = {
  title: 'Components/EmptyState',
  component: EmptyState,
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    title: { control: 'text' },
    description: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof EmptyState>

export const Default: Story = {
  args: {
    title: 'No results found',
    description:
      'Try adjusting your search or filters to find what you are looking for.',
  },
}

export const WithAction: Story = {
  args: {
    title: 'No projects yet',
    description:
      'Create your first project to start making an impact with Code4Good.',
    action: <Button variant="primary">Create Project</Button>,
  },
}

export const CustomIcon: Story = {
  args: {
    title: 'Inbox zero',
    description: 'You have no unread notifications. Nice work!',
    icon: (
      <svg
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="h-full w-full"
      >
        <path
          d="M32 56c13.255 0 24-10.745 24-24S45.255 8 32 8 8 18.745 8 32s10.745 24 24 24z"
          className="stroke-on-surface-variant"
          strokeWidth="2"
        />
        <path
          d="M22 32l6 6 14-14"
          className="stroke-on-surface-variant"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
}

export const InCard: Story = {
  render: () => (
    <div className="w-[500px]">
      <Card header="Team Members">
        <EmptyState
          size="sm"
          title="No members yet"
          description="Invite collaborators to join your project."
          action={<Button size="sm">Invite Members</Button>}
        />
      </Card>
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="border border-outline-variant/20 rounded-lg">
        <EmptyState
          size="sm"
          title="Small empty state"
          description="Compact variant for inline sections."
        />
      </div>
      <div className="border border-outline-variant/20 rounded-xl">
        <EmptyState
          size="md"
          title="Medium empty state"
          description="Default size for page sections and content areas."
          action={<Button>Take Action</Button>}
        />
      </div>
      <div className="border border-outline-variant/20 rounded-2xl">
        <EmptyState
          size="lg"
          title="Large empty state"
          description="Full-page empty state for primary content areas."
          action={<Button size="lg">Get Started</Button>}
        />
      </div>
    </div>
  ),
}
