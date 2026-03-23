import { type HTMLAttributes, forwardRef } from 'react'
import { cn } from '../../lib/utils'
import { Button } from '../Button'

export type SideNavItem = {
  label: string
  href: string
  icon?: React.ReactNode
  active?: boolean
}

export type SideNavFooterLink = {
  label: string
  href: string
  icon?: React.ReactNode
}

export type SideNavBarSize = 'sm' | 'md' | 'lg'

const sizeConfig = {
  sm: {
    aside: 'w-48 py-4 px-3',
    brandWrapper: 'gap-2 px-3 mb-6',
    brandIcon: 'w-8 h-8',
    brandTitle: 'text-sm',
    brandSubtitle: 'text-[9px]',
    navItem: 'gap-3 px-3 py-2 text-xs',
    footerWrapper: 'pt-4',
    footerLink: 'gap-3 px-3 py-2 text-xs',
    footerButton: 'py-2 text-xs',
  },
  md: {
    aside: 'w-64 py-6 px-4',
    brandWrapper: 'gap-3 px-4 mb-10',
    brandIcon: 'w-10 h-10',
    brandTitle: 'text-base',
    brandSubtitle: 'text-[10px]',
    navItem: 'gap-4 px-4 py-3 text-sm',
    footerWrapper: 'pt-6',
    footerLink: 'gap-4 px-4 py-3 text-sm',
    footerButton: 'py-3 text-sm',
  },
  lg: {
    aside: 'w-80 py-8 px-5',
    brandWrapper: 'gap-4 px-5 mb-12',
    brandIcon: 'w-12 h-12',
    brandTitle: 'text-lg',
    brandSubtitle: 'text-[11px]',
    navItem: 'gap-5 px-5 py-4 text-base',
    footerWrapper: 'pt-8',
    footerLink: 'gap-5 px-5 py-4 text-base',
    footerButton: 'py-4 text-base',
  },
} as const

export interface SideNavBarProps extends HTMLAttributes<HTMLElement> {
  brandIcon?: React.ReactNode
  title?: string
  subtitle?: string
  items: SideNavItem[]
  footerLinks?: SideNavFooterLink[]
  footerAction?: { label: string; onClick: () => void }
  size?: SideNavBarSize
}

export const SideNavBar = forwardRef<HTMLElement, SideNavBarProps>(
  (
    {
      className,
      brandIcon,
      title,
      subtitle,
      items,
      footerLinks,
      footerAction,
      size = 'md',
      ...props
    },
    ref,
  ) => {
    const s = sizeConfig[size]

    return (
      <aside
        ref={ref}
        aria-label={title ?? 'Side navigation'}
        className={cn(
          'h-screen bg-surface-container-low flex flex-col font-manrope',
          s.aside,
          className,
        )}
        {...props}
      >
        {(brandIcon || title || subtitle) && (
          <div className={cn('flex items-center', s.brandWrapper)}>
            {brandIcon && (
              <div
                className={cn(
                  'bg-primary rounded-lg flex items-center justify-center text-on-primary shrink-0',
                  s.brandIcon,
                )}
              >
                {brandIcon}
              </div>
            )}
            <div className="overflow-hidden">
              {title && (
                <h2
                  className={cn(
                    'font-epilogue font-bold text-primary leading-none truncate',
                    s.brandTitle,
                  )}
                >
                  {title}
                </h2>
              )}
              {subtitle && (
                <p
                  className={cn(
                    'uppercase tracking-widest text-on-secondary-container font-bold mt-1 truncate',
                    s.brandSubtitle,
                  )}
                >
                  {subtitle}
                </p>
              )}
            </div>
          </div>
        )}

        <nav aria-label="Side" className="flex-1 space-y-1">
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              aria-current={item.active ? 'page' : undefined}
              className={cn(
                'flex items-center rounded-lg font-semibold transition-all duration-200',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset',
                s.navItem,
                item.active
                  ? 'bg-surface-container-lowest text-primary shadow-sm'
                  : 'text-on-secondary-container hover:bg-surface-container-high hover:translate-x-1',
              )}
            >
              {item.icon && <span className="shrink-0">{item.icon}</span>}
              <span>{item.label}</span>
            </a>
          ))}
        </nav>

        {(footerAction || footerLinks) && (
          <div
            className={cn(
              'mt-auto border-t border-outline-variant/20 space-y-1',
              s.footerWrapper,
            )}
          >
            {footerLinks &&
              footerLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'flex items-center rounded-lg font-semibold text-on-secondary-container hover:bg-surface-container-high transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset',
                    s.footerLink,
                  )}
                >
                  {link.icon && <span className="shrink-0">{link.icon}</span>}
                  <span>{link.label}</span>
                </a>
              ))}
            {footerAction && (
              <Button
                variant="primary"
                size={size}
                onClick={footerAction.onClick}
                className={cn('w-full mt-4', s.footerButton)}
              >
                {footerAction.label}
              </Button>
            )}
          </div>
        )}
      </aside>
    )
  },
)

SideNavBar.displayName = 'SideNavBar'
