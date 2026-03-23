import type { Meta, StoryObj } from '@storybook/react'
import { DropdownMenu, type DropdownMenuItem } from './DropdownMenu'
import { Button } from '../Button'

const meta: Meta<typeof DropdownMenu> = {
  title: 'Components/DropdownMenu',
  component: DropdownMenu,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A trigger-activated dropdown menu with keyboard navigation, icon support, dividers, and danger item styling. Supports left/right alignment and sm/md/lg sizes.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof DropdownMenu>

const defaultItems: DropdownMenuItem[] = [
  { key: 'profile', label: 'Profile', onClick: () => console.log('Profile') },
  {
    key: 'settings',
    label: 'Settings',
    onClick: () => console.log('Settings'),
  },
  {
    key: 'help',
    label: 'Help & Support',
    onClick: () => console.log('Help'),
  },
]

export const Default: Story = {
  args: {
    trigger: <Button variant="secondary">Options</Button>,
    items: defaultItems,
  },
}

const EditIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
)

const CopyIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
  </svg>
)

const TrashIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
  </svg>
)

const ArchiveIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="21 8 21 21 3 21 3 8" />
    <rect x="1" y="3" width="22" height="5" />
    <line x1="10" y1="12" x2="14" y2="12" />
  </svg>
)

export const WithIcons: Story = {
  args: {
    trigger: <Button variant="secondary">Actions</Button>,
    items: [
      {
        key: 'edit',
        label: 'Edit',
        icon: <EditIcon />,
        onClick: () => console.log('Edit'),
      },
      {
        key: 'copy',
        label: 'Duplicate',
        icon: <CopyIcon />,
        onClick: () => console.log('Duplicate'),
      },
      {
        key: 'archive',
        label: 'Archive',
        icon: <ArchiveIcon />,
        onClick: () => console.log('Archive'),
      },
    ],
  },
}

export const WithDanger: Story = {
  args: {
    trigger: <Button variant="secondary">Manage</Button>,
    items: [
      {
        key: 'edit',
        label: 'Edit Project',
        icon: <EditIcon />,
        onClick: () => console.log('Edit'),
      },
      {
        key: 'archive',
        label: 'Archive',
        icon: <ArchiveIcon />,
        onClick: () => console.log('Archive'),
        disabled: true,
      },
      { key: 'div1', label: '', divider: true },
      {
        key: 'delete',
        label: 'Delete Project',
        icon: <TrashIcon />,
        onClick: () => console.log('Delete'),
        danger: true,
      },
    ],
  },
}

export const RightAligned: Story = {
  args: {
    trigger: <Button variant="secondary">Right Menu</Button>,
    items: defaultItems,
    align: 'right',
  },
  decorators: [
    (Story) => (
      <div className="flex justify-end w-[400px]">
        <Story />
      </div>
    ),
  ],
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-start gap-8">
      <DropdownMenu
        trigger={<Button variant="secondary" size="sm">Small</Button>}
        items={defaultItems}
        size="sm"
      />
      <DropdownMenu
        trigger={<Button variant="secondary" size="md">Medium</Button>}
        items={defaultItems}
        size="md"
      />
      <DropdownMenu
        trigger={<Button variant="secondary" size="lg">Large</Button>}
        items={defaultItems}
        size="lg"
      />
    </div>
  ),
}
