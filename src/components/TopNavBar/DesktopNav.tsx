import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'
import { Button } from '../Button'
import type { TopNavLink, TopNavBarSize } from './types'
import { sizeConfig } from './types'

interface DesktopNavProps {
  links: TopNavLink[]
  openDropdown: string | null
  onToggleDropdown: (href: string) => void
  actions?: ReactNode
  actionLabel: string
  onAction?: () => void
  size: TopNavBarSize
}

function hasSubmenu(link: TopNavLink): boolean {
  return !!(link.children?.length || link.megaMenu)
}

function renderDesktopLink(
  link: TopNavLink,
  openDropdown: string | null,
  onToggleDropdown: (href: string) => void,
  sc: (typeof sizeConfig)[TopNavBarSize],
): JSX.Element {
  const isOpen = openDropdown === link.href

  if (hasSubmenu(link)) {
    return (
      <li key={link.href} className="relative">
        <button
          type="button"
          onClick={() => onToggleDropdown(link.href)}
          aria-expanded={isOpen}
          aria-haspopup="true"
          className={cn(
            'flex items-center gap-3 rounded-lg font-semibold font-manrope transition-all duration-200',
            sc.link,
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary',
            link.active
              ? 'bg-surface-container-lowest text-primary'
              : 'text-on-surface hover:bg-surface-container-high',
          )}
        >
          {link.icon && <span className="shrink-0">{link.icon}</span>}
          <span>{link.label}</span>
          <svg
            className={cn(
              'w-4 h-4 transition-transform duration-200',
              isOpen && 'rotate-180',
            )}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {/* Dropdown panel */}
        {link.children && link.children.length > 0 && (
          <div
            className={cn(
              'absolute top-full left-0 mt-2 min-w-[220px] bg-surface-container-lowest rounded-xl shadow-lg border border-outline-variant/20 py-2 transition-all duration-300',
              isOpen
                ? 'opacity-100 translate-y-0 pointer-events-auto'
                : 'opacity-0 -translate-y-2 pointer-events-none',
            )}
          >
            {link.children.map((child) => (
              <a
                key={child.href}
                href={child.href}
                aria-current={child.active ? 'page' : undefined}
                className={cn(
                  'flex items-center gap-3 mx-2 rounded-lg font-semibold font-manrope transition-all duration-200',
                  sc.dropdownItem,
                  sc.link.split(' ').find((c) => c.startsWith('text-')),
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary',
                  child.active
                    ? 'text-primary bg-surface-container-lowest'
                    : 'text-on-secondary-container hover:bg-surface-container-high',
                )}
              >
                {child.icon && (
                  <span className="shrink-0">{child.icon}</span>
                )}
                <span>{child.label}</span>
              </a>
            ))}
          </div>
        )}

        {/* Mega menu panel */}
        {link.megaMenu && (
          <div
            className={cn(
              'fixed left-0 right-0 bg-surface-container-lowest shadow-xl border-t border-outline-variant/20 transition-all duration-300',
              sc.megaMenuTop,
              isOpen
                ? 'opacity-100 pointer-events-auto'
                : 'opacity-0 pointer-events-none',
            )}
          >
            <div className="max-w-screen-2xl mx-auto px-8 py-6">
              {link.megaMenu}
            </div>
          </div>
        )}
      </li>
    )
  }

  return (
    <li key={link.href}>
      <a
        href={link.href}
        aria-current={link.active ? 'page' : undefined}
        className={cn(
          'flex items-center gap-3 rounded-lg font-semibold font-manrope transition-all duration-200',
          sc.link,
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary',
          link.active
            ? 'bg-surface-container-lowest text-primary'
            : 'text-on-surface hover:bg-surface-container-high',
        )}
      >
        {link.icon && <span className="shrink-0">{link.icon}</span>}
        <span>{link.label}</span>
      </a>
    </li>
  )
}

export function DesktopNav({
  links,
  openDropdown,
  onToggleDropdown,
  actions,
  actionLabel,
  onAction,
  size,
}: DesktopNavProps) {
  const sc = sizeConfig[size]

  return (
    <div className="flex items-center gap-4">
      {/* Desktop links */}
      {links.length > 0 && (
        <ul className="hidden md:flex gap-1 items-center list-none m-0 p-0 mr-2">
          {links.map((link) =>
            renderDesktopLink(link, openDropdown, onToggleDropdown, sc),
          )}
        </ul>
      )}

      {/* Actions area (desktop only) */}
      {actions && <div className="hidden md:flex items-center gap-3">{actions}</div>}

      {/* Action button (desktop only) */}
      <Button
        variant="primary"
        size={size}
        className={cn('hidden md:inline-flex', sc.actionButton)}
        onClick={onAction}
      >
        {actionLabel}
      </Button>
    </div>
  )
}
