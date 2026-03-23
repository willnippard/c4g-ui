import type { Config } from 'tailwindcss'

/** Helper: reference a CSS custom property as an rgb() color with alpha support */
const cv = (name: string) => `rgb(var(--color-${name}) / <alpha-value>)`

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx}', './.storybook/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: cv('background'),
        foreground: cv('foreground'),

        primary: {
          DEFAULT: cv('primary'),
          foreground: cv('primary-foreground'),
          container: cv('primary-container'),
          fixed: cv('primary-fixed'),
          'fixed-dim': cv('primary-fixed-dim'),
        },

        accent: {
          DEFAULT: cv('accent'),
          foreground: cv('accent-foreground'),
        },

        secondary: {
          DEFAULT: cv('secondary'),
          foreground: cv('secondary-foreground'),
          container: cv('secondary-container'),
          fixed: cv('secondary-fixed'),
          'fixed-dim': cv('secondary-fixed-dim'),
        },

        muted: {
          DEFAULT: cv('muted'),
          foreground: cv('muted-foreground'),
        },

        card: {
          DEFAULT: cv('card'),
          foreground: cv('card-foreground'),
        },

        border: cv('border'),

        // Editorial surface hierarchy
        surface: {
          DEFAULT: cv('surface'),
          bright: cv('surface-bright'),
          dim: cv('surface-dim'),
          'container-lowest': cv('surface-container-lowest'),
          'container-low': cv('surface-container-low'),
          container: cv('surface-container'),
          'container-high': cv('surface-container-high'),
          'container-highest': cv('surface-container-highest'),
        },

        'on-surface': {
          DEFAULT: cv('on-surface'),
          variant: cv('on-surface-variant'),
        },

        'on-primary': {
          DEFAULT: cv('on-primary'),
          container: cv('on-primary-container'),
        },

        'on-secondary-container': cv('on-secondary-container'),

        tertiary: {
          DEFAULT: cv('tertiary'),
          container: cv('tertiary-container'),
          fixed: cv('tertiary-fixed'),
          'fixed-dim': cv('tertiary-fixed-dim'),
        },

        'on-tertiary': {
          DEFAULT: cv('on-tertiary'),
          container: cv('on-tertiary-container'),
        },

        'outline-variant': cv('outline-variant'),

        error: {
          DEFAULT: cv('error'),
          container: cv('error-container'),
        },

        'on-error': {
          DEFAULT: cv('on-error'),
          container: cv('on-error-container'),
        },

        'inverse-surface': cv('inverse-surface'),
        'inverse-on-surface': cv('inverse-on-surface'),

        // Toast — fixed backgrounds (don't swap between themes)
        toast: {
          success: cv('toast-success'),
          error: cv('toast-error'),
          warning: cv('toast-warning'),
          info: cv('toast-info'),
          impact: cv('toast-impact'),
        },
      },
      fontFamily: {
        epilogue: ['Epilogue', 'sans-serif'],
        manrope: ['Manrope', 'sans-serif'],
      },
      borderRadius: {
        ethos: '8px',
      },
    },
  },
  plugins: [],
}

export default config
