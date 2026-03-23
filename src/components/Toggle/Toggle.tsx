import { type InputHTMLAttributes, forwardRef, useId } from 'react'
import { cn } from '../../lib/utils'

export type ToggleDensity = 'sm' | 'md' | 'lg'

export interface ToggleProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string
  size?: 'sm' | 'md'
  /** Density preset — controls overall scale independently of size */
  density?: ToggleDensity
}

const trackSize = {
  sm: 'w-9 h-5',
  md: 'w-12 h-6',
} as const

const thumbSize = {
  sm: 'w-3.5 h-3.5',
  md: 'w-4 h-4',
} as const

const thumbTranslate = {
  sm: 'peer-checked:translate-x-[14px]',
  md: 'peer-checked:translate-x-[24px]',
} as const

const densityConfig = {
  sm: {
    wrapper: 'gap-2',
    track: 'w-8 h-4',
    thumb: 'w-2.5 h-2.5 top-[3px] left-[3px]',
    thumbTranslate: 'peer-checked:translate-x-[14px]',
    label: 'text-xs',
  },
  md: {
    wrapper: 'gap-3',
    track: '',
    thumb: '',
    thumbTranslate: '',
    label: 'text-sm',
  },
  lg: {
    wrapper: 'gap-4',
    track: 'w-16 h-8',
    thumb: 'w-6 h-6',
    thumbTranslate: 'peer-checked:translate-x-[30px]',
    label: 'text-lg',
  },
} as const

export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(
  ({ className, label, size = 'md', density = 'md', disabled, id, ...props }, ref) => {
    const generatedId = useId()
    const toggleId = id || generatedId
    const labelId = label ? `${toggleId}-label` : undefined
    const densityCfg = densityConfig[density]

    return (
      <div
        className={cn(
          'inline-flex items-center',
          densityCfg.wrapper,
          disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer',
          className,
        )}
      >
        <label htmlFor={toggleId} className="relative inline-flex cursor-[inherit]">
          <input
            ref={ref}
            id={toggleId}
            type="checkbox"
            role="switch"
            aria-labelledby={labelId}
            className="sr-only peer"
            disabled={disabled}
            {...props}
          />
          {/* Track */}
          <div
            className={cn(
              'rounded-full transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]',
              'bg-on-surface-variant/40 border border-outline-variant',
              'shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)]',
              'peer-checked:bg-primary peer-checked:border-transparent',
              'peer-checked:shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]',
              !disabled && 'peer-hover:ring-4 peer-hover:ring-primary/15',
              !disabled && 'peer-hover:border-primary/40',
              'peer-focus-visible:ring-4 peer-focus-visible:ring-primary/35',
              density !== 'md' ? densityCfg.track : trackSize[size],
            )}
          />
          {/* Thumb */}
          <div
            aria-hidden="true"
            className={cn(
              'absolute top-1 left-1 rounded-full',
              'bg-on-primary shadow-[0_1px_3px_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)]',
              'peer-[:not(:checked)]:bg-surface-container-lowest',
              'transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]',
              density !== 'md' ? densityCfg.thumb : thumbSize[size],
              density !== 'md' ? densityCfg.thumbTranslate : thumbTranslate[size],
            )}
          />
        </label>
        {label && (
          <span
            id={labelId}
            onClick={() => document.getElementById(toggleId)?.click()}
            className={cn(
              'font-semibold text-on-surface cursor-[inherit] select-none',
              densityCfg.label,
            )}
          >
            {label}
          </span>
        )}
      </div>
    )
  },
)

Toggle.displayName = 'Toggle'
