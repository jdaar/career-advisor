/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    fontFamily: {
      'sans': ['"Inter"', 'sans-serif'],
      'mono': ['"Ubuntu mono"', 'serif'],
    },
    extend: {
      padding: {
        'xs': '0.2rem',
        'sm': '0.5rem',
        'md': '1.25rem',
        'lg': '2rem',
      },
      margin: {
        'xs': '0.2rem',
        'sm': '0.5rem',
        'md': '1.25rem',
        'lg': '2rem',
      },
      gap: {
        'xs': '0.2rem',
        'sm': '0.5rem',
        'md': '1.25rem',
        'lg': '2rem',
      },
    },
  },
  plugins: [],
}

