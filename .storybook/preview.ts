import type { Preview } from '@storybook/react'
import { themes } from '@storybook/theming'
import '../src/styles/fonts.css'
import '../src/styles/globals.css'

const preview: Preview = {
  parameters: {
    darkMode: {
      dark: { ...themes.dark, appPreviewBg: themes.dark.appBg },
      light: { ...themes.light, appPreviewBg: themes.light.appBg },
      stylePreview: false,
      darkClass: 'dark',
      lightClass: '',
      classTarget: 'html',
    },
    docs: {
      theme: themes.dark,
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
