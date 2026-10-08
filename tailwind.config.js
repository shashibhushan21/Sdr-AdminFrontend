/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        saffron: {
          DEFAULT: '#FF6B00',
          dark: '#E04800',
          light: '#FF8533',
        },
        navy: {
          DEFAULT: '#1B365D',
          dark: '#102340',
        },
        forest: {
          DEFAULT: '#10B981',
          dark: '#059669',
        },
      },
    },
  },
  plugins: [],
}
