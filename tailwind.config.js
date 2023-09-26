const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*{js,ts,jsx,tsx,mdx,html}'],
  theme: {
    colors: { ...colors },
  },
  plugins: [require('@tailwindcss/forms')],
};
