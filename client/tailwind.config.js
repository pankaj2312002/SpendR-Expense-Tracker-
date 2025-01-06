/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        '15': '3.75rem', // 60px
        '20': '5rem', // 80px
        '25': '6.25rem', // 100px
        '30': '7.5rem', // 120px
        '35': '8.75rem', // 140px
        '40': '10rem', // 160px
        // Add more custom spacing as needed
      }
    },
  },
  plugins: [],
}

