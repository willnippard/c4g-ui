import type { Meta, StoryObj } from '@storybook/react'
import { Toast } from './ImpactToast'

const meta: Meta<typeof Toast> = {
  title: 'Components/Toast',
  component: Toast,
  argTypes: {
    variant: { control: 'select', options: ['success', 'error', 'warning', 'info', 'impact'] },
    size: { control: 'select', options: ['compact', 'spacious', 'zoomed'] },
    title: { control: 'text' },
    description: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof Toast>

export const Success: Story = {
  args: {
    variant: 'success',
    title: 'Changes saved',
    description: 'Your profile has been updated successfully.',
  },
}

export const Error: Story = {
  args: {
    variant: 'error',
    title: 'Something went wrong',
    description: 'Unable to save changes. Please try again.',
  },
}

export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'Approaching limit',
    description: 'You have used 90% of your storage quota.',
  },
}

export const Info: Story = {
  args: {
    variant: 'info',
    title: 'Scheduled maintenance',
    description: 'The system will be briefly unavailable on Sunday at 2 AM.',
  },
}

export const Impact: Story = {
  args: {
    variant: 'impact',
    title: 'Action Successful',
    description: 'The contribution has been added to the public ledger. Thank you for your impact.',
  },
}

export const WithDismiss: Story = {
  args: {
    variant: 'success',
    title: 'File uploaded',
    description: 'report-q4.pdf was uploaded successfully.',
    onDismiss: () => {},
  },
}

export const TitleOnly: Story = {
  args: {
    variant: 'info',
    title: 'Copied to clipboard',
  },
}

export const Compact: Story = {
  args: {
    variant: 'success',
    size: 'compact',
    title: 'Changes saved',
    description: 'Your profile has been updated successfully.',
    onDismiss: () => {},
  },
}

export const Spacious: Story = {
  args: {
    variant: 'success',
    size: 'spacious',
    title: 'Changes saved',
    description: 'Your profile has been updated successfully.',
    onDismiss: () => {},
  },
}

export const Zoomed: Story = {
  args: {
    variant: 'success',
    size: 'zoomed',
    title: 'Changes saved',
    description: 'Your profile has been updated successfully.',
    onDismiss: () => {},
  },
}
