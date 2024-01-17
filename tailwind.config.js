// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

module.exports = {
  content: [
    "./src/**/*.html",
    "./src/**/*.jsx",
    // Add paths to all of the templates you're using
  ],
  theme: {
    extend: {
      fontFamily: {
        numbers: ["Lato", "sans-serif"],
      },
      filter: {
        "icon-hover": `invert(62%) sepia(76%) saturate(1815%) hue-rotate(0deg)
    brightness(105%) contrast(105%)`,
      },
      colors: {
        amPrimary: "#002d5f",
        amAccent: "#d20000",
        amNeutral100: "#fdfdfd",
        amNeutral700: "#f5f5f5",
        amNeutral800: "#000000",
        amNeutral900: "#5a5a5a",
        amText: "#000000",
        amBg: "#fdfdfd",
        amContainer: "#f6eef4",
      },
    },
  },
  variants: {},
  plugins: [],
};
