import {
  type HTMLAttributes,
  type ReactNode,
  forwardRef,
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react'
import { cn } from '../../lib/utils'
import type { TopNavLink, TopNavBarSize } from './types'
import { BrandSection } from './BrandSection'
import { DesktopNav } from './DesktopNav'
import { MobileNav } from './MobileNav'

export type { TopNavLink, NavLink, TopNavBarSize } from './types'

export interface TopNavBarProps extends HTMLAttributes<HTMLElement> {
  /** Brand element — text string or ReactNode (e.g. logo). */
  brand?: ReactNode
  links?: TopNavLink[]
  actionLabel?: string
  onAction?: () => void
  /** Secondary actions area (avatar, icons, etc.) rendered before the action button. */
  actions?: ReactNode
  /** Size variant. @default 'md' */
  size?: TopNavBarSize
}

export const TopNavBar = forwardRef<HTMLElement, TopNavBarProps>(
  (
    {
      className,
      brand = 'Code4Good',
      links = [],
      actionLabel = 'Sign In',
      onAction,
      actions,
      size = 'md',
      ...props
    },
    ref,
  ) => {
    const [openDropdown, setOpenDropdown] = useState<string | null>(null)
    const [mobileOpen, setMobileOpen] = useState(false)
    const navRef = useRef<HTMLElement | null>(null)

    const setRefs = useCallback(
      (node: HTMLElement | null) => {
        navRef.current = node
        if (typeof ref === 'function') ref(node)
        else if (ref)
          (ref as React.MutableRefObject<HTMLElement | null>).current = node
      },
      [ref],
    )

    // Close dropdowns on outside click
    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (navRef.current && !navRef.current.contains(e.target as Node)) {
          setOpenDropdown(null)
        }
      }
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    // Close on Escape
    useEffect(() => {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setOpenDropdown(null)
          setMobileOpen(false)
        }
      }
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }, [])

    const toggleDropdown = (href: string) => {
      setOpenDropdown((prev) => (prev === href ? null : href))
    }

    const sizeConfigs = {
      sm: 'h-12',
      md: 'h-16',
      lg: 'h-20',
    }

    return (
      <nav
        ref={setRefs}
        aria-label="Main"
        className={cn(
          'fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md',
          className,
        )}
        {...props}
      >
        <div
          className={cn(
            'flex justify-between items-center px-8 max-w-screen-2xl mx-auto',
            sizeConfigs[size],
          )}
        >
          {/* Brand */}
          <BrandSection brand={brand} size={size} />

          {/* Right side: links + action button + hamburger */}
          <div className="flex items-center gap-4">
            {/* Desktop navigation */}
            <DesktopNav
              links={links}
              openDropdown={openDropdown}
              onToggleDropdown={toggleDropdown}
              actions={actions}
              actionLabel={actionLabel}
              onAction={onAction}
              size={size}
            />

            {/* Mobile navigation */}
            <MobileNav
              mobileOpen={mobileOpen}
              onToggleMobile={() => setMobileOpen((prev) => !prev)}
              links={links}
              openDropdown={openDropdown}
              onToggleDropdown={toggleDropdown}
              actions={actions}
              actionLabel={actionLabel}
              onAction={onAction}
              size={size}
            />
          </div>
        </div>

        {/* Mobile menu panel is rendered inside MobileNav */}
      </nav>
    )
  },
)

TopNavBar.displayName = 'TopNavBar'
