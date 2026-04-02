import type { Meta, StoryObj } from '@storybook/react-vite'
import { Breadcrumbs } from './Breadcrumbs'

const HomeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="h-full w-full"
  >
    <path
      fillRule="evenodd"
      d="M9.293 2.293a1 1 0 0 1 1.414 0l7 7A1 1 0 0 1 17 11h-1v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6H3a1 1 0 0 1-.707-1.707l7-7Z"
      clipRule="evenodd"
    />
  </svg>
)

const FolderIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="h-full w-full"
  >
    <path d="M3.75 3A1.75 1.75 0 0 0 2 4.75v3.26a3.235 3.235 0 0 1 1.75-.51h12.5c.644 0 1.245.188 1.75.51V6.75A1.75 1.75 0 0 0 16.25 5h-4.836a.25.25 0 0 1-.177-.073L9.823 3.513A1.75 1.75 0 0 0 8.586 3H3.75ZM3.75 9A1.75 1.75 0 0 0 2 10.75v4.5c0 .966.784 1.75 1.75 1.75h12.5A1.75 1.75 0 0 0 18 15.25v-4.5A1.75 1.75 0 0 0 16.25 9H3.75Z" />
  </svg>
)

const meta: Meta<typeof Breadcrumbs> = {
  title: 'Components/Breadcrumbs',
  component: Breadcrumbs,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A navigational breadcrumb trail showing the current page location within a hierarchy. Supports custom separators, icons, and three size presets.',
      },
    },
  },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    items: { control: 'object' },
  },
}

export default meta
type Story = StoryObj<typeof Breadcrumbs>

export const Default: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Projects', href: '/projects' },
      { label: 'Current Project' },
    ],
  },
}

export const WithIcons: Story = {
  args: {
    items: [
      { label: 'Home', href: '/', icon: <HomeIcon /> },
      { label: 'Projects', href: '/projects', icon: <FolderIcon /> },
      { label: 'Current Project' },
    ],
  },
}

export const CustomSeparator: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Projects', href: '/projects' },
      { label: 'Current Project' },
    ],
    separator: <span>/</span>,
  },
}

export const LongTrail: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Projects', href: '/projects' },
      { label: 'Organization', href: '/projects/org' },
      { label: 'Team', href: '/projects/org/team' },
      { label: 'Sprint', href: '/projects/org/team/sprint' },
      { label: 'Current Task' },
    ],
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-on-surface-variant text-xs mb-2 font-manrope">Small</p>
        <Breadcrumbs
          size="sm"
          items={[
            { label: 'Home', href: '/' },
            { label: 'Projects', href: '/projects' },
            { label: 'Current' },
          ]}
        />
      </div>
      <div>
        <p className="text-on-surface-variant text-xs mb-2 font-manrope">Medium (default)</p>
        <Breadcrumbs
          size="md"
          items={[
            { label: 'Home', href: '/' },
            { label: 'Projects', href: '/projects' },
            { label: 'Current' },
          ]}
        />
      </div>
      <div>
        <p className="text-on-surface-variant text-xs mb-2 font-manrope">Large</p>
        <Breadcrumbs
          size="lg"
          items={[
            { label: 'Home', href: '/' },
            { label: 'Projects', href: '/projects' },
            { label: 'Current' },
          ]}
        />
      </div>
    </div>
  ),
}
