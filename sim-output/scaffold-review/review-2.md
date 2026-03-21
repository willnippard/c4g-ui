# @c4g/ui Scaffold Review — Round 2

**Reviewer:** Senior Front-End Architect
**Date:** 2026-03-20
**Base:** Round 1 review (17 issues: 3 critical, 8 major, 6 minor)

---

## Verdict: APPROVED (with 3 minor items for backlog)

All 3 critical and 8 major issues from round 1 are properly fixed. No regressions. The library now builds correctly, ships CSS + JS + type declarations + Tailwind preset, and the consumer story is well-documented in the README. The remaining items are all minor and safe to ship in v0.1.0.

---

## Round 1 Issue Verification

### CRITICAL — all fixed

| ID | Issue | Status | Notes |
|----|-------|--------|-------|
| C1 | No CSS emitted in build | **Fixed** | `src/index.ts:1` imports `./styles/globals.css`. `dist/style.css` exists (11 KB) with all Tailwind utilities used by components. |
| C2 | No Tailwind preset export | **Fixed** | `src/tailwind-preset.ts` exports `c4gPreset`. Vite config has dual entry points. `package.json` exports `./tailwind-preset` with types/import/require. `dist/tailwind-preset.js`, `.cjs`, `.d.ts` all present. README documents usage. |
| C3 | `tailwind.config.ts` uses CJS syntax | **Fixed** | Now uses `import type { Config }` and `export default config`. |

### MAJOR — all fixed

| ID | Issue | Status | Notes |
|----|-------|--------|-------|
| M1 | `.dark body` selector broken | **Fixed** | `src/styles/globals.css:10-12` now uses `.dark { ... }` — matches both Storybook decorator and consumer `<html class="dark">`. |
| M2 | clsx/tailwind-merge in both deps and devDeps | **Fixed** | Only in `dependencies` now (`package.json:67-69`). Removed from `devDependencies`. |
| M3 | tailwindcss not a peer dep | **Fixed** | Added as optional peer dep (`package.json:37,39-42`). |
| M4 | Input lacks `aria-describedby` | **Fixed** | `src/components/Input/Input.tsx:14-18,34` — `descriptionId` computed correctly, applied to `<input>`, and matching `id` attrs on error/helper `<p>` elements. |
| M5 | Input lacks `aria-invalid` | **Fixed** | `src/components/Input/Input.tsx:33` — `aria-invalid={!!error || undefined}`. Good use of `|| undefined` to avoid rendering `aria-invalid="false"`. |
| M6 | Button `pointer-events-none` on disabled | **Fixed** | `src/components/Button/Button.tsx:33` — now `'opacity-50 cursor-not-allowed'` only. |
| M7 | No ESLint config | **Fixed** | `eslint.config.mjs` added with TS + React Hooks rules. Lint script updated to `"eslint ."` (flat config, no `--ext` needed). |
| M8 | `sideEffects` misleading | **Fixed** | Now correct — CSS is emitted, so `"sideEffects": ["**/*.css"]` serves its purpose. |

### MINOR — 5 of 6 fixed

| ID | Issue | Status | Notes |
|----|-------|--------|-------|
| m1 | Variant maps use `Record<string, string>` | **Fixed** | Both `Button.tsx:9` and `Badge.tsx:8` now use `Record<NonNullable<Props['variant']>, string>`. `sizeStyles` in Button also fixed. |
| m2 | Input ID derived from label text | **Fixed** | `src/components/Input/Input.tsx:1,12-13` — now uses `useId()` from React 18. |
| m3 | Card story JSX in args | **Not fixed** | `src/components/Card/Card.stories.tsx:29` still has `footer: <button ...>` in args. Low priority — no runtime impact. |
| m4 | No README consumer docs | **Fixed** | Comprehensive README with install, CSS import, Tailwind preset, fonts, usage example, component list, dev commands. |
| m5 | `postcss.config.js` ESM extension | **Fixed** | Renamed to `postcss.config.mjs`. |
| m6 | Google Fonts in library CSS | **Fixed** | Fonts extracted to `src/styles/fonts.css` with opt-in documentation. Storybook imports it in `preview.ts:3`. Library CSS (`globals.css`) no longer bundles the `@import url(...)`. |

---

## Build Output Verification

Verified `dist/` contains all expected artifacts:

| File | Purpose | Present |
|------|---------|---------|
| `c4g-ui.js` | ESM bundle | Yes (82 KB) |
| `c4g-ui.cjs` | CJS bundle | Yes (29 KB) |
| `style.css` | Component styles + Tailwind utilities | Yes (11 KB) |
| `index.d.ts` | Type declarations entry | Yes |
| `index.d.ts.map` | Source map for types | Yes |
| `tailwind-preset.js` | ESM preset | Yes |
| `tailwind-preset.cjs` | CJS preset | Yes |
| `tailwind-preset.d.ts` | Preset type declaration | Yes |
| `tailwind-preset.d.ts.map` | Source map | Yes |
| `components/` | Component type declarations | Yes |
| `lib/` | Utility type declarations | Yes |

`dist/tailwind-preset.js` correctly exports `c4gPreset` with all design tokens (colors, fontFamily, borderRadius). The `darkMode` field is included, which is correct for a preset.

