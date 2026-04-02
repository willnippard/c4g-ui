import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Pagination } from './Pagination'

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A page navigation component with previous/next buttons, numbered pages, and ellipsis for large page counts. Supports configurable sibling count and sm/md/lg sizes.',
      },
    },
  },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    siblingCount: { control: 'number' },
    totalPages: { control: 'number' },
    currentPage: { control: 'number' },
  },
}

export default meta
type Story = StoryObj<typeof Pagination>

const PaginationTemplate = (args: React.ComponentProps<typeof Pagination>) => {
  const [page, setPage] = useState(args.currentPage)
  return <Pagination {...args} currentPage={page} onPageChange={setPage} />
}

export const Default: Story = {
  render: (args) => <PaginationTemplate {...args} />,
  args: {
    totalPages: 20,
    currentPage: 6,
    siblingCount: 1,
  },
}

export const SmallPageCount: Story = {
  render: (args) => <PaginationTemplate {...args} />,
  args: {
    totalPages: 5,
    currentPage: 3,
    siblingCount: 1,
  },
}

export const LargePageCount: Story = {
  render: (args) => <PaginationTemplate {...args} />,
  args: {
    totalPages: 100,
    currentPage: 50,
    siblingCount: 2,
  },
}

const SizesDemo = () => {
  const [smPage, setSmPage] = useState(3)
  const [mdPage, setMdPage] = useState(3)
  const [lgPage, setLgPage] = useState(3)

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-on-surface mb-2 text-sm font-manrope">Small</p>
        <Pagination totalPages={10} currentPage={smPage} onPageChange={setSmPage} size="sm" />
      </div>
      <div>
        <p className="text-on-surface mb-2 text-sm font-manrope">Medium (default)</p>
        <Pagination totalPages={10} currentPage={mdPage} onPageChange={setMdPage} size="md" />
      </div>
      <div>
        <p className="text-on-surface mb-2 text-sm font-manrope">Large</p>
        <Pagination totalPages={10} currentPage={lgPage} onPageChange={setLgPage} size="lg" />
      </div>
    </div>
  )
}

export const Sizes: Story = {
  render: () => <SizesDemo />,
}
