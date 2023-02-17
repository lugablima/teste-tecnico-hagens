/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#FFFFFF",
      },
      fontFamily: {
        regular: "Inter_400Regular",
        semibold: "Inter_600SemiBold",
        bold: "Poppins_700Bold"
      }
    },
  },
  plugins: [],
}