`dist/style.css` contains: Tailwind preflight/reset, `@layer base` body + dark mode rules, and all utility classes used by Button, Card, Badge, and Input components (verified: `.bg-primary`, `.rounded-ethos`, `.dark\:bg-card-dark`, `.border-red-500`, etc.).

`dist/index.d.ts` exports all component types: `ButtonProps`, `CardProps`, `BadgeProps`, `InputProps`, `cn`.

---

## New Issues (not in round 1)

### m7. Tailwind preflight (CSS reset) ships in library CSS

**Severity:** Minor
**File:** `src/styles/globals.css:1`, `dist/style.css`

`@tailwind base;` includes Tailwind's full preflight reset (~4 KB of the 11 KB `style.css`). This applies a CSS reset (box-sizing, margin removal, font normalization, etc.) to the consumer's entire page.

- If the consumer uses Tailwind, this is harmless (idempotent reset applied twice).
- If the consumer does NOT use Tailwind, this reset could unexpectedly change their app's styling.

This is standard for Tailwind-based component libraries, but it's worth noting in docs.

**Fix (low priority):** Add a note to the README that `styles.css` includes Tailwind's base reset. Alternatively, for a future version, consider splitting into `@c4g/ui/styles.css` (components only) and `@c4g/ui/base.css` (with reset). No action needed for v0.1.0.

### m8. Design tokens duplicated between `tailwind.config.ts` and `tailwind-preset.ts`

**Severity:** Minor
**File:** `tailwind.config.ts:7-54`, `src/tailwind-preset.ts:5-54`

The color, font, and border-radius tokens are defined identically in both files. If one changes without the other, they'll drift. The internal `tailwind.config.ts` should consume its own preset.

**Fix:**

```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss'
import { c4gPreset } from './src/tailwind-preset'

const config: Config = {
  presets: [c4gPreset as Config],
  content: ['./src/**/*.{ts,tsx}', './.storybook/**/*.{ts,tsx}'],
  plugins: [],
}

export default config
```

### m9. Card story still has JSX in args (carried from m3)

**Severity:** Minor
**File:** `src/components/Card/Card.stories.tsx:29`

No change from round 1. The `footer` prop is JSX in the `args` object, making it non-editable in Storybook's controls panel. Use a `render` function instead:

```tsx
export const WithHeaderAndFooter: Story = {
  args: { header: 'Card Title', children: 'This is the card body content.' },
  render: (args) => (
    <Card {...args} footer={<button className="text-sm text-primary hover:underline">Read more</button>} />
  ),
}
```

---

## Accessibility Audit

The accessibility fixes are correctly implemented:

- **`aria-invalid`** (`Input.tsx:33`): Uses `!!error || undefined` — renders `aria-invalid="true"` when error is present, omits the attribute entirely when no error (avoids noisy `aria-invalid="false"`). Correct.
- **`aria-describedby`** (`Input.tsx:14-18,34`): Properly computed — points to error `<p>` when error exists, helper `<p>` when only helper text exists, `undefined` when neither. IDs match between the `<input>` and descriptive `<p>` elements. Correct.
- **Error `role="alert"`** (`Input.tsx:46`): The error `<p>` has `role="alert"`, ensuring screen readers announce errors when they appear. Correct.
- **`useId()`** (`Input.tsx:1,12-13`): Generates unique IDs per component instance, preventing duplicate ID collisions. Correct.
- **Disabled button** (`Button.tsx:33,36`): Uses native `disabled` attribute + visual styling. No `pointer-events-none`. Keyboard and assistive tech can still detect the button. Correct.

---

## README Accuracy Check

The README (`README.md`) is accurate:

- **Install command**: `npm install @c4g/ui` — correct package name matches `package.json`.
- **CSS import**: `import '@c4g/ui/styles.css'` — matches `package.json` export `"./styles.css": "./dist/style.css"` and `dist/style.css` exists.
- **Tailwind preset**: `import { c4gPreset } from '@c4g/ui/tailwind-preset'` — matches `package.json` export and `dist/tailwind-preset.js` named export.
- **Fonts section**: Correctly describes fonts as opt-in, provides CDN and self-host options, mentions GDPR. Does NOT claim fonts are bundled in `styles.css` (accurate — they're not).
- **Usage example**: Imports `Button`, `Card`, `Badge`, `Input` — all exported from `src/index.ts`. Correct.
- **Component list**: All 4 components with accurate variant/prop descriptions.
- **Dev commands**: `npm run dev` (Storybook), `npm run build`, `npm run build-storybook`, `npm run lint` — all match `package.json` scripts.

---

## Summary

| Severity | Round 1 | Fixed | New | Open |
|----------|---------|-------|-----|------|
| CRITICAL | 3 | 3 | 0 | **0** |
| MAJOR | 8 | 8 | 0 | **0** |
| MINOR | 6 | 5 | 2 | **3** (m3/m9, m7, m8) |

All blocking issues resolved. The 3 remaining minor items are safe to defer to a future PR. The library is ready to ship as v0.1.0.

### What improved since round 1:
- Clean consumer experience: CSS, types, and preset all ship correctly
- Proper accessibility on Input (aria-describedby, aria-invalid, role="alert", useId)
- Font loading is opt-in — no GDPR surprises
- ESLint with flat config, TypeScript, and React Hooks rules
- README is comprehensive and accurate
- Typed variant maps catch typos at compile time
