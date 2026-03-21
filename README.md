# @c4g/ui

Code4Good component library built with React, TypeScript, Tailwind CSS, and Storybook.

## Installation

```bash
npm install @c4g/ui
```

Import the styles in your app entry point:

```tsx
import '@c4g/ui/styles.css'
```

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

## Development

```bash
# Install dependencies
npm install

# Start Storybook
npm run dev

# Build the library
npm run build
```

## Components

- **Button** — primary, secondary, accent variants with sm/md/lg sizes
- **Card** — container with optional header, body, and footer slots
- **Badge** — primary, accent, muted variants
- **Input** — text input with label, error state, and helper text

All components support dark mode via the `dark` class on an ancestor element.
