# CLAUDE.md — @c4g/ui

## Project overview

React component library for Code4Good. Provides reusable, accessible UI components with dark mode support.

**Stack:** React 18/19, TypeScript, Tailwind CSS, Storybook 8, Vite 6

## Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Storybook dev server (port 6006) |
| `npm run build` | Build library (tsc types + Vite bundle) |
| `npm run build-storybook` | Static Storybook site |
| `npm run lint` | ESLint |

## Architecture

- **Not a monorepo** — single package, npm as package manager
- Dual-format output: ESM + CJS (`dist/`)
- Tailwind preset exported separately for consumer apps (`@c4g/ui/tailwind-preset`)
- Dark mode via `.dark` class on ancestor element

### File structure

```
src/
  components/    # One folder per component: Component.tsx, index.ts, Component.stories.tsx
  lib/utils.ts   # cn() — clsx + tailwind-merge helper
  styles/        # globals.css (Tailwind base), fonts.css (Google Fonts, optional)
  index.ts       # Public API barrel export
  tailwind-preset.ts  # Design tokens for consumer Tailwind configs
```

### Components

Each component uses `forwardRef`, typed variant props (union types), and follows this pattern:
- `Button` — primary/secondary/accent, sm/md/lg
- `Card` — header/body/footer slots
- `Badge` — primary/accent/muted
- `Input` — label, error, helper text, aria attributes, auto-generated IDs via `useId()`

## Conventions

- **Commits:** semantic prefixes (`feat:`, `fix:`)
- **Accessibility:** aria attributes, focus rings, semantic HTML
- **Styling:** Tailwind utility classes, CSS custom properties for theming (`globals.css`), design tokens in `tailwind.config.ts`
- **Design tokens:** primary green (#2A6B3F), accent gold (#D4A32A), fonts: Epilogue (display), Manrope (body)
- **Dark mode:** Colors are defined as CSS custom properties in `src/styles/globals.css` (`:root` for light, `.dark` for dark). The Tailwind config references these variables. Components use semantic token classes (e.g. `bg-primary`, `text-on-surface`) — **never** use `dark:` prefixes or hardcoded hex values.
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
