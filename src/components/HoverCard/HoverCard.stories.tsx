import type { Meta, StoryObj } from '@storybook/react-vite'
import { HoverCard, HoverCardTrigger } from './HoverCard'

const meta: Meta<typeof HoverCard> = {
  title: 'Components/HoverCard',
  component: HoverCard,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A profile card that displays a user avatar, name, subtitle, status indicator, and action link. Pair with HoverCardTrigger to show on hover or focus.',
      },
    },
  },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
}

export default meta
type Story = StoryObj<typeof HoverCard>

const avatarUrl =
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face'

export const Small: Story = {
  args: {
    size: 'sm',
    name: 'Marcus Thorne',
    imageSrc: avatarUrl,
    subtitle: 'DOB: 12/05/1988',
    status: { label: 'No active incidents', variant: 'active' },
    actionLabel: 'View Profile',
    actionHref: '#',
  },
}

export const Medium: Story = {
  args: {
    size: 'md',
    name: 'Elena Rodriguez',
    imageSrc: avatarUrl,
    subtitle: 'DOB: 24/11/1992',
    status: { label: 'No active incidents', variant: 'active' },
    actionLabel: 'View Profile',
    actionHref: '#',
  },
}

export const Large: Story = {
  args: {
    size: 'lg',
    name: 'Elena Rodriguez',
    imageSrc: avatarUrl,
    subtitle: 'Date of Birth: 24/11/1992',
    status: {
      label: 'Clearance Active / No active incidents',
      variant: 'active',
    },
    actionLabel: 'Detailed Bio & Profile',
    actionHref: '#',
  },
}

export const WarningStatus: Story = {
  args: {
    size: 'md',
    name: 'Alex Rivera',
    imageSrc: avatarUrl,
    subtitle: 'DOB: 03/09/1995',
    status: { label: '1 pending review', variant: 'warning' },
    actionLabel: 'View Profile',
    actionHref: '#',
  },
}

export const ErrorStatus: Story = {
  args: {
    size: 'md',
    name: 'Jordan Chen',
    imageSrc: avatarUrl,
    subtitle: 'DOB: 17/02/1990',
    status: { label: '2 active incidents', variant: 'error' },
    actionLabel: 'View Profile',
    actionHref: '#',
  },
}

export const NoStatus: Story = {
  args: {
    size: 'sm',
    name: 'Sam Patel',
    imageSrc: avatarUrl,
    subtitle: 'Volunteer since 2023',
    actionLabel: 'View Profile',
    actionHref: '#',
  },
}

/* ─── HoverCardTrigger stories ──────────────────────────────── */

const triggerMeta: Meta<typeof HoverCardTrigger> = {
  title: 'Components/HoverCardTrigger',
  component: HoverCardTrigger,
}

export const InlineText: StoryObj<typeof HoverCardTrigger> = {
  render: () => (
    <p className="text-on-surface text-base max-w-2xl leading-relaxed">
      The latest volunteer report was submitted by{' '}
      <HoverCardTrigger
        card={
          <HoverCard
            size="sm"
            name="Elena Rodriguez"
            imageSrc={avatarUrl}
            subtitle="DOB: 24/11/1992"
            status={{ label: 'No active incidents', variant: 'active' }}
            actionLabel="View Profile"
            actionHref="#"
          />
        }
      >
        Elena Rodriguez
      </HoverCardTrigger>{' '}
      and reviewed by the programme lead. Hover or focus the name to see
      the identity card.
    </p>
  ),
  ...triggerMeta,
}

export const MultipleInline: StoryObj<typeof HoverCardTrigger> = {
  render: () => (
    <p className="text-on-surface text-base max-w-2xl leading-relaxed">
      Project mentors{' '}
      <HoverCardTrigger
        card={
          <HoverCard
            size="sm"
            name="Marcus Thorne"
            imageSrc={avatarUrl}
            subtitle="Lead Contributor"
            status={{ label: 'Active', variant: 'active' }}
            actionLabel="View Profile"
            actionHref="#"
          />
        }
      >
        Marcus Thorne
      </HoverCardTrigger>{' '}
      and{' '}
      <HoverCardTrigger
        card={
          <HoverCard
            size="sm"
            name="Alex Rivera"
            imageSrc={avatarUrl}
            subtitle="Senior Developer"
            status={{ label: '1 pending review', variant: 'warning' }}
            actionLabel="View Profile"
            actionHref="#"
          />
        }
      >
        Alex Rivera
      </HoverCardTrigger>{' '}
      will be leading the next sprint.
    </p>
  ),
  ...triggerMeta,
}
