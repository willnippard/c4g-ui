import type { Meta, StoryObj } from '@storybook/react'
import { Card, type CardProps } from './Card'

const exampleMedia: Record<string, CardProps['media']> = {
  sm: (
    <img
      src="https://picsum.photos/seed/c4g-circuit/400/160"
      alt="Circuit board close-up"
      className="w-full h-20 object-cover"
    />
  ),
  md: (
    <div className="h-[200px] relative overflow-hidden">
      <img
        src="https://picsum.photos/seed/c4g-forest/800/400"
        alt="Aerial view of a dense forest canopy"
        className="w-full h-full object-cover"
      />
      <div className="absolute top-4 left-4">
        <span className="bg-tertiary-container text-on-tertiary-container text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
          Impact
        </span>
      </div>
    </div>
  ),
  lg: (
    <img
      src="https://picsum.photos/seed/c4g-collab/1160/560"
      alt="Team collaborating around a laptop"
      className="w-full h-[280px] object-cover"
    />
  ),
}

const exampleFooter: Record<string, CardProps['footer']> = {
  sm: undefined,
  md: (
    <button className="text-primary font-bold text-sm underline underline-offset-4 decoration-2">
      Learn more
    </button>
  ),
  lg: (
    <button className="bg-primary text-on-primary px-8 py-4 rounded-xl text-lg font-bold shadow-lg">
      Take Action
    </button>
  ),
}

type CardStoryArgs = CardProps & {
  /** Toggle an example media area on/off */
  showMedia: boolean
  /** Toggle an example footer action on/off */
  showFooter: boolean
}

const meta: Meta<CardStoryArgs> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A flexible content container with optional media, header, and footer slots. Scales across three size presets for compact to full-width layouts.',
      },
    },
  },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    header: { control: 'text' },
    showMedia: {
      control: 'boolean',
      name: 'Show example media',
      table: { category: 'Examples' },
    },
    showFooter: {
      control: 'boolean',
      name: 'Show example footer',
      table: { category: 'Examples' },
    },
    media: { table: { disable: true } },
    footer: { table: { disable: true } },
  },
  render: ({ showMedia, showFooter, size = 'md', children, ...args }) => (
    <Card
      {...args}
      size={size}
      media={showMedia ? exampleMedia[size] : undefined}
      footer={showFooter ? exampleFooter[size] : undefined}
    >
      {children}
    </Card>
  ),
}

export default meta
type Story = StoryObj<CardStoryArgs>

// --- Basic variants ---

export const Default: Story = {
  args: {
    header: 'Card Title',
    children: 'This is the card body content.',
    showMedia: false,
    showFooter: false,
  },
}

// --- Size variants matching the reference design ---

export const Small: Story = {
  args: {
    size: 'sm',
    header: 'Local Tech Kit',
    children: 'Provisioning hardware for rural education centers.',
    showMedia: true,
    showFooter: false,
  },
  render: ({ showMedia, showFooter, size = 'sm', children, ...args }) => (
    <div className="w-[300px]">
      <Card
        {...args}
        size={size}
        media={showMedia ? exampleMedia[size] : undefined}
        footer={showFooter ? exampleFooter[size] : undefined}
      >
        {children}
      </Card>
    </div>
  ),
}

export const Medium: Story = {
  args: {
    size: 'md',
    header: 'Green Code Initiative',
    children:
      'Optimizing algorithm efficiency to reduce data center carbon footprints globally.',
    showMedia: true,
    showFooter: true,
  },
  render: ({ showMedia, showFooter, size = 'md', children, ...args }) => (
    <div className="w-[400px]">
      <Card
        {...args}
        size={size}
        media={showMedia ? exampleMedia[size] : undefined}
        footer={showFooter ? exampleFooter[size] : undefined}
      >
        {children}
      </Card>
    </div>
  ),
}

export const Large: Story = {
  args: {
    size: 'lg',
    header: 'Global Mentorship Network: Scaling Literacy',
    children:
      'Connecting 5,000+ developers with non-profits to build sustainable infrastructure.',
    showMedia: true,
    showFooter: true,
  },
  render: ({ showMedia, showFooter, size = 'lg', children, ...args }) => (
    <div className="w-[580px]">
      <Card
        {...args}
        size={size}
        media={showMedia ? exampleMedia[size] : undefined}
        footer={showFooter ? exampleFooter[size] : undefined}
      >
        {children}
      </Card>
    </div>
  ),
}

// --- Without media (text-only) ---

export const TextOnly: Story = {
  args: {
    header: 'Text-Only Card',
    children: 'Cards work without a media area for simple content containers.',
    showMedia: false,
    showFooter: true,
  },
}
