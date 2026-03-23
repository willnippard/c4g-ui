import type { Preview } from '@storybook/react'
import { themes } from '@storybook/theming'
import { withThemeByClassName } from '@storybook/addon-themes'
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
    darkMode: {
      dark: themes.dark,
      light: themes.light,
      stylePreview: false,
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
