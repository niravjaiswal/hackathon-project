/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {fontFamily: {
      'palanquin': ['Palanquin Dark', 'sans-serif'],
    },},
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

