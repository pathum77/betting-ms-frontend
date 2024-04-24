/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
       "primary": "#7284FE",
       "secondary": "#070031",
       "bg-light": "#f6f5f8",
       "fg-light": "#FFFFFF",
       "fg-dark": "#2f3348",
       "bg-dark": "#25293b"
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '10px',
          md: '20px',
          lg: '50px'
        },
      },
      screens: {
        'xs': '400px',
        'sm': '540px',
        'md': '668px',
        'xm': '800px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px', 
      },
    },
  },
  plugins: [],
}