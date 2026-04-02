import {
  type HTMLAttributes,
  type ReactNode,
  forwardRef,
  useEffect,
  useCallback,
  useRef,
} from 'react'
import { cn } from '../../lib/utils'
import { CloseIcon } from '../../lib/icons'

export type ModalSize = 'sm' | 'md' | 'lg'

export interface ModalProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Whether the modal is open */
  open: boolean
  /** Called when the modal should close */
  onClose: () => void
  /** Optional title rendered at the top of the modal */
  title?: ReactNode
  /** Optional footer rendered at the bottom of the modal */
  footer?: ReactNode
  /** Size preset */
  size?: ModalSize
  /** Whether clicking the overlay closes the modal */
  closeOnOverlayClick?: boolean
  /** Whether pressing Escape closes the modal */
  closeOnEscape?: boolean
}

const sizeStyles: Record<ModalSize, string> = {
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-3xl',
}

export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      className,
      open,
      onClose,
      title,
      footer,
      children,
      size = 'md',
      closeOnOverlayClick = true,
      closeOnEscape = true,
      ...props
    },
    ref,
  ) => {
    const panelRef = useRef<HTMLDivElement>(null)
    const previouslyFocused = useRef<Element | null>(null)

    // Close on Escape key
    const handleKeyDown = useCallback(
      (e: KeyboardEvent) => {
        if (closeOnEscape && e.key === 'Escape') {
          onClose()
        }
      },
      [closeOnEscape, onClose],
    )

    // Focus trap
    useEffect(() => {
      if (!open) return

      const panel = panelRef.current
      if (!panel) return

      const focusableSelector =
        'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

      const handleTab = (e: KeyboardEvent) => {
        if (e.key !== 'Tab') return

        const focusableElements = panel.querySelectorAll(focusableSelector)
        if (focusableElements.length === 0) return

        const first = focusableElements[0] as HTMLElement
        const last = focusableElements[focusableElements.length - 1] as HTMLElement

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault()
            last.focus()
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault()
            first.focus()
          }
        }
      }

      document.addEventListener('keydown', handleTab)
      return () => document.removeEventListener('keydown', handleTab)
    }, [open])

    // Escape key listener
    useEffect(() => {
      if (!open) return
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }, [open, handleKeyDown])

    // Body scroll lock + focus management
    useEffect(() => {
      if (open) {
        previouslyFocused.current = document.activeElement
        document.body.style.overflow = 'hidden'

        // Focus the first focusable element in the panel after mount
        requestAnimationFrame(() => {
          const panel = panelRef.current
          if (!panel) return
          const focusable = panel.querySelector(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
          ) as HTMLElement | null
          focusable?.focus()
        })
      } else {
        document.body.style.overflow = ''
        // Restore focus
        if (previouslyFocused.current instanceof HTMLElement) {
          previouslyFocused.current.focus()
        }
      }

      return () => {
        document.body.style.overflow = ''
      }
    }, [open])

    const handleOverlayClick = () => {
      if (closeOnOverlayClick) {
        onClose()
      }
    }

    if (!open) return null

    return (
      <div
        className={cn(
          'fixed inset-0 z-50 flex items-center justify-center',
          'animate-in fade-in duration-200',
        )}
        role="presentation"
      >
        {/* Overlay */}
        <div
          className="fixed inset-0 bg-foreground/60 backdrop-blur-sm"
          onClick={handleOverlayClick}
          aria-hidden="true"
        />

        {/* Panel */}
        <div
          ref={(node) => {
            (panelRef as React.MutableRefObject<HTMLDivElement | null>).current = node
            if (typeof ref === 'function') ref(node)
            else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node
          }}
          role="dialog"
          aria-modal="true"
          aria-label={typeof title === 'string' ? title : undefined}
          className={cn(
            'relative z-50 w-full mx-4',
            sizeStyles[size],
            'rounded-xl',
            'bg-surface-container-lowest text-on-surface',
            'border border-outline-variant/20',
            'shadow-lg',
            'animate-in fade-in zoom-in-95 duration-200',
            className,
          )}
          {...props}
        >
          {/* Header */}
          {(title != null) && (
            <div className="flex items-center justify-between border-b border-outline-variant/20 px-6 py-4">
              <h2 className="font-epilogue font-bold text-lg text-on-surface">
                {title}
              </h2>
              <button
                type="button"
                onClick={onClose}
                className={cn(
                  'inline-flex items-center justify-center rounded-lg p-1.5',
                  'text-on-surface-variant hover:text-on-surface',
                  'hover:bg-surface-container-high',
                  'transition-colors',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
                )}
                aria-label="Close"
              >
                <CloseIcon className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Close button when no title */}
          {title == null && (
            <div className="absolute top-3 right-3">
              <button
                type="button"
                onClick={onClose}
                className={cn(
                  'inline-flex items-center justify-center rounded-lg p-1.5',
                  'text-on-surface-variant hover:text-on-surface',
                  'hover:bg-surface-container-high',
                  'transition-colors',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
                )}
                aria-label="Close"
              >
                <CloseIcon className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Body */}
          <div className="px-6 py-4 font-manrope text-on-surface-variant overflow-y-auto max-h-[70vh]">
            {children}
          </div>

          {/* Footer */}
          {footer && (
            <div className="flex items-center justify-end gap-3 border-t border-outline-variant/20 px-6 py-4">
              {footer}
            </div>
          )}
        </div>
      </div>
    )
  },
)

Modal.displayName = 'Modal'
