# @c4g/ui Scaffold Review

**Reviewer:** Senior Front-End Architect
**Date:** 2026-03-20
**Commit:** `29083a2` (feat: scaffold @c4g/ui component library)

---

## Verdict: NEEDS REVISION

The foundation has good bones — forwardRef usage, cn() utility, Storybook 8 + a11y addon, proper peer deps, and a sensible project structure. But there are several issues that will break consumers or cause subtle runtime bugs. The most critical: **the library ships no CSS**, so every consuming app will get unstyled components.

---

## CRITICAL Issues (blocks shipping)

### C1. No CSS is emitted in the build

**Files:** `src/index.ts:1-6`, `vite.config.ts:11-17`, `package.json:15`

`src/index.ts` does not import `./styles/globals.css`. In Vite library mode, CSS is only extracted to `dist/style.css` if it's imported in the entry module. The build completes without error, but `dist/style.css` does not exist.

Meanwhile, `package.json` exports `"./styles.css": "./dist/style.css"` — a path that doesn't exist. Any consumer doing `import '@c4g/ui/styles.css'` will get a module-not-found error.

**Verified:** Ran `npx vite build` — output is `c4g-ui.js` and `c4g-ui.cjs` only. No `style.css`.

**Fix:**
Add to `src/index.ts` line 1:
```ts
import './styles/globals.css'
```

### C2. Tailwind classes are baked in but CSS utilities are missing

**Files:** `src/components/Button/Button.tsx`, all component files

Even after fixing C1, the emitted `style.css` will only contain the `@layer base` rules from `globals.css`. Tailwind utility classes used in components (e.g., `bg-primary`, `rounded-ethos`, `px-3`, `py-2`) are scanned at **library build time** against the `content` glob in `tailwind.config.ts`. However, in Vite library mode, the CSS output is the result of processing the imported CSS file through PostCSS/Tailwind — so the utilities _should_ be included if the content paths match.

The real problem surfaces for consumers: the library ships a **pre-built CSS file** containing all used utility classes. This is correct for the library's own classes, but:

1. Consumer `className` overrides (e.g., `<Button className="mt-4">`) will NOT work unless the consumer's own Tailwind setup scans their own code. This is fine and expected, but **must be documented**.
2. The library's `tailwind.config.ts` design tokens (colors, fonts, borderRadius) are NOT available to the consumer unless they extend their own Tailwind config with the same values.

**Fix:**
1. Export the Tailwind preset from the package so consumers can do:
```ts
// consumer's tailwind.config.ts
import { c4gPreset } from '@c4g/ui/tailwind-preset'
export default { presets: [c4gPreset], ... }
```
2. Add a `"./tailwind-preset"` export to `package.json`.
3. At minimum, document the CSS import requirement in README:
```md
import '@c4g/ui/styles.css'
```

### C3. `tailwind.config.ts` uses CommonJS syntax in a TypeScript file

**File:** `tailwind.config.ts:2`

```ts
/** @type {import('tailwindcss').Config} */
module.exports = {
```

This file has a `.ts` extension but uses `module.exports` (CommonJS). The JSDoc `@type` annotation is also unnecessary in a TypeScript file. Tailwind v3 with `ts` configs expects `export default` (via `ts-node` or similar). This currently works because Vite's internal Tailwind integration handles it, but it will break if:
- A consumer tries to import this config as a Tailwind preset (see C2)
- The project migrates to Tailwind v4
- Any tooling loads this as an actual TypeScript module

**Fix:**
```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx}', './.storybook/**/*.{ts,tsx}'],
  theme: { ... },
  plugins: [],
}

export default config
```

---

## MAJOR Issues (should fix before v0.1.0)

### M1. Dark mode CSS rule `.dark body` won't work in Storybook or in most apps

**File:** `src/styles/globals.css:12-14`

```css
.dark body {
  @apply text-foreground-dark bg-background-dark;
}
```

The Storybook theme decorator (`withThemeByClassName`) adds the `dark` class to the **story root element** (a `div` inside the iframe `body`), not to an ancestor of `body`. So `.dark body` (meaning "a `body` inside an element with class `dark`") will never match in Storybook.

