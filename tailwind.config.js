/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,html}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ["emerald", "forest", "cupcake" ],
  },
  plugins: [require("daisyui")],
}
