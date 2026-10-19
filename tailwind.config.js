/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: '#E8590C',
        'primary-dark': '#C2410C',
        'primary-light': '#F97A3A',
        secondary: '#141A33',
        accent: '#F2B544',
        background: '#F6EFE3',
        foreground: '#141A33',
        muted: '#646778',
        'muted-bg': '#EFE5D3',
        border: '#E2D8C6',
        'card-bg': '#FFFCF6',
        'dark-bg': '#0F1428',
      },
      fontFamily: {
        heading: ['Inter', 'sans-serif'],
        display: ['Fraunces', 'Georgia', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        hero: '0 32px 80px rgba(28,43,58,0.18)',
        card: '0 2px 16px rgba(28,43,58,0.07)',
        'card-hover': '0 16px 48px rgba(28,43,58,0.14)',
        orange: '0 12px 32px rgba(232,80,10,0.35)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
};
