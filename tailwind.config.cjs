/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        slg: {
          pink: '#EC4899',
          'pink-hover': '#D4318A',
          dark: '#0E0E0E',
          bone: '#F8F5F0',
          silver: '#C8CCD0',
          'text-light': '#F0EDE8',
          'text-dark': '#1A1A1A',
        }
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
