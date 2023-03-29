/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,html}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ["garden", "dark", "forest", "cupcake"],
  },
  plugins: [require("daisyui")],
};
