/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FDFBF7',
        beige: {
          50: '#F9F8F6',
          100: '#F3F0EA',
          200: '#EBE5DB',
        },
        forest: {
          800: '#2A3B32',
          900: '#1D2A23',
        },
        gold: {
          400: '#C5A67B',
          500: '#B08E5F',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
