import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'
import type { TopNavBarSize } from './types'
import { sizeConfig } from './types'

interface BrandSectionProps {
  brand: ReactNode
  size: TopNavBarSize
}

export function BrandSection({ brand, size }: BrandSectionProps) {
  const sc = sizeConfig[size]

  return (
    <div
      className={cn(
        'font-black text-primary font-epilogue uppercase tracking-tighter',
        sc.brand,
      )}
    >
      {brand}
    </div>
  )
}
