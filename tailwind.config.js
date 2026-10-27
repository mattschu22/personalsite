/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: { 50: 'var(--paper)', 100: 'var(--rail)', 200: 'var(--line)' },
        ink: {
          900: 'var(--ink)', 800: 'var(--ink)', 700: 'var(--ink)',
          600: 'var(--muted)', 500: 'var(--muted)', 400: 'var(--muted)',
          300: 'var(--line)', 200: 'var(--line)',
        },
        accent: { 50: 'var(--surface)', 600: 'var(--signal)' },
      },
      fontFamily: {
        display: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};
