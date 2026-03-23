import { type HTMLAttributes, forwardRef } from 'react'
import { cn } from '../../lib/utils'

export type ImpactCardSize = 'sm' | 'md' | 'lg'

export interface ImpactCardProps extends HTMLAttributes<HTMLDivElement> {
  label: string
  stat: string
  description: string
  progress?: number
  progressLabel?: string
  /** Size preset */
  size?: ImpactCardSize
}

const sizeConfig = {
  sm: {
    card: 'p-6 rounded-lg',
    decorCircle: 'w-32 h-32 -mr-16 -mt-16',
    label: 'text-[10px] tracking-[0.15em]',
    stat: 'text-2xl mt-2 mb-1',
    description: 'text-sm',
    progressWrap: 'mt-4 gap-4',
    progressBar: 'h-0.5',
    progressLabel: 'text-xs',
  },
  md: {
    card: 'p-10 rounded-xl',
    decorCircle: 'w-48 h-48 -mr-24 -mt-24',
    label: 'text-xs tracking-[0.2em]',
    stat: 'text-4xl mt-4 mb-2',
    description: 'text-base',
    progressWrap: 'mt-8 gap-6',
    progressBar: 'h-1',
    progressLabel: 'text-sm',
  },
  lg: {
    card: 'p-14 rounded-2xl',
    decorCircle: 'w-64 h-64 -mr-32 -mt-32',
    label: 'text-sm tracking-[0.25em]',
    stat: 'text-6xl mt-6 mb-3',
    description: 'text-lg',
    progressWrap: 'mt-12 gap-8',
    progressBar: 'h-2',
    progressLabel: 'text-base',
  },
} as const

export const ImpactCard = forwardRef<HTMLDivElement, ImpactCardProps>(
  (
    { className, label, stat, description, progress, progressLabel, size = 'md', ...props },
    ref,
  ) => {
    const config = sizeConfig[size]

    return (
      <div
        ref={ref}
        className={cn(
          'bg-primary text-on-primary relative overflow-hidden flex flex-col justify-between',
          config.card,
          className,
        )}
        {...props}
      >
        <div
          className={cn(
            'absolute top-0 right-0 bg-primary/70 rounded-full opacity-50',
            config.decorCircle,
          )}
        />
        <div>
          <span
            className={cn('font-bold uppercase', config.label)}
          >
            {label}
          </span>
          <h3
            className={cn(
              'font-epilogue font-extrabold tracking-tighter',
              config.stat,
            )}
          >
            {stat}
          </h3>
          <p className={cn('font-manrope text-on-primary/90', config.description)}>
            {description}
          </p>
        </div>
        {progress !== undefined && (
          <div className={cn('flex items-center', config.progressWrap)}>
            <div
              className={cn(
                'flex-1 bg-on-primary/20 rounded-full overflow-hidden',
                config.progressBar,
              )}
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={progressLabel ?? `${progress}%`}
            >
              <div
                className="h-full bg-on-primary rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
            {progressLabel && (
              <span className={cn('font-bold', config.progressLabel)}>
                {progressLabel}
              </span>
            )}
          </div>
        )}
      </div>
    )
  },
)

ImpactCard.displayName = 'ImpactCard'
