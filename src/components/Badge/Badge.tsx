import { type HTMLAttributes, forwardRef } from 'react'
import { cn } from '../../lib/utils'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'accent' | 'muted'
}

const variantStyles: Record<string, string> = {
  primary:
    'bg-primary text-primary-foreground dark:bg-primary-dark',
  accent:
    'bg-accent text-accent-foreground dark:bg-accent-dark',
  muted:
    'bg-muted text-muted-foreground dark:bg-muted-dark dark:text-foreground-dark',
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'primary', ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold font-manrope',
          variantStyles[variant],
          className,
        )}
        {...props}
      />
    )
  },
)

Badge.displayName = 'Badge'
