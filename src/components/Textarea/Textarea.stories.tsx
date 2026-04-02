import type { Meta, StoryObj } from '@storybook/react-vite'
import { Textarea } from './Textarea'

const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A multi-line text input with label, helper text, and error state support. Uses auto-generated IDs for accessibility and comes in sm, md, and lg sizes.',
      },
    },
  },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    helperText: { control: 'text' },
    error: { control: 'text' },
    disabled: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof Textarea>

export const Default: Story = {
  args: {
    label: 'Message',
    placeholder: 'Type your message here...',
  },
}

export const WithLabel: Story = {
  args: {
    label: 'Description',
    placeholder: 'Enter a description...',
  },
}

export const WithError: Story = {
  args: {
    label: 'Bio',
    placeholder: 'Tell us about yourself...',
    value: 'Hi',
    error: 'Bio must be at least 20 characters.',
  },
}

export const WithHelperText: Story = {
  args: {
    label: 'Notes',
    placeholder: 'Add any additional notes...',
    helperText: 'Optional. Maximum 500 characters.',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Feedback',
    placeholder: 'Cannot edit',
    disabled: true,
  },
}

export const Small: Story = {
  args: {
    label: 'Comment',
    placeholder: 'Leave a comment...',
    size: 'sm',
  },
}

export const Medium: Story = {
  args: {
    label: 'Comment',
    placeholder: 'Leave a comment...',
    size: 'md',
  },
}

export const Large: Story = {
  args: {
    label: 'Comment',
    placeholder: 'Leave a comment...',
    size: 'lg',
  },
}
