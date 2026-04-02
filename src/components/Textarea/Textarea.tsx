import { type TextareaHTMLAttributes, forwardRef, useId } from 'react'
import { cn } from '../../lib/utils'
import { ErrorCircleIcon } from '../../lib/icons'

export type TextareaSize = 'sm' | 'md' | 'lg'

export interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  label?: string
  error?: string
  helperText?: string
  /** Size preset */
  size?: TextareaSize
}

const sizeConfig = {
  sm: {
    wrapper: 'gap-1',
    label: 'text-xs',
    textarea: 'px-2 py-1.5 text-sm',
    helper: 'text-xs',
  },
  md: {
    wrapper: 'gap-1.5',
    label: 'text-xs',
    textarea: 'px-3 py-2 text-sm',
    helper: 'text-xs',
  },
  lg: {
    wrapper: 'gap-2',
    label: 'text-base',
    textarea: 'px-4 py-3 text-lg',
    helper: 'text-sm',
  },
} as const

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, helperText, id, size = 'md', ...props }, ref) => {
    const generatedId = useId()
    const textareaId = id || generatedId
    const descriptionId = error
      ? `${textareaId}-error`
      : helperText
        ? `${textareaId}-helper`
        : undefined
    const config = sizeConfig[size]

    return (
      <div className={cn('flex flex-col', config.wrapper)}>
        {label && (
          <label
            htmlFor={textareaId}
            className={cn('font-semibold font-manrope text-foreground', config.label)}
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          aria-invalid={!!error || undefined}
          aria-describedby={descriptionId}
          className={cn(
            'rounded-ethos border border-outline-variant/30 bg-card font-manrope text-foreground placeholder:text-muted-foreground transition-colors resize-y',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:border-transparent',
            config.textarea,
            error && 'border-error focus-visible:ring-error',
            props.disabled && 'opacity-60 cursor-not-allowed',
            className,
          )}
          {...props}
        />
        {error && (
          <p id={`${textareaId}-error`} role="alert" className={cn('text-error font-manrope flex items-center gap-1.5', config.helper)}>
            <ErrorCircleIcon className="shrink-0" />
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={`${textareaId}-helper`} className={cn('text-muted-foreground font-manrope', config.helper)}>{helperText}</p>
        )}
      </div>
    )
  },
)

Textarea.displayName = 'Textarea'
