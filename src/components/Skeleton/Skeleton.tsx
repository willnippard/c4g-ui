import { type HTMLAttributes, forwardRef } from 'react'
import { cn } from '../../lib/utils'

export type SkeletonSize = 'sm' | 'md' | 'lg'
export type SkeletonVariant = 'text' | 'rectangular' | 'rounded'

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  /** Shape variant */
  variant?: SkeletonVariant
  /** Override width (string or number in px) */
  width?: string | number
  /** Override height (string or number in px) */
  height?: string | number
  /** Number of lines to render (text variant only) */
  lines?: number
  /** Size preset controlling default heights and spacing */
  size?: SkeletonSize
}

const sizeConfig = {
  sm: {
    lineHeight: 'h-3',
    gap: 'gap-1.5',
  },
  md: {
    lineHeight: 'h-4',
    gap: 'gap-2',
  },
  lg: {
    lineHeight: 'h-5',
    gap: 'gap-3',
  },
} as const

const variantStyles: Record<SkeletonVariant, string> = {
  text: 'rounded-full',
  rectangular: 'rounded-none',
  rounded: 'rounded-xl',
}

function toPx(value: string | number): string {
  return typeof value === 'number' ? `${value}px` : value
}

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      className,
      variant = 'text',
      width,
      height,
      lines = 1,
      size = 'md',
      style,
      ...props
    },
    ref,
  ) => {
    const config = sizeConfig[size]

    const sizeStyle = {
      ...style,
      ...(width != null ? { width: toPx(width) } : {}),
      ...(height != null ? { height: toPx(height) } : {}),
    }

    // For text variant with multiple lines, render a group
    if (variant === 'text' && lines > 1) {
      return (
        <div
          ref={ref}
          role="status"
          className={cn('flex flex-col', config.gap, className)}
          style={width != null ? { width: toPx(width) } : style}
          {...props}
        >
          <span className="sr-only">Loading...</span>
          {Array.from({ length: lines }, (_, i) => (
            <div
              key={i}
              aria-hidden="true"
              className={cn(
                'bg-surface-container-low animate-pulse',
                variantStyles.text,
                height != null ? undefined : config.lineHeight,
                // Last line is shorter
                i === lines - 1 ? 'w-3/4' : 'w-full',
              )}
              style={height != null ? { height: toPx(height) } : undefined}
            />
          ))}
        </div>
      )
    }

    // Single element skeleton
    return (
      <div
        ref={ref}
        role="status"
        className={cn(
          'bg-surface-container-low animate-pulse',
          variantStyles[variant],
          variant === 'text' && height == null ? config.lineHeight : undefined,
          className,
        )}
        style={sizeStyle}
        {...props}
      >
        <span className="sr-only">Loading...</span>
      </div>
    )
  },
)

Skeleton.displayName = 'Skeleton'
