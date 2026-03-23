import type { Meta, StoryObj } from '@storybook/react'
import { Accordion, type AccordionItem } from './Accordion'

const sampleItems: AccordionItem[] = [
  {
    key: 'mission',
    title: 'What is Code4Good?',
    content:
      'Code4Good connects skilled developers with nonprofits to build technology solutions that drive social impact.',
  },
  {
    key: 'volunteer',
    title: 'How can I volunteer?',
    content:
      'Sign up on our platform, complete your profile, and browse available projects. You can contribute as little or as much time as you like.',
  },
  {
    key: 'nonprofits',
    title: 'How do nonprofits apply?',
    content:
      'Nonprofits can submit a project request through our intake form. Our team reviews each submission and matches it with available volunteers.',
  },
  {
    key: 'cost',
    title: 'Is there a cost?',
    content:
      'Code4Good is free for nonprofits. Our volunteer developers donate their time and expertise to build impactful solutions.',
  },
]

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A vertically stacked set of collapsible panels. Supports single or multiple open panels, keyboard navigation, and disabled items.',
      },
    },
  },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    multiple: { control: 'boolean' },
    defaultOpenKeys: { control: 'object' },
    items: { control: 'object' },
  },
}

export default meta
type Story = StoryObj<typeof Accordion>

export const Default: Story = {
  args: {
    items: sampleItems,
  },
  render: (args) => (
    <div className="max-w-lg">
      <Accordion {...args} />
    </div>
  ),
}

export const MultipleOpen: Story = {
  args: {
    items: sampleItems,
    multiple: true,
    defaultOpenKeys: ['mission', 'volunteer'],
  },
  render: (args) => (
    <div className="max-w-lg">
      <Accordion {...args} />
    </div>
  ),
}

export const DefaultOpen: Story = {
  args: {
    items: sampleItems,
    defaultOpenKeys: ['mission'],
  },
  render: (args) => (
    <div className="max-w-lg">
      <Accordion {...args} />
    </div>
  ),
}

export const Disabled: Story = {
  args: {
    items: sampleItems.map((item, i) =>
      i === 2 ? { ...item, disabled: true } : item,
    ),
    defaultOpenKeys: ['mission'],
  },
  render: (args) => (
    <div className="max-w-lg">
      <Accordion {...args} />
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="space-y-8 max-w-lg">
      <div>
        <p className="font-manrope text-on-surface-variant text-sm mb-2">
          Small
        </p>
        <Accordion
          size="sm"
          items={sampleItems.slice(0, 2)}
          defaultOpenKeys={['mission']}
        />
      </div>
      <div>
        <p className="font-manrope text-on-surface-variant text-sm mb-2">
          Medium (default)
        </p>
        <Accordion
          size="md"
          items={sampleItems.slice(0, 2)}
          defaultOpenKeys={['mission']}
        />
      </div>
      <div>
        <p className="font-manrope text-on-surface-variant text-sm mb-2">
          Large
        </p>
        <Accordion
          size="lg"
          items={sampleItems.slice(0, 2)}
          defaultOpenKeys={['mission']}
        />
      </div>
    </div>
  ),
}
