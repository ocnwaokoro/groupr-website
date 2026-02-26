/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#fffefc',
        'bg-dark': '#00473d',
        'bg-dark-alt': '#00352e',
        'bg-light-green': '#d5e68b',
        'bg-cream': '#fff9f0',
        'bg-card': '#f8fbe9',
        'bg-footer': '#f1f7d9',
        'bg-category': '#fff1de',
        'bg-product': '#faf8f5',
        'text-primary': '#161411',
        'text-dark': '#003c34',
        'text-brown': '#332f29',
        'text-border': '#47433a',
        'text-placeholder': '#999489',
        'text-light': '#fffefc',
        'accent-orange': '#ffa454',
        'accent-orange-dark': '#fc8c30',
        'accent-lime': '#c5dc5f',
        'accent-green': '#b3cf34',
        'accent-border': '#ccc8c1',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['DM Sans', 'sans-serif'],
        lexend: ['Lexend', 'sans-serif'],
      },
      fontSize: {
        hero: ['60px', { lineHeight: '125%', fontWeight: '800' }],
        'heading-lg': ['48px', { lineHeight: '125%' }],
        'heading-md': ['36px', { lineHeight: '120%' }],
        'heading-sm': ['24px', { lineHeight: '140%' }],
      },
      maxWidth: {
        mobile: '375px',
      },
      spacing: {
        section: '64px',
      },
      borderRadius: {
        card: '24px',
        button: '12px',
        input: '4px', // mobile; use md:rounded-sm (8px) for desktop where needed
      },
      screens: {
        'md': '768px',
      },
    },
  },
  plugins: [],
}
