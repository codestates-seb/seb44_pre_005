/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        mainColor: "#7aa7ff",
      },
      width: {
        searchResultContainer: "77rem",
      },
      height: {
        modalContainerHeight: "45rem",
      },
    },
  },
};
