import { type HTMLAttributes, type ReactNode, forwardRef } from 'react'
import { cn } from '../../lib/utils'

export type CardSize = 'sm' | 'md' | 'lg'

export interface CardProps extends HTMLAttributes<HTMLElement> {
  /** Full-bleed media area rendered at the top with no padding (images, video) */
  media?: ReactNode
  /** Headline rendered inside the content area with display font styling */
  header?: ReactNode
  /** Action area rendered below children inside the content area */
  footer?: ReactNode
  /** Size preset */
  size?: CardSize
}

const sizeConfig = {
  sm: {
    card: 'rounded-lg',
    content: 'p-4',
    headerText: 'text-sm mb-0.5',
    body: 'text-[13px] leading-tight',
  },
  md: {
    card: 'rounded-xl',
    content: 'p-8',
    headerText: 'text-xl mb-3',
    body: 'text-base leading-relaxed',
  },
  lg: {
    card: 'rounded-2xl',
    content: 'p-12',
    headerText: 'text-[32px] leading-tight mb-8',
    body: 'text-2xl leading-normal font-medium',
  },
} as const

export const Card = forwardRef<HTMLElement, CardProps>(
  ({ className, media, header, footer, children, size = 'md', ...props }, ref) => {
    const config = sizeConfig[size]

    return (
      <article
        ref={ref}
        className={cn(
          'group overflow-hidden',
          config.card,
          'bg-surface-container-lowest text-on-surface',
          'border border-outline-variant/20',
          'shadow-sm transition-shadow hover:shadow-md',
          className,
        )}
        {...props}
      >
        {media && (
          <div className="relative overflow-hidden">
            <div className="group-hover:scale-110 transition-transform duration-700">
              {media}
            </div>
          </div>
        )}
        <div className={cn(config.content)}>
          {header && (
            <h3
              className={cn(
                'font-epilogue font-bold text-on-surface',
                config.headerText,
              )}
            >
              {header}
            </h3>
          )}
          <div className={cn('font-manrope text-on-surface-variant', config.body)}>
            {children}
          </div>
          {footer && (
            <div className={cn(size === 'sm' ? 'mt-2' : size === 'lg' ? 'mt-10' : 'mt-4')}>
              {footer}
            </div>
          )}
        </div>
      </article>
    )
  },
)

Card.displayName = 'Card'
