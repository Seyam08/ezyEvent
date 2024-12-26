/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "selector",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "light-shadow": "0 4px 12px rgba(100, 100, 100, 0.1)",
        "dark-shadow": "0 4px 12px rgba(0, 0, 0, 0.2)",
      },
    },
  },
  important: true,
  // eslint-disable-next-line no-undef
  plugins: [require("tailwindcss-animated")],
};
