module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: "#2e2e2e",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
