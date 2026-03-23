import { type HTMLAttributes, forwardRef, useMemo } from 'react'
import { cn } from '../../lib/utils'
import { Button } from '../Button'

export type PaginationSize = 'sm' | 'md' | 'lg'

export interface PaginationProps extends HTMLAttributes<HTMLElement> {
  totalPages: number
  currentPage: number
  onPageChange: (page: number) => void
  size?: PaginationSize
  /** Number of pages shown around the current page (default 1) */
  siblingCount?: number
}

function buildPageRange(
  totalPages: number,
  currentPage: number,
  siblingCount: number,
): (number | 'ellipsis-start' | 'ellipsis-end')[] {
  // Always show first, last, and siblings around current
  const range: Set<number> = new Set()

  range.add(1)
  range.add(totalPages)

  for (
    let i = Math.max(2, currentPage - siblingCount);
    i <= Math.min(totalPages - 1, currentPage + siblingCount);
    i++
  ) {
    range.add(i)
  }

  const sorted = Array.from(range).sort((a, b) => a - b)
  const result: (number | 'ellipsis-start' | 'ellipsis-end')[] = []

  for (let i = 0; i < sorted.length; i++) {
    const page = sorted[i]
    const prev = sorted[i - 1]

    if (prev !== undefined && page - prev > 1) {
      result.push(i <= sorted.length / 2 ? 'ellipsis-start' : 'ellipsis-end')
    }

    result.push(page)
  }

  return result
}

const sizeConfig: Record<PaginationSize, { gap: string; buttonSize: 'sm' | 'md' | 'lg'; iconSize: string }> = {
  sm: { gap: 'gap-1', buttonSize: 'sm', iconSize: 'h-3 w-3' },
  md: { gap: 'gap-1.5', buttonSize: 'md', iconSize: 'h-4 w-4' },
  lg: { gap: 'gap-2', buttonSize: 'lg', iconSize: 'h-5 w-5' },
}

const ChevronLeft = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
      clipRule="evenodd"
    />
  </svg>
)

const ChevronRight = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
      clipRule="evenodd"
    />
  </svg>
)

export const Pagination = forwardRef<HTMLElement, PaginationProps>(
  (
    {
      totalPages,
      currentPage,
      onPageChange,
      size = 'md',
      siblingCount = 1,
      className,
      ...props
    },
    ref,
  ) => {
    const config = sizeConfig[size]

    const pages = useMemo(
      () => buildPageRange(totalPages, currentPage, siblingCount),
      [totalPages, currentPage, siblingCount],
    )

    const isFirstPage = currentPage <= 1
    const isLastPage = currentPage >= totalPages

    return (
      <nav
        ref={ref}
        aria-label="Pagination"
        className={cn('inline-flex items-center', config.gap, className)}
        {...props}
      >
        <Button
          variant="secondary"
          size={config.buttonSize}
          disabled={isFirstPage}
          onClick={() => onPageChange(currentPage - 1)}
          aria-label="Go to previous page"
        >
          <ChevronLeft className={config.iconSize} />
        </Button>

        {pages.map((item) => {
          if (item === 'ellipsis-start' || item === 'ellipsis-end') {
            return (
              <span
                key={item}
                className="inline-flex items-center justify-center font-manrope text-on-surface-variant select-none"
                aria-hidden="true"
              >
                &hellip;
              </span>
            )
          }

          const isActive = item === currentPage

          return (
            <Button
              key={item}
              variant={isActive ? 'primary' : 'secondary'}
              size={config.buttonSize}
              onClick={() => onPageChange(item)}
              aria-label={`Go to page ${item}`}
              aria-current={isActive ? 'page' : undefined}
              className={cn(
                !isActive &&
                  'bg-surface-container-lowest text-on-surface hover:bg-surface-container-low',
              )}
            >
              {item}
            </Button>
          )
        })}

        <Button
          variant="secondary"
          size={config.buttonSize}
          disabled={isLastPage}
          onClick={() => onPageChange(currentPage + 1)}
          aria-label="Go to next page"
        >
          <ChevronRight className={config.iconSize} />
        </Button>
      </nav>
    )
  },
)

Pagination.displayName = 'Pagination'
