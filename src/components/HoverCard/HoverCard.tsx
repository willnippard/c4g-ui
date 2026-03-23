import {
  type HTMLAttributes,
  type ReactNode,
  forwardRef,
  useCallback,
  useRef,
  useState,
} from "react";
import { cn } from "../../lib/utils";

/* ─── HoverCard (the popup content) ──────────────────────────── */

export interface HoverCardProps extends HTMLAttributes<HTMLDivElement> {
  /** Full name displayed as the heading */
  name: string;
  /** Avatar image URL */
  imageSrc: string;
  /** Alt text for the avatar image */
  imageAlt?: string;
  /** Secondary text line (e.g. DOB, role) */
  subtitle?: string;
  /** Status indicator with label and optional variant */
  status?: {
    label: string;
    variant?: "active" | "warning" | "error";
  };
  /** Action link text */
  actionLabel?: string;
  /** Action link href */
  actionHref?: string;
  /** Action click handler (used if no actionHref) */
  onAction?: () => void;
  /** Size preset */
  size?: "sm" | "md" | "lg";
}

const sizeConfig = {
  sm: {
    card: "rounded-xl p-4 gap-4 flex-row min-w-[280px]",
    imageWrap: "w-20",
    imageAbsolute: true,
    image: "rounded-lg",
    name: "text-base",
    subtitle: "text-xs",
    status: "text-xs gap-1.5",
    statusDot: "w-2 h-2",
    action: "text-sm",
    contentGap: "gap-2",
  },
  md: {
    card: "rounded-xl p-8 gap-8 flex-row min-w-[360px]",
    imageWrap: "w-28",
    imageAbsolute: true,
    image: "rounded-xl",
    name: "text-xl",
    subtitle: "text-sm",
    status: "text-sm gap-2",
    statusDot: "w-2.5 h-2.5",
    action: "text-base",
    contentGap: "gap-3",
  },
  lg: {
    card: "rounded-2xl p-12 gap-12 flex-col md:flex-row min-w-[480px]",
    imageWrap: "w-full md:w-64 md:h-auto",
    imageAbsolute: false,
    image: "rounded-2xl",
    name: "text-3xl font-black",
    subtitle: "text-lg",
    status: "text-xl gap-3",
    statusDot: "w-4 h-4",
    action: "text-2xl font-black",
    contentGap: "gap-6",
  },
} as const;

const statusConfig = {
  active: {
    text: "text-primary",
    icon: (cls: string) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        className={cn("text-primary shrink-0", cls)}
      >
        <circle cx="12" cy="12" r="10" />
      </svg>
    ),
  },
  warning: {
    text: "text-tertiary",
    icon: (cls: string) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        className={cn("text-tertiary shrink-0", cls)}
      >
        <path d="M1 21h22L12 2 1 21z" />
      </svg>
    ),
  },
  error: {
    text: "text-error",
    icon: (cls: string) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
        className={cn("text-error shrink-0", cls)}
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="15" y1="9" x2="9" y2="15" />
        <line x1="9" y1="9" x2="15" y2="15" />
      </svg>
    ),
  },
} as const;

