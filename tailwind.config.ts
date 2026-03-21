/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx}', './.storybook/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#F8F6F1',
          dark: '#141F1A',
        },
        foreground: {
          DEFAULT: '#2B2420',
          dark: '#F1EDE4',
        },
        primary: {
          DEFAULT: '#2A6B3F',
          foreground: '#FFFFFF',
          dark: '#3B8F55',
        },
        accent: {
          DEFAULT: '#D4A32A',
          foreground: '#FFFFFF',
          dark: '#D9AD35',
        },
        secondary: {
          DEFAULT: '#EAE5DB',
          foreground: '#2B2420',
          dark: '#241A14',
        },
        muted: {
          DEFAULT: '#EDE9E0',
          foreground: '#6B5D54',
          dark: '#332924',
        },
        card: {
          DEFAULT: '#FFFFFF',
          foreground: '#2B2420',
          dark: '#2E2622',
        },
        border: {
          DEFAULT: '#DDD7CC',
          dark: '#40332D',
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
