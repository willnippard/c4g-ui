import { type ButtonHTMLAttributes, forwardRef, cloneElement, isValidElement } from 'react'
import { cn } from '../../lib/utils'

export type ButtonDensity = 'sm' | 'md' | 'lg'
export type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost' | 'destructive' | 'link'
export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  /** Density preset — controls padding, gap, and text scale independently of size */
  density?: ButtonDensity
  /** When true, render as a child element using the Slot pattern. Useful for wrapping Next.js Link components. */
  asChild?: boolean
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-primary text-primary-foreground hover:bg-primary/90',
  secondary:
    'bg-secondary text-secondary-foreground hover:bg-secondary/80',
  accent:
    'bg-accent text-accent-foreground hover:bg-accent/90',
  outline:
    'border border-outline-variant text-foreground hover:bg-accent/10',
  ghost:
    'text-foreground hover:bg-accent/10',
  destructive:
    'bg-error text-on-error hover:bg-error/90',
  link:
    'text-primary underline-offset-4 hover:underline',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1 text-xs',
  md: 'px-4 py-1.5 text-sm',
  lg: 'px-5 py-2.5 text-base',
  icon: 'h-9 w-9 p-0',
}

const densityConfig = {
  sm: {
    wrapper: 'gap-1',
    padding: 'px-2 py-0.5',
    text: 'text-xs',
  },
  md: {
    wrapper: 'gap-2',
    padding: '',
    text: '',
  },
  lg: {
    wrapper: 'gap-3',
    padding: 'px-6 py-2.5',
    text: 'text-lg',
  },
} as const

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', density = 'md', disabled, type = 'button', asChild, children, ...props }, ref) => {
    const densityCfg = densityConfig[density]

    const baseStyles = cn(
      'inline-flex items-center justify-center font-manrope font-semibold rounded-ethos transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
      variantStyles[variant],
      sizeStyles[size],
      densityCfg.wrapper,
      density !== 'md' && densityCfg.padding,
      density !== 'md' && densityCfg.text,
      variant === 'link' && 'px-0 py-0',
      disabled && 'opacity-60 cursor-not-allowed',
      className,
    )

    // When asChild is true, render as the child element (Slot pattern)
    if (asChild && isValidElement(children)) {
      return cloneElement(children, {
        ...props,
        ref,
        className: cn(baseStyles, children.props.className),
        disabled: disabled ? disabled : children.props.disabled,
      } as Record<string, unknown>)
    }

    return (
      <button
        ref={ref}
        type={type}
        className={baseStyles}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    )
  },
)

Button.displayName = 'Button'
