/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Include all source files
    "./public/index.html",        // Include your HTML file if necessary
  ],
  theme: {
    extend: {
      colors: {
        themeyellow: '#f5e60d',
        themepurple: '#502ec3',
        danger: '#e74c3c',
      },
      spacing: {
        100: '25rem',
      },
    },
  },
  plugins: [],
};
