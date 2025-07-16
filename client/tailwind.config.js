/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          light: "#3b82f6", // Sky Blue
          dark: "#1e3a8a",  // Deep Navy
        },
      },
    },
  },
  plugins: [],
}
