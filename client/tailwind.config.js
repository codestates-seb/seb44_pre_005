/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        mainColor: "#7aa7ff",
        black: "#141414",
      },
      width: {
        searchResultContainer: "77rem",
        searchBarWidth: "30rem",
        modalContainerWidth: "80rem",
        modalFirstInnerWidth: "70rem",
        modalSecondInnerWidth: "70rem",
        "85%": "85%",
      },
      height: {
        "50rem": "50rem",
        modalContainerHeight: "45rem",
        modalFirstInnerHeight: "15rem",
        modalSecondInnerHeight: "20rem",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
