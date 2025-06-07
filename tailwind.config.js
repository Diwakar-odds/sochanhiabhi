// frontend/tailwind.config.js
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
export default {
  // ... darkMode, content ...
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans], // Add Inter as the primary sans-serif
      },
      // ... your existing color variables from shadcn/ui or custom ones ...
    },
  },
  plugins: [require('tailwindcss-animate')], // shadcn/ui often adds this
}