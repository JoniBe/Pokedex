/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Roboto"'],
      },
    },
    colors: {
      transparent: 'transparent',
      white: '#FFF',
      yellow: '#FBD743',
      red: '#FF1F1F',
      'light-blue': '#5DB9FF',
      blue: '#363B81'
    }
  },
  plugins: [],
};
