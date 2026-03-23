import { create } from '@storybook/theming'

/**
 * Custom Storybook UI theme branded for Code4Good.
 *
 * This controls the Storybook chrome (sidebar, toolbar, docs pages) — NOT
 * the component preview.  Component light/dark is handled independently by
 * `withThemeByClassName` in preview.ts.
 *
 * Storybook 8 does not support a runtime UI theme toggle.  The UI theme is
 * set statically here.  If a toggle is needed in the future, upgrade to
 * Storybook 9+ and use @vueless/storybook-dark-mode.
 */
export const c4gTheme = create({
  base: 'dark',

  // Brand
  brandTitle: 'Code4Good UI',
  brandUrl: 'https://github.com/code4good',

  // Colors — derived from the C4G design tokens
  colorPrimary: '#92D6A0', // primary in dark mode
  colorSecondary: '#2A6B3F', // primary green

  // UI chrome
  appBg: '#141F1A', // background dark
  appContentBg: '#1A1210', // surface dark
  appBorderColor: '#504440', // border dark
  appBorderRadius: 8,

  // Toolbar
  barBg: '#2B2220', // surface-container dark
  barTextColor: '#EDE8E4', // on-surface dark
  barSelectedColor: '#92D6A0', // primary dark

  // Text
  textColor: '#EDE4D9', // on-surface dark
  textInverseColor: '#211A16', // on-surface light
  textMutedColor: '#C0C9BE', // on-surface-variant dark

  // Form
  inputBg: '#362D29', // surface-container-high dark
  inputBorder: '#504440',
  inputTextColor: '#EDE4D9',
  inputBorderRadius: 6,

  // Typography
  fontBase: '"Manrope", "Inter", system-ui, sans-serif',
  fontCode: '"Fira Code", "JetBrains Mono", monospace',
})
