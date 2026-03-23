import { type HTMLAttributes, forwardRef, useCallback, useMemo, useState } from 'react'
import { cn } from '../../lib/utils'

export type AvatarSize = 'sm' | 'md' | 'lg'
export type AvatarVariant = 'square' | 'rounded'

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  /** Image source URL */
  src?: string
  /** Alt text for the image */
  alt?: string
  /** Full name used to generate initials fallback */
  name?: string
  /** Size preset: sm (32px), md (48px), lg (64px) */
  size?: AvatarSize
  /** Shape variant: 'rounded' (more rounding) or 'square' (less rounding). Never circular. */
  variant?: AvatarVariant
}

const sizeConfig = {
  sm: {
    container: 'w-8 h-8',
    text: 'text-xs',
    rounded: 'rounded-lg',
    square: 'rounded-md',
  },
  md: {
    container: 'w-12 h-12',
    text: 'text-base',
    rounded: 'rounded-xl',
    square: 'rounded-lg',
  },
  lg: {
    container: 'w-16 h-16',
    text: 'text-xl',
    rounded: 'rounded-2xl',
    square: 'rounded-xl',
  },
} as const

const backgroundTokens = [
  'bg-primary text-on-primary',
  'bg-secondary-container text-on-secondary-container',
  'bg-tertiary-container text-on-tertiary-container',
] as const

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/)
  if (parts.length === 0) return ''
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase()
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase()
}

function hashName(name: string): number {
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) | 0
  }
  return Math.abs(hash)
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, alt, name, size = 'md', variant = 'rounded', ...props }, ref) => {
    const [imgFailed, setImgFailed] = useState(false)

    const handleError = useCallback(() => {
      setImgFailed(true)
    }, [])

    const config = sizeConfig[size]
    const showImage = src && !imgFailed

    const initials = useMemo(() => (name ? getInitials(name) : ''), [name])
    const colorClass = useMemo(
      () => backgroundTokens[name ? hashName(name) % backgroundTokens.length : 0],
      [name],
    )

    const rounding = variant === 'square' ? config.square : config.rounded

    return (
      <div
        ref={ref}
        role="img"
        aria-label={alt || name || 'Avatar'}
        className={cn(
          'relative inline-flex items-center justify-center overflow-hidden',
          'border border-outline-variant/20',
          config.container,
          rounding,
          !showImage && colorClass,
          className,
        )}
        {...props}
      >
        {showImage ? (
          <img
            src={src}
            alt={alt || name || 'Avatar'}
            onError={handleError}
            className="h-full w-full object-cover"
          />
        ) : (
          <span
            className={cn(
              'font-epilogue font-bold select-none leading-none',
              config.text,
            )}
            aria-hidden="true"
          >
            {initials || '?'}
          </span>
        )}
      </div>
    )
  },
)

Avatar.displayName = 'Avatar'
