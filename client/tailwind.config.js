/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "selector",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "landing-bg": "url('/hero2.png')", // store config file image in public folder
        "landing-bg-2nd": "url('/bg-overlay.png')",
        "landing-bg-3rd": "url('/bg-overlay3.PNG')",
      },
      boxShadow: {
        "light-shadow": "0 4px 12px rgba(100, 100, 100, 0.1)",
        "dark-shadow": "0 4px 12px rgba(0, 0, 0, 0.2)",
      },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require("tailwindcss-animated")],
};
