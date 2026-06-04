/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: '#E8500A',
        'primary-dark': '#C43E06',
        'primary-light': '#FF6B2B',
        secondary: '#1C2B3A',
        accent: '#F5C842',
        background: '#FAFAF8',
        foreground: '#1C2B3A',
        muted: '#6B7280',
        'muted-bg': '#F3F2EF',
        border: '#E5E3DF',
        'card-bg': '#FFFFFF',
        'dark-bg': '#111820',
      },
      fontFamily: {
        heading: ['Plus Jakarta Sans', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
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
