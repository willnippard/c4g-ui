import { type ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '../../lib/utils'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent'
  size?: 'sm' | 'md' | 'lg'
}

const variantStyles: Record<string, string> = {
  primary:
    'bg-primary text-primary-foreground hover:bg-primary/90 dark:bg-primary-dark dark:hover:bg-primary-dark/90',
  secondary:
    'bg-secondary text-secondary-foreground hover:bg-secondary/80 dark:bg-secondary-dark dark:text-foreground-dark dark:hover:bg-secondary-dark/80',
  accent:
    'bg-accent text-accent-foreground hover:bg-accent/90 dark:bg-accent-dark dark:hover:bg-accent-dark/90',
}

const sizeStyles: Record<string, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-manrope font-semibold rounded-ethos transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
          variantStyles[variant],
          sizeStyles[size],
          disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
          className,
        )}
        disabled={disabled}
        {...props}
      />
    )
  },
)

Button.displayName = 'Button'
