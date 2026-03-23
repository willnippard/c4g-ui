import { type HTMLAttributes, type ReactNode, forwardRef } from 'react'
import { cn } from '../../lib/utils'

export type CardSize = 'compact' | 'spacious' | 'zoomed'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  header?: ReactNode
  footer?: ReactNode
  /** Size preset */
  size?: CardSize
}

const sizeConfig = {
  compact: {
    card: 'rounded-lg',
    section: 'px-4 py-2',
    headerText: 'text-sm',
    body: 'text-sm',
  },
  spacious: {
    card: 'rounded-ethos',
    section: 'px-6 py-4',
    headerText: 'text-base',
    body: 'text-base',
  },
  zoomed: {
    card: 'rounded-2xl',
    section: 'px-10 py-6',
    headerText: 'text-xl',
    body: 'text-lg',
  },
} as const

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, header, footer, children, size = 'spacious', ...props }, ref) => {
    const config = sizeConfig[size]

    return (
      <div
        ref={ref}
        className={cn(
          'border border-border bg-card text-card-foreground shadow-sm dark:border-border-dark dark:bg-card-dark dark:text-foreground-dark',
          config.card,
          className,
        )}
        {...props}
      >
        {header && (
          <div
            className={cn(
              'border-b border-border font-epilogue font-semibold dark:border-border-dark',
              config.section,
              config.headerText,
            )}
          >
            {header}
          </div>
        )}
        <div className={cn('font-manrope', config.section, config.body)}>
          {children}
        </div>
        {footer && (
          <div
            className={cn(
              'border-t border-border dark:border-border-dark',
              config.section,
            )}
          >
            {footer}
          </div>
        )}
      </div>
    )
  },
)

Card.displayName = 'Card'
