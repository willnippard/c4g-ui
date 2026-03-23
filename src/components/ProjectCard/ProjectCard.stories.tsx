import type { Meta, StoryObj } from '@storybook/react'
import { ProjectCard } from './ProjectCard'

const meta: Meta<typeof ProjectCard> = {
  title: 'Components/ProjectCard',
  component: ProjectCard,
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    status: { control: 'text' },
    avatarCount: { control: 'number' },
  },
}

export default meta
type Story = StoryObj<typeof ProjectCard>

export const Default: Story = {
  args: {
    title: 'Amazon Reforest AI',
    description:
      'Using machine learning to identify optimal reforestation zones across the Amazon basin, helping local communities restore degraded land.',
  },
}

export const WithImage: Story = {
  args: {
    title: 'Amazon Reforest AI',
    description:
      'Using machine learning to identify optimal reforestation zones across the Amazon basin, helping local communities restore degraded land.',
    imageSrc: 'https://picsum.photos/seed/reforest/800/600',
    imageAlt: 'Aerial view of the Amazon rainforest',
  },
}

export const WithStatus: Story = {
  args: {
    title: 'Amazon Reforest AI',
    description:
      'Using machine learning to identify optimal reforestation zones across the Amazon basin, helping local communities restore degraded land.',
    imageSrc: 'https://picsum.photos/seed/reforest/800/600',
    imageAlt: 'Aerial view of the Amazon rainforest',
    status: 'Active',
  },
}

export const NoAvatars: Story = {
  args: {
    title: 'Ocean Cleanup Tracker',
    description:
      'A platform for tracking and coordinating ocean cleanup efforts across the Pacific.',
    imageSrc: 'https://picsum.photos/seed/ocean/800/600',
    imageAlt: 'Ocean waves',
    status: 'Planning',
    avatarCount: 0,
  },
}

export const WithDetailsHandler: Story = {
  args: {
    title: 'Community Garden Map',
    description:
      'Interactive mapping tool connecting volunteers with community garden projects in urban areas.',
    imageSrc: 'https://picsum.photos/seed/garden/800/600',
    imageAlt: 'Community garden',
    status: 'Active',
    avatarCount: 5,
    onDetailsClick: () => alert('Details clicked!'),
  },
}

export const Small: Story = {
  args: {
    size: 'sm',
    title: 'Water Quality Monitor',
    description:
      'IoT-based water quality monitoring for rural communities lacking clean water infrastructure.',
    imageSrc: 'https://picsum.photos/seed/water/800/600',
    imageAlt: 'Clean water stream',
    status: 'Active',
    avatarCount: 3,
    onDetailsClick: () => alert('Details clicked!'),
  },
}

export const Medium: Story = {
  args: {
    size: 'md',
    title: 'Amazon Reforest AI',
    description:
      'Using machine learning to identify optimal reforestation zones across the Amazon basin, helping local communities restore degraded land.',
    imageSrc: 'https://picsum.photos/seed/reforest/800/600',
    imageAlt: 'Aerial view of the Amazon rainforest',
    status: 'Active',
    avatarCount: 4,
    onDetailsClick: () => alert('Details clicked!'),
  },
}

export const Large: Story = {
  args: {
    size: 'lg',
    title: 'Literacy Bridge',
    description:
      'Digital literacy platform providing accessible learning materials for underserved schools across sub-Saharan Africa.',
    imageSrc: 'https://picsum.photos/seed/literacy/800/600',
    imageAlt: 'Students learning with tablets',
    status: 'In Progress',
    avatarCount: 6,
    onDetailsClick: () => alert('Details clicked!'),
  },
}