In consuming apps, `dark` class is typically applied to `<html>` or `<body>` itself (e.g., `<html class="dark">`). The selector `.dark body` would match `<html class="dark"><body>`, which works for `<html>` but NOT if `dark` is on `<body>` itself.

More importantly, component-level dark styles use `dark:` Tailwind prefix (which targets `.dark &` or ancestors with `.dark`), which is correct. But the global `body` styling is disconnected from how Storybook applies the class.

**Fix:**
Replace the `.dark body` rule with Tailwind's `dark:` variant applied directly, or restructure to use CSS variables so dark mode is handled consistently:

```css
@layer base {
  body {
    @apply font-manrope text-foreground bg-background antialiased;
  }
  .dark {
    @apply text-foreground-dark bg-background-dark;
  }
}
```

Or better yet, use CSS custom properties so consumers get automatic dark mode without class-specific overrides on every component.

### M2. `clsx` and `tailwind-merge` are duplicated in `dependencies` and `devDependencies`

**File:** `package.json:41-42, 55-56`

Both `clsx` and `tailwind-merge` appear in **both** `dependencies` and `devDependencies`. Since they're used in the library's runtime code (the `cn()` utility is exported and used by components), they correctly belong in `dependencies`. The `devDependencies` entries are redundant and confusing.

**Fix:** Remove `clsx` and `tailwind-merge` from `devDependencies` (lines 41-42).

### M3. `tailwindcss` is not a peer dependency

**File:** `package.json:29-32`

If consumers need to extend the C4G Tailwind config (see C2) or if any consuming app uses Tailwind (likely for all C4G apps), `tailwindcss` should be listed as an **optional** peer dependency so version conflicts don't occur.

**Fix:**
```json
"peerDependencies": {
  "react": "^18.0.0 || ^19.0.0",
  "react-dom": "^18.0.0 || ^19.0.0",
  "tailwindcss": "^3.4.0"
},
"peerDependenciesMeta": {
  "tailwindcss": { "optional": true }
}
```

### M4. Input error/helper text lacks `aria-describedby`

**File:** `src/components/Input/Input.tsx:37-42`

The error and helper text are visually associated with the input but not programmatically. Screen readers won't announce the error message when the input is focused.

**Fix:**
```tsx
const descriptionId = error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined

<input
  aria-describedby={descriptionId}
  aria-invalid={!!error}
  ...
/>
{error && <p id={`${inputId}-error`} role="alert" className="...">}
{helperText && !error && <p id={`${inputId}-helper`} className="...">}
```

### M5. Input error state has no `aria-invalid`

**File:** `src/components/Input/Input.tsx:23-35`

When `error` is truthy, the input gets a red border but doesn't set `aria-invalid="true"`. This is required for accessibility — screen readers and automated tools rely on this attribute.

**Fix:** Add `aria-invalid={!!error}` to the `<input>` element (pairs with M4 fix).

### M6. Button `disabled` uses `pointer-events-none` — breaks accessibility

**File:** `src/components/Button/Button.tsx:33`

```ts
disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
```

`pointer-events-none` removes the button from the pointer event model entirely. This means:
- Tooltips explaining _why_ a button is disabled won't work (no hover events)
- In some assistive technology configurations, `pointer-events-none` can interfere with click detection

The `disabled` HTML attribute already prevents form submission and keyboard activation. Using `cursor-not-allowed` without `pointer-events-none` is sufficient for visual feedback.

**Fix:** Remove `pointer-events-none` from the disabled class string.

### M7. No ESLint config despite having a `lint` script

**File:** `package.json:27`

```json
"lint": "eslint . --ext .ts,.tsx"
```

No `.eslintrc.*` or `eslint.config.*` file exists. Running `npm run lint` will either error or use an empty config that catches nothing. For an open-source nonprofit project with volunteer contributors, linting is important.

**Fix:** Add an `eslint.config.mjs` with a reasonable TypeScript + React config, or remove the lint script until one is set up.

### M8. No `style.css` in build output means the `sideEffects` field is misleading

**File:** `package.json:20-22`

