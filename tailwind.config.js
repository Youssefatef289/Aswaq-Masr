/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#D71920',
          darkRed: '#A50F15',
          lightRed: '#FDE8E9',
          black: '#171717',
          darkGray: '#333333',
          gray: '#666666',
          lightGray: '#F5F5F5',
          border: '#E5E5E5',
        }
      },
      fontFamily: {
        cairo: ['Cairo', 'sans-serif'],
        tajawal: ['Tajawal', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 2px 10px rgba(0, 0, 0, 0.04)',
        'card-hover': '0 10px 25px -5px rgba(215, 25, 32, 0.12), 0 8px 10px -6px rgba(0, 0, 0, 0.06)',
        'sticky-nav': '0 4px 20px -2px rgba(0, 0, 0, 0.08)',
      }
    },
  },
  plugins: [],
}

