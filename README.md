# @c4g/ui

Code4Good component library built with React, TypeScript, Tailwind CSS, and Storybook.

## Installation

```bash
npm install @c4g/ui
```

## Setup

### 1. Import styles

Add the CSS import to your app's entry point (e.g., `main.tsx` or `App.tsx`):

```tsx
import '@c4g/ui/styles.css'
```

This includes all component styles. The library's design tokens (colors, spacing, etc.) are baked into the CSS, so components will render correctly without any Tailwind configuration on your end.

### 2. Tailwind preset (optional)

If your app uses Tailwind CSS and you want access to the C4G design tokens (colors, fonts, border radius) in your own code, add the preset to your Tailwind config:

```ts
// tailwind.config.ts
import { c4gPreset } from '@c4g/ui/tailwind-preset'

export default {
  presets: [c4gPreset],
  content: [
    './src/**/*.{ts,tsx}',
    // your content paths
  ],
  // your customizations
}
```

This gives you access to classes like `bg-primary`, `text-accent`, `font-epilogue`, `rounded-ethos`, etc.

### 3. Fonts (optional)

The library uses the **Epilogue** and **Manrope** Google Fonts. You can load them however you prefer:

- **Google Fonts CDN** — add to your HTML `<head>`:
  ```html
  <link href="https://fonts.googleapis.com/css2?family=Epilogue:ital,wght@0,100..900;1,100..900&family=Manrope:wght@200..800&display=swap" rel="stylesheet">
  ```
- **Self-hosted** — download and serve the fonts yourself (recommended for GDPR compliance or performance)

## Usage

```tsx
import { Button, Card, Badge, Input } from '@c4g/ui'

function App() {
  return (
    <Card header="Welcome">
      <p>Hello from Code4Good!</p>
      <Button variant="primary">Get Started</Button>
    </Card>
  )
}
```

## Components

- **Button** — primary, secondary, accent variants with sm/md/lg sizes
- **Card** — container with optional header, body, and footer slots
- **Badge** — primary, accent, muted variants
- **Input** — text input with label, error state, and helper text

All components support dark mode via the `dark` class on an ancestor element (e.g., `<html class="dark">`).

## Development

```bash
# Install dependencies
npm install

# Start Storybook
npm run dev

# Build the library
npm run build

# Build Storybook static site
npm run build-storybook

# Lint
npm run lint
```
