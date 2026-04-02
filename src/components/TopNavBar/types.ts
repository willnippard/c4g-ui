import type { ReactNode } from 'react'

export type TopNavLink = {
  label: string
  href: string
  icon?: ReactNode
  active?: boolean
  children?: TopNavLink[]
  megaMenu?: ReactNode
}

/** @deprecated Use TopNavLink instead */
export type NavLink = TopNavLink

export type TopNavBarSize = 'sm' | 'md' | 'lg'

export const sizeConfig = {
  sm: {
    bar: 'h-12',
    brand: 'text-base',
    link: 'px-3 py-1.5 text-xs',
    actionButton: 'px-4 py-1.5 text-xs',
    dropdownItem: 'px-3 py-2',
    hamburger: 'w-8 h-8',
    mobileItem: 'py-2',
    megaMenuTop: 'top-12',
  },
  md: {
    bar: 'h-16',
    brand: 'text-xl',
    link: 'px-4 py-2 text-sm',
    actionButton: 'px-6 py-2.5 text-sm',
    dropdownItem: 'px-4 py-3',
    hamburger: 'w-10 h-10',
    mobileItem: 'py-3',
    megaMenuTop: 'top-16',
  },
  lg: {
    bar: 'h-20',
    brand: 'text-2xl',
    link: 'px-5 py-3 text-base',
    actionButton: 'px-8 py-3.5 text-base',
    dropdownItem: 'px-5 py-4',
    hamburger: 'w-12 h-12',
    mobileItem: 'py-4',
    megaMenuTop: 'top-20',
  },
} as const
