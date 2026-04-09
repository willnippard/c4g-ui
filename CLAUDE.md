# CLAUDE.md — @c4g/ui

## Project overview

React component library for Code4Good. Provides reusable, accessible UI components with dark mode support.

**Stack:** React 18/19, TypeScript, Tailwind CSS 3.4, Storybook 10, Vite 6, Vitest 4

## Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Storybook dev server (port 6006) |
| `npm run build` | Build library (tsc types + Vite bundle) |
| `npm run build-storybook` | Static Storybook site |
| `npm run lint` | ESLint |
| `npm run test` | Vitest (watch mode) |
| `npm run test:run` | Vitest (single run, CI) |

## Architecture

- **Not a monorepo** — single package, npm as package manager
- Dual-format output: ESM + CJS (`dist/`)
- Tailwind preset exported separately for consumer apps (`@c4g/ui/tailwind-preset`)
- Dark mode via `.dark` class on ancestor element

### File structure

```
src/
  components/    # One folder per component: Component.tsx, index.ts, Component.stories.tsx, Component.test.tsx
  lib/
    utils.ts     # cn() — clsx + tailwind-merge helper
    icons.tsx    # Shared icon components (CloseIcon, ChevronDownIcon, CheckIcon, etc.)
  styles/        # globals.css (Tailwind base), fonts.css (Google Fonts, optional)
  test/setup.ts  # Vitest setup (jest-dom + vitest-axe matchers)
  index.ts       # Public API barrel export
  tailwind-preset.ts  # Design tokens for consumer Tailwind configs (uses CSS vars)
.github/workflows/ci.yml  # CI pipeline (lint, test, build)
```

### Components

Each component uses `forwardRef`, typed variant props (union types), and follows this pattern. All size/density presets are standardized to `sm | md | lg`.

- `Accordion` — collapsible content panels with single or multiple open mode; sm/md/lg
- `Alert` — dismissible status banner with optional action button; success/error/warning/info, sm/md/lg
- `Avatar` — user image with initials fallback; square/rounded variants, sm/md/lg
- `Badge` — inline pill label; primary/accent/muted, sm/md/lg
- `Breadcrumbs` — navigation trail with custom separator and optional item icons; sm/md/lg
- `Button` — primary/secondary/accent, sm/md/lg (also has density prop)
- `Card` — content container with media/header/body/footer slots, sm/md/lg
- `Checkbox` — checkbox input with label, description, error, and indeterminate state; sm/md/lg
- `DataTable` — generic data table with sortable columns, empty state, and caption; sm/md/lg
- `DataTableAdvanced` — wraps `DataTable` adding global search, per-column filters, and filter chips; sm/md/lg
- `DropdownMenu` — trigger-activated menu with items, dividers, and danger styling; left/right align, sm/md/lg
- `EmptyState` — placeholder with icon, title, description, and action slot; sm/md/lg
- `FAB` — floating action button with configurable icon and screen position; sm/md/lg, fixed/inline
- `HoverCard` — profile-style popup card (avatar, name, status, action) shown via `HoverCardTrigger` on hover/focus; sm/md/lg
- `ImpactCard` — stat highlight card with label, large stat number, description, and progress bar; sm/md/lg
- `Toast` (alias `ImpactToast`) — notification toast with title, description, and dismiss; success/error/warning/info/impact, sm/md/lg
- `Input` — text input with label, error, helper text, aria attributes, auto-generated IDs via `useId()`; sm/md/lg
- `Modal` — dialog overlay with title, footer slots, close-on-overlay/escape support; sm/md/lg
- `Pagination` — page navigation with prev/next, numbered pages, ellipsis, and configurable sibling count; sm/md/lg
- `ProgressBar` — determinate progress indicator with label and percentage display; primary/accent/error, sm/md/lg
- `ProjectCard` — project showcase card with image, status badge, avatar stack, and details action; sm/md/lg
- `RadioGroup` — fieldset of radio options with legend, descriptions, error, vertical/horizontal orientation; sm/md/lg
- `Select` — native dropdown with label, placeholder, error, helper text, auto-generated IDs; sm/md/lg
- `Skeleton` — loading placeholder with text, rectangular, and rounded variants; sm/md/lg
- `Stepper` — multi-step progress indicator with horizontal/vertical orientation and clickable steps; sm/md/lg
- `Tabs` — tabbed navigation with icons and keyboard arrow-key support; sm/md/lg
- `Textarea` — multiline text input with label, error, helper text; sm/md/lg
- `Toggle` — switch input with label; sm/md (track size), sm/md/lg (density)
- `Tooltip` — hover/focus popup with configurable position and delay; top/bottom/left/right, sm/md/lg
- `TopNavBar` — fixed top navigation bar with brand, nav links, and action button; sm/md/lg. Decomposed into internal sub-components: `BrandSection`, `DesktopNav`, `MobileNav`, `types.ts`
- `SideNavBar` — vertical sidebar navigation with brand header, nav items, footer links, and CTA button; sm/md/lg

## Conventions

- **Commits:** semantic prefixes (`feat:`, `fix:`)
- **Accessibility:** aria attributes, focus rings, semantic HTML
- **Styling:** Tailwind utility classes, CSS custom properties for theming (`globals.css`), design tokens in `tailwind.config.ts`
- **Design tokens:** primary green (#2A6B3F), accent gold (#D4A32A), fonts: Epilogue (display), Manrope (body)
- **Dark mode:** Colors are defined as CSS custom properties in `src/styles/globals.css` (`:root` for light, `.dark` for dark). The Tailwind config references these variables. Components use semantic token classes (e.g. `bg-primary`, `text-on-surface`) — **never** use `dark:` prefixes or hardcoded hex values.
- **Sizing:** All components use `sm | md | lg` for size and density presets. This is a library-wide standard — no component should use compact/spacious/zoomed/condensed.
- **Exports:** all public components and types re-exported from `src/index.ts`

## Accessibility requirements

**After every significant update to any component, run an accessibility audit.** This is mandatory, not optional.

- All text must meet **WCAG AA contrast ratios**: 4.5:1 for normal text, 3:1 for large text (≥18px or ≥14px bold)
- Verify contrast in **both light and dark modes** — CSS variables swap colors between themes, so a passing light mode does not guarantee dark mode passes
- Disabled states use `opacity-60` (not `opacity-50`) to preserve contrast
- Storybook includes `@storybook/addon-a11y` — use the Accessibility panel to check for violations
- Common pitfalls:
  - Gold/amber backgrounds with white text (use dark text instead)
  - Tokens that invert in dark mode (e.g. `on-surface` becomes light — don't pair with `text-white`)
  - `opacity-*` modifiers that degrade already-borderline ratios
  - Use `inverse-surface` / `inverse-on-surface` for elements that should stay contrasty in both themes