export const HoverCard = forwardRef<HTMLDivElement, HoverCardProps>(
  (
    {
      className,
      name,
      imageSrc,
      imageAlt,
      subtitle,
      status,
      actionLabel,
      actionHref,
      onAction,
      size = "md",
      ...props
    },
    ref,
  ) => {
    const config = sizeConfig[size];
    const statusVariant = statusConfig[status?.variant ?? "active"];

    const actionElement =
      actionLabel &&
      (actionHref ? (
        <a
          href={actionHref}
          className={cn(
            "font-bold text-primary hover:underline underline-offset-4 inline-block transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm",
            config.action,
          )}
        >
          {actionLabel}
        </a>
      ) : (
        <button
          type="button"
          onClick={onAction}
          className={cn(
            "font-bold text-primary hover:underline underline-offset-4 inline-block transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm",
            config.action,
          )}
        >
          {actionLabel}
        </button>
      ));

    return (
      <div
        ref={ref}
        className={cn(
          "bg-surface-container-lowest flex shadow-xl shadow-on-surface/5 border border-outline-variant/20 w-fit",
          config.card,
          className,
        )}
        {...props}
      >
        {config.imageAbsolute ? (
          <div className={cn("relative shrink-0 self-stretch overflow-hidden", config.imageWrap, config.image)}>
            <img
              src={imageSrc}
              alt={imageAlt || name}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        ) : (
          <img
            src={imageSrc}
            alt={imageAlt || name}
            className={cn("w-full object-cover shrink-0", config.image)}
          />
        )}
        <div className={cn("flex flex-col justify-center", config.contentGap)}>
          <div>
            <h3
              className={cn(
                "font-epilogue font-bold text-on-surface leading-tight truncate",
                config.name,
              )}
            >
              {name}
            </h3>
            {subtitle && (
              <p
                className={cn(
                  "text-on-surface-variant font-medium truncate",
                  config.subtitle,
                )}
              >
                {subtitle}
              </p>
            )}
          </div>
          {(status || actionLabel) && (
            <div className="space-y-1.5">
              {status && (
                <div className={cn("flex items-center", config.status)}>
                  {statusVariant.icon(config.statusDot)}
                  <span className={cn("font-medium", statusVariant.text)}>
                    {status.label}
                  </span>
                </div>
              )}
              {actionElement}
            </div>
          )}
        </div>
      </div>
    );
  },
);

HoverCard.displayName = "HoverCard";

/* ─── HoverCardTrigger (wraps inline text + shows card on hover/focus) ── */

export interface HoverCardTriggerProps {
  /** The inline trigger content (usually a name) */
  children: ReactNode;
  /** The HoverCard content to display */
  card: ReactNode;
  /** Additional classes for the trigger text */
  className?: string;
  /** Delay before showing the card (ms) */
  openDelay?: number;
  /** Delay before hiding the card (ms) */
  closeDelay?: number;
}

export const HoverCardTrigger = forwardRef<
  HTMLSpanElement,
  HoverCardTriggerProps
>(({ children, card, className, openDelay = 300, closeDelay = 200 }, ref) => {
  const [open, setOpen] = useState(false);
  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = useCallback(() => {
    if (openTimer.current) clearTimeout(openTimer.current);
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  const handleOpen = useCallback(() => {
    clearTimers();
    openTimer.current = setTimeout(() => setOpen(true), openDelay);
  }, [clearTimers, openDelay]);

  const handleClose = useCallback(() => {
    clearTimers();
    closeTimer.current = setTimeout(() => setOpen(false), closeDelay);
  }, [clearTimers, closeDelay]);

  return (
    <span
      ref={ref}
      className="relative inline"
      onMouseEnter={handleOpen}
      onMouseLeave={handleClose}
      onFocus={handleOpen}
      onBlur={handleClose}
    >
      <span
        tabIndex={0}
        role="button"
        aria-expanded={open}
        className={cn(
          "font-semibold text-on-surface cursor-pointer transition-all duration-200",
          "decoration-primary/40 underline underline-offset-4 decoration-dotted decoration-2",
          "hover:text-primary hover:decoration-primary hover:decoration-solid",
          "focus-visible:text-primary focus-visible:decoration-primary focus-visible:decoration-solid",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:rounded-sm",
          className,
        )}
      >
        {children}
      </span>
      {open && (
        <div
          role="tooltip"
          className="absolute left-0 top-full mt-2 z-50 animate-in fade-in"
          onMouseEnter={handleOpen}
          onMouseLeave={handleClose}
        >
          {card}
        </div>
      )}
    </span>
  );
});

HoverCardTrigger.displayName = "HoverCardTrigger";
