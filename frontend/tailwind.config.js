/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        coral: '#FF7F50', // Define coral color
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

