import { type HTMLAttributes, forwardRef } from 'react'
import { cn } from '../../lib/utils'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'accent' | 'muted' | 'secondary' | 'outline' | 'destructive' | 'default'
  size?: 'sm' | 'md' | 'lg'
}

const variantStyles: Record<NonNullable<BadgeProps['variant']>, string> = {
  primary:
    'bg-primary text-primary-foreground',
  accent:
    'bg-accent text-accent-foreground',
  muted:
    'bg-muted text-muted-foreground',
  secondary:
    'bg-secondary text-secondary-foreground',
  outline:
    'bg-transparent border border-outline-variant text-foreground',
  destructive:
    'bg-error text-error-foreground',
  default:
    'bg-primary text-primary-foreground',
}

const sizeConfig = {
  sm: {
    badge: 'px-1.5 py-px text-[10px]',
  },
  md: {
    badge: 'px-2.5 py-0.5 text-xs',
  },
  lg: {
    badge: 'px-4 py-1.5 text-base',
  },
} as const

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const config = sizeConfig[size]

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-full font-semibold font-manrope border border-outline-variant/20',
          config.badge,
          variantStyles[variant],
          className,
        )}
        {...props}
      />
    )
  },
)

Badge.displayName = 'Badge'
