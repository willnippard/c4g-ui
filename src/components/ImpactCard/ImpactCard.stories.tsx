import type { Meta, StoryObj } from '@storybook/react'
import { ImpactCard } from './ImpactCard'

const meta: Meta<typeof ImpactCard> = {
  title: 'Components/ImpactCard',
  component: ImpactCard,
  argTypes: {
    size: { control: 'select', options: ['compact', 'spacious', 'zoomed'] },
  },
}

export default meta
type Story = StoryObj<typeof ImpactCard>

export const Default: Story = {
  args: {
    label: 'Annual Impact Report',
    stat: '1.2M+',
    description: 'Lines of code contributed to nonprofit projects worldwide',
    progress: 75,
    progressLabel: '75% of Target',
  },
}

export const WithProgress: Story = {
  args: {
    label: 'Community Growth',
    stat: '5,400+',
    description: 'Active volunteers contributing across 30 countries',
    progress: 90,
    progressLabel: '90% of Target',
  },
}

export const NoProgress: Story = {
  args: {
    label: 'Projects Completed',
    stat: '340',
    description: 'Open-source projects delivered for nonprofit organizations',
  },
}

export const CustomStat: Story = {
  args: {
    label: 'Hours Donated',
    stat: '$2.4M',
    description: 'Equivalent value of volunteer development hours',
    progress: 60,
    progressLabel: '60% of Annual Goal',
  },
}

export const Compact: Story = {
  args: {
    size: 'compact',
    label: 'Weekly Summary',
    stat: '128',
    description: 'Pull requests merged this week across all projects',
    progress: 85,
    progressLabel: '85% of Sprint',
  },
}

export const Spacious: Story = {
  args: {
    size: 'spacious',
    label: 'Annual Impact Report',
    stat: '1.2M+',
    description: 'Lines of code contributed to nonprofit projects worldwide',
    progress: 75,
    progressLabel: '75% of Target',
  },
}

export const Zoomed: Story = {
  args: {
    size: 'zoomed',
    label: 'Total Reach',
    stat: '2.8M',
    description: 'People positively impacted by Code4Good projects globally',
    progress: 92,
    progressLabel: '92% of Goal',
  },
}
