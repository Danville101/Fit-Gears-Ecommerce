const defaultTheme = require('tailwindcss/defaultTheme')
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gucci': "url('/GUCCI1.svg')",
        'prada': "url('/PRADA1.svg')",
        'balenciaga': "url('/BALENCIAGA1.svg')",
      },
      colors: {
        brand:'#49CAB2'
      },
      fontFamily: {
        'sans': ['Proxima Nova', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}