```json
"sideEffects": ["**/*.css"]
```

This tells bundlers "CSS imports have side effects, don't tree-shake them." But since the library doesn't emit any CSS file (see C1), this field currently does nothing. After fixing C1, this becomes correct and necessary.

---

## MINOR Issues (nice to have)

### m1. Variant style maps use `Record<string, string>` instead of typed keys

**Files:** `src/components/Button/Button.tsx:9`, `src/components/Badge/Badge.tsx:8`

```ts
const variantStyles: Record<string, string> = { ... }
```

Using `Record<string, string>` means `variantStyles['typo']` returns `undefined` without a type error. Should use the variant union type:

```ts
const variantStyles: Record<NonNullable<ButtonProps['variant']>, string> = { ... }
```

### m2. Input `id` generation from label is fragile

**File:** `src/components/Input/Input.tsx:12`

```ts
const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')
```

If two inputs on the same page have the same label (e.g., two "Email" fields in different forms), they'll get duplicate IDs. Consider using `React.useId()` (React 18+) as a fallback instead of deriving from label text.

### m3. Card story uses JSX in args object

**File:** `src/components/Card/Card.stories.tsx:29`

```tsx
footer: <button className="text-sm text-primary hover:underline">Read more</button>,
```

This works but isn't ideal for Storybook controls — the footer prop won't be editable in the controls panel since it's JSX. Consider using a render function instead:

```tsx
export const WithHeaderAndFooter: Story = {
  args: { header: 'Card Title', children: 'Card body.' },
  render: (args) => (
    <Card {...args} footer={<button className="text-sm text-primary hover:underline">Read more</button>} />
  ),
}
```

### m4. No `README.md` usage instructions for consumers

**File:** `README.md` (not reviewed, but should include)

The README should document:
1. `npm install @c4g/ui`
2. `import '@c4g/ui/styles.css'` in app entry
3. How to configure Tailwind preset (once C2 is resolved)
4. Link to Storybook for component docs

### m5. `postcss.config.js` uses ESM syntax but has `.js` extension

**File:** `postcss.config.js:1`

```js
export default {
```

Since `package.json` has `"type": "module"`, this works. But some tools (e.g., older PostCSS versions) may not resolve ESM from `.js` correctly. Minor risk — just noting for awareness.

### m6. Font loading via Google Fonts CDN in `globals.css`

**File:** `src/styles/globals.css:1`

```css
@import url('https://fonts.googleapis.com/css2?...');
```

This means every consumer will make a request to Google Fonts. For a component library, consider:
- Making font loading opt-in (separate import)
- Documenting that consumers may want to self-host fonts for GDPR compliance or performance
- Not bundling font imports in the library CSS at all — let consuming apps handle their own font loading

---

## Summary

| Severity | Count | Issues |
|----------|-------|--------|
| CRITICAL | 3     | C1, C2, C3 |
| MAJOR    | 8     | M1-M8 |
| MINOR    | 6     | m1-m6 |

### Priority fix order:
1. **C1** — Add CSS import to entry (5 min fix, completely unblocks consumers)
2. **C3** — Fix tailwind config syntax (5 min)
3. **M1** — Fix dark mode global CSS selector (10 min)
4. **M4/M5** — Add aria-describedby and aria-invalid to Input (10 min)
5. **M6** — Remove pointer-events-none from disabled button (2 min)
6. **M2** — Deduplicate clsx/tailwind-merge in package.json (2 min)
7. **C2** — Export Tailwind preset for consumers (30 min, can defer to v0.2.0 if documented)
8. **M7** — Add ESLint config (15 min)
9. **M3** — Add tailwindcss as optional peer dep (2 min)

### What's done well:
- Clean component structure with barrel exports
- Proper `forwardRef` + `displayName` on all components
- `cn()` utility using clsx + tailwind-merge is the right pattern
- Storybook 8 with a11y addon and theme decorator
- React 18+19 peer dep range is forward-thinking
- `exports` field in package.json with conditional exports
- Design tokens are well-organized in the Tailwind config
- `vite-plugin-dts` for automatic type generation
- Proper externalization of react/react-dom/jsx-runtime
