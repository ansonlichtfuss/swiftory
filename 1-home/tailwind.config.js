module.exports = {
  purge: {
    enabled: true,
    content: ['./src/**/*.tsx', './src/**/*.js'],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      opacity: ['hover', 'active'],
    },
  },
  plugins: [],
};
