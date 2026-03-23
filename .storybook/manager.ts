import { addons } from '@storybook/manager-api'
import { c4gTheme } from './c4g-theme'

addons.setConfig({
  theme: c4gTheme,
  enableShortcuts: true,
})
