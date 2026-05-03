/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Pretendard', 'system-ui', 'sans-serif'],
      },
      colors: {
        cream: '#fff8ed',
        sesame: '#d8a758',
        persimmon: '#f97316',
        ink: '#27201b',
      },
      boxShadow: {
        soft: '0 24px 80px rgba(96, 54, 18, 0.14)',
      },
    },
  },
  plugins: [],
}
