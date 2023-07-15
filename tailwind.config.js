/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/views/**/*.{njk,html,js}'],
  theme: {
    fontFamily: {
      sans: 'Inter',
    },
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
}
