/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fafafa',
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          400: '#a1a1aa',
          500: '#71717a',
          600: '#52525b',
          700: '#3f3f46',
          800: '#27272a',
          900: '#18181b',
        },
        section: {
          blue: { light: '#3b82f6', dark: '#60a5fa' },
          purple: { light: '#8b5cf6', dark: '#a78bfa' },
          green: { light: '#10b981', dark: '#34d399' },
          amber: { light: '#f59e0b', dark: '#fbbf24' },
          rose: { light: '#f43f5e', dark: '#fb7185' },
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};