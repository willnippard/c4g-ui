import { type HTMLAttributes, type ReactNode, forwardRef } from 'react'
import { cn } from '../../lib/utils'

export interface BreadcrumbItem {
  label: string
  href?: string
  icon?: ReactNode
}

export type BreadcrumbsSize = 'sm' | 'md' | 'lg'

export interface BreadcrumbsProps extends HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[]
  separator?: ReactNode
  size?: BreadcrumbsSize
}

const sizeConfig = {
  sm: {
    text: 'text-xs',
    gap: 'gap-1',
    iconSize: 'h-3 w-3',
    separatorSize: 'h-3 w-3',
  },
  md: {
    text: 'text-sm',
    gap: 'gap-1.5',
    iconSize: 'h-4 w-4',
    separatorSize: 'h-4 w-4',
  },
  lg: {
    text: 'text-base',
    gap: 'gap-2',
    iconSize: 'h-5 w-5',
    separatorSize: 'h-5 w-5',
  },
} as const

function DefaultChevron({ className }: { className?: string }) {
  return (
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
}

function truncateItems(items: BreadcrumbItem[]): (BreadcrumbItem | 'ellipsis')[] {
  if (items.length <= 4) return items
  return [items[0], 'ellipsis' as const, items[items.length - 2], items[items.length - 1]]
}

export const Breadcrumbs = forwardRef<HTMLElement, BreadcrumbsProps>(
  ({ className, items, separator, size = 'md', ...props }, ref) => {
    const config = sizeConfig[size]
    const displayItems = truncateItems(items)

    return (
      <nav
        ref={ref}
        aria-label="Breadcrumb"
        className={cn('font-manrope', className)}
        {...props}
      >
        <ol className={cn('flex flex-wrap items-center', config.gap)}>
          {displayItems.map((item, index) => {
            const isLast =
              item !== 'ellipsis' && index === displayItems.length - 1
            const showSeparator = index < displayItems.length - 1

            if (item === 'ellipsis') {
              return (
                <li key="ellipsis" className={cn('flex items-center', config.gap)}>
                  <span
                    className={cn(
                      config.text,
                      'text-on-surface-variant/50 select-none',
                    )}
                    aria-hidden="true"
                  >
                    &hellip;
                  </span>
                  {showSeparator && (
                    <span
                      className="text-on-surface-variant/50"
                      aria-hidden="true"
                    >
                      {separator ?? (
                        <DefaultChevron className={config.separatorSize} />
                      )}
                    </span>
                  )}
                </li>
              )
            }

            return (
              <li
                key={`${item.label}-${index}`}
                className={cn('flex items-center', config.gap)}
              >
                <span className={cn('flex items-center', config.gap)}>
                  {item.icon && (
                    <span className={cn(config.iconSize, 'flex-shrink-0')}>
                      {item.icon}
                    </span>
                  )}
                  {isLast ? (
                    <span
                      aria-current="page"
                      className={cn(
                        config.text,
                        'font-semibold text-on-surface',
                      )}
                    >
                      {item.label}
                    </span>
                  ) : item.href ? (
                    <a
                      href={item.href}
                      className={cn(
                        config.text,
                        'text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm',
                      )}
                    >
                      {item.label}
                    </a>
                  ) : (
                    <span className={cn(config.text, 'text-on-surface-variant')}>
                      {item.label}
                    </span>
                  )}
                </span>
                {showSeparator && (
                  <span
                    className="text-on-surface-variant/50"
                    aria-hidden="true"
                  >
                    {separator ?? (
                      <DefaultChevron className={config.separatorSize} />
                    )}
                  </span>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
    )
  },
)

Breadcrumbs.displayName = 'Breadcrumbs'
