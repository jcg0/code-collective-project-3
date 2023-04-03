/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,html}"],
  theme: {
    extend: {
      boxShadow: {},
    },
  },
  plugins: [require("daisyui")],

  daisyui: {
    styled: true,
    themes: [
      {
        mytheme: {
          primary: "#153B44",
          "primary-focus": "#1F271B",
          "primary-content": "#F8F4F2",
          secondary: "#145C9E",
          "secondary-focus": "#092F49",
          "secondary-content": "#E8E0D9",
          accent: "#EBCE4D",
          "accent-focus": "#EAD793",
          "accent-content": "#F6F0E0",
          neutral: "#F6F0E0",
        },
      },
      "myTheme",
      "cupcake",
    ],
  },
};
