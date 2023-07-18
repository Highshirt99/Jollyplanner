/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        midi: "720px",
        tab: "850px",
      },

      fontFamily: {
        bodyFont: ["ABeeZee", "sans-serif"],
      },
    },
  },
  plugins: [],
};
