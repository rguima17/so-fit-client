module.exports = {
  // purge: [],
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    fontFamily: {
      sans: "Montserrat, ui-sans-serif, system-ui, -apple-system, Arial",
      // sans: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont",
    },

  },
  variants: {
    extend: {},
  },
  plugins: [],
};
