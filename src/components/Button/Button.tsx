import { type ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '../../lib/utils'

export type ButtonDensity = 'compact' | 'spacious' | 'zoomed'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent'
  size?: 'sm' | 'md' | 'lg'
  /** Density preset — controls padding, gap, and text scale independently of size */
  density?: ButtonDensity
}

const variantStyles: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary:
    'bg-primary text-primary-foreground hover:bg-primary/90',
  secondary:
    'bg-secondary text-secondary-foreground hover:bg-secondary/80',
  accent:
    'bg-accent text-accent-foreground hover:bg-accent/90',
}

const sizeStyles: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'px-3 py-1 text-xs',
  md: 'px-4 py-1.5 text-sm',
  lg: 'px-5 py-2.5 text-base',
}

const densityConfig = {
  compact: {
    wrapper: 'gap-1',
    padding: 'px-2 py-0.5',
    text: 'text-xs',
  },
  spacious: {
    wrapper: 'gap-2',
    padding: '',
    text: '',
  },
  zoomed: {
    wrapper: 'gap-3',
    padding: 'px-6 py-2.5',
    text: 'text-lg',
  },
} as const

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', density = 'spacious', disabled, type = 'button', ...props }, ref) => {
    const densityCfg = densityConfig[density]

    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          'inline-flex items-center justify-center font-manrope font-semibold rounded-ethos transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
          variantStyles[variant],
          sizeStyles[size],
          densityCfg.wrapper,
          density !== 'spacious' && densityCfg.padding,
          density !== 'spacious' && densityCfg.text,
          disabled && 'opacity-60 cursor-not-allowed',
          className,
        )}
        disabled={disabled}
        {...props}
      />
    )
  },
)

Button.displayName = 'Button'
