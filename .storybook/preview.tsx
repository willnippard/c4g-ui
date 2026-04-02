import type { Preview } from '@storybook/react-vite'
import { withThemeByClassName } from '@storybook/addon-themes'
import React from 'react'
import { c4gTheme } from './c4g-theme'
import '../src/styles/fonts.css'
import '../src/styles/globals.css'

const sideBySideThemeDecorator = (Story: React.ComponentType) => (
  <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
    <div style={{ flex: '1', minWidth: '300px' }}>
      <div style={{ marginBottom: '0.5rem', fontSize: '0.75rem', fontWeight: 600, color: '#666' }}>
        Light
      </div>
      <div style={{ padding: '1.5rem', borderRadius: '8px', background: '#F8F6F1' }}>
        <Story />
      </div>
    </div>
    <div style={{ flex: '1', minWidth: '300px' }}>
      <div style={{ marginBottom: '0.5rem', fontSize: '0.75rem', fontWeight: 600, color: '#999' }}>
        Dark
      </div>
      <div className="dark" style={{ padding: '1.5rem', borderRadius: '8px', background: '#141F1A' }}>
        <Story />
      </div>
    </div>
  </div>
)

const preview: Preview = {
  decorators: [
    sideBySideThemeDecorator,
    withThemeByClassName({
      themes: {
        light: '',
        dark: 'dark',
      },
      defaultTheme: 'light',
    }),
  ],
  parameters: {
    docs: {
      theme: c4gTheme,
    },
    options: {
      storySort: {
        method: 'alphabetical',
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
