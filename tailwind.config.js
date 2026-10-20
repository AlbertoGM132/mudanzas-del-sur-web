/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: '#B53C08',
        'primary-dark': '#9C3306',
        'primary-light': '#F97A3A',
        secondary: '#141A33',
        accent: '#D6E02E',
        background: '#F3F4F8',
        foreground: '#141A33',
        muted: '#5A5F75',
        'muted-bg': '#E8EAF1',
        border: '#DADDE8',
        'card-bg': '#FFFFFF',
        'dark-bg': '#0F1428',
      },
      fontFamily: {
        heading: ['Archivo', 'system-ui', 'sans-serif'],
        display: ['Archivo', 'Arial Narrow', 'sans-serif'],
        body: ['Archivo', 'system-ui', 'sans-serif'],
        script: ['Kaushan Script', 'cursive'],
      },
      boxShadow: {
        hero: '0 32px 80px rgba(0,0,0,0.18)',
        card: '0 2px 16px rgba(28,43,58,0.07)',
        'card-hover': '0 16px 48px rgba(28,43,58,0.14)',
        orange: '0 12px 28px rgba(0,0,0,0.18)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
};
