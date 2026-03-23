import { type HTMLAttributes, forwardRef } from 'react'
import { cn } from '../../lib/utils'

export type ProjectCardSize = 'compact' | 'spacious' | 'zoomed'

export interface ProjectCardProps extends HTMLAttributes<HTMLDivElement> {
  title: string
  description: string
  imageSrc?: string
  imageAlt?: string
  status?: string
  avatarCount?: number
  onDetailsClick?: () => void
  /** Size preset */
  size?: ProjectCardSize
}

const avatarColors = [
  'bg-primary-fixed',
  'bg-tertiary-fixed',
  'bg-secondary-fixed',
]

const sizeConfig = {
  compact: {
    card: 'rounded-lg',
    imageWrap: 'md:w-1/3 h-40 md:h-auto',
    statusBadge: 'top-2 left-2 px-2 py-0.5 text-[8px]',
    content: 'p-4 md:w-2/3',
    title: 'text-sm mb-1',
    description: 'text-xs mb-3 leading-relaxed',
    avatar: 'w-6 h-6',
    detailsBtn: 'text-xs',
  },
  spacious: {
    card: 'rounded-xl',
    imageWrap: 'md:w-2/5 h-64 md:h-auto',
    statusBadge: 'top-4 left-4 px-3 py-1 text-[10px]',
    content: 'p-8 md:w-3/5',
    title: 'text-lg mb-2',
    description: 'text-sm mb-6 leading-relaxed',
    avatar: 'w-8 h-8',
    detailsBtn: 'text-sm',
  },
  zoomed: {
    card: 'rounded-2xl',
    imageWrap: 'md:w-1/2 h-80 md:h-auto',
    statusBadge: 'top-6 left-6 px-4 py-2 text-xs',
    content: 'p-12 md:w-1/2',
    title: 'text-2xl mb-3',
    description: 'text-base mb-8 leading-relaxed',
    avatar: 'w-10 h-10',
    detailsBtn: 'text-base',
  },
} as const

export const ProjectCard = forwardRef<HTMLDivElement, ProjectCardProps>(
  (
    {
      className,
      title,
      description,
      imageSrc,
      imageAlt = '',
      status,
      avatarCount = 3,
      onDetailsClick,
      size = 'spacious',
      ...props
    },
    ref,
  ) => {
    const config = sizeConfig[size]

    return (
      <div
        ref={ref}
        className={cn(
          'group bg-surface-container-lowest overflow-hidden flex flex-col md:flex-row shadow-sm hover:shadow-md transition-shadow border border-outline-variant/20',
          config.card,
          className,
        )}
        {...props}
      >
        {(imageSrc || status) && (
          <div className={cn('relative overflow-hidden', config.imageWrap)}>
            {imageSrc && (
              <img
                src={imageSrc}
                alt={imageAlt}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            )}
            {status && (
              <div
                className={cn(
                  'absolute bg-primary text-on-primary rounded-full font-bold uppercase tracking-widest',
                  config.statusBadge,
                )}
              >
                {status}
              </div>
            )}
          </div>
        )}
        <div className={cn('flex flex-col justify-center', config.content)}>
          <h3
            className={cn(
              'font-epilogue font-bold text-on-surface',
              config.title,
            )}
          >
            {title}
          </h3>
          <p
            className={cn(
              'font-manrope text-on-surface-variant',
              config.description,
            )}
          >
            {description}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex -space-x-2" aria-hidden="true">
              {Array.from({ length: avatarCount }).map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    'rounded-full border-2 border-surface-container-lowest',
                    config.avatar,
                    avatarColors[i % avatarColors.length],
                  )}
                />
              ))}
            </div>
            {onDetailsClick && (
              <button
                type="button"
                onClick={onDetailsClick}
                className={cn(
                  'text-primary font-bold font-manrope flex items-center gap-1 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded',
                  config.detailsBtn,
                )}
              >
                Details &rarr;
              </button>
            )}
          </div>
        </div>
      </div>
    )
  },
)

ProjectCard.displayName = 'ProjectCard'
