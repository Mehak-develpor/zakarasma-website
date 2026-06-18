/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          gold: '#F4C430',
          'gold-dark': '#e6b52e',
          green: '#0B5D3B',
          'green-dark': '#094d33',
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        arabic: ['Noto Sans Arabic', 'Amiri', 'system-ui', 'sans-serif'],
        urdu: ['Noto Nastaliq Urdu', 'Jameel Noori Nastaleeq', 'serif'],
      },
    },
  },
  plugins: [],
}
