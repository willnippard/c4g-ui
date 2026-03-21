import { type HTMLAttributes, type ReactNode, forwardRef } from 'react'
import { cn } from '../../lib/utils'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  header?: ReactNode
  footer?: ReactNode
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, header, footer, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-ethos border border-border bg-card text-card-foreground shadow-sm dark:border-border-dark dark:bg-card-dark dark:text-foreground-dark',
          className,
        )}
        {...props}
      >
        {header && (
          <div className="border-b border-border px-6 py-4 font-epilogue font-semibold dark:border-border-dark">
            {header}
          </div>
        )}
        <div className="px-6 py-4 font-manrope">{children}</div>
        {footer && (
          <div className="border-t border-border px-6 py-4 dark:border-border-dark">
            {footer}
          </div>
        )}
      </div>
    )
  },
)

Card.displayName = 'Card'
