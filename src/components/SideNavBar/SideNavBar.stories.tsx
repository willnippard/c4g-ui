import type { Meta, StoryObj } from '@storybook/react'
import { SideNavBar } from './SideNavBar'

const meta: Meta<typeof SideNavBar> = {
  title: 'Components/SideNavBar',
  component: SideNavBar,
  argTypes: {
    title: { control: 'text' },
    subtitle: { control: 'text' },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
}

export default meta
type Story = StoryObj<typeof SideNavBar>

const CodeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
)

const sampleItems = [
  { label: 'Dashboard', href: '#dashboard', icon: '📊', active: true },
  { label: 'Open Tasks', href: '#tasks', icon: '📋' },
  { label: 'Mentors', href: '#mentors', icon: '👥' },
  { label: 'Donations', href: '#donations', icon: '💛' },
]

const sampleFooterLinks = [
  { label: 'Help', href: '#help', icon: '❓' },
  { label: 'Settings', href: '#settings', icon: '⚙️' },
]

export const Default: Story = {
  args: {
    brandIcon: <CodeIcon />,
    title: 'Code4Good',
    subtitle: 'Architect of Good',
    items: sampleItems,
    footerLinks: sampleFooterLinks,
  },
}

export const Small: Story = {
  args: {
    brandIcon: <CodeIcon />,
    title: 'Code4Good',
    subtitle: 'Architect of Good',
    items: sampleItems,
    footerLinks: sampleFooterLinks,
    size: 'sm',
  },
}

export const Medium: Story = {
  args: {
    brandIcon: <CodeIcon />,
    title: 'Code4Good',
    subtitle: 'Architect of Good',
    items: sampleItems,
    footerLinks: sampleFooterLinks,
    size: 'md',
  },
}

export const Large: Story = {
  args: {
    brandIcon: <CodeIcon />,
    title: 'Code4Good',
    subtitle: 'Architect of Good',
    items: sampleItems,
    footerLinks: sampleFooterLinks,
    size: 'lg',
  },
}

export const WithActiveItem: Story = {
  args: {
    brandIcon: <CodeIcon />,
    title: 'Code4Good',
    subtitle: 'Architect of Good',
    items: sampleItems.map((item) =>
      item.label === 'Open Tasks'
        ? { ...item, active: true }
        : { ...item, active: false },
    ),
    footerLinks: [
      { label: 'Settings', href: '#settings', icon: '⚙️' },
    ],
  },
}

export const WithFooterAction: Story = {
  args: {
    brandIcon: <CodeIcon />,
    title: 'Code4Good',
    subtitle: 'v1.0 Editorial Organicism',
    items: [
      { label: 'Dashboard', href: '#dashboard', icon: '🏠', active: true },
      { label: 'Analytics', href: '#analytics', icon: '📈' },
    ],
    footerLinks: [
      { label: 'Privacy', href: '#privacy', icon: '🔒' },
      { label: 'Sign Out', href: '#signout', icon: '🚪' },
    ],
    footerAction: {
      label: 'View Documentation',
      onClick: () => alert('Docs clicked'),
    },
  },
}

export const MinimalItems: Story = {
  args: {
    title: 'Minimal',
    items: [
      { label: 'Home', href: '#home' },
      { label: 'About', href: '#about', active: true },
    ],
  },
}
