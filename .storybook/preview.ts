import type { Preview } from '@storybook/react'
import { withThemeByClassName } from '@storybook/addon-themes'
import { c4gTheme } from './c4g-theme'
import '../src/styles/fonts.css'
import '../src/styles/globals.css'

const preview: Preview = {
  decorators: [
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
