// tailwind.config.js
module.exports = {
  mode: 'jit',
  purge: [
    './public/**/*.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'purpleish': '#8a4baf',
        'transparent': 'rgba(255, 255, 255, 0.05)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
