/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,html}"],
  theme: {
    extend: {
      boxShadow: {},
      colors: {},
      borderColor: "#EBCE4D",
    },
  },
  plugins: [require("daisyui")],

  daisyui: {
    styled: true,
    themes: [
      {
        // mytheme: {
        //   primary: "#153B44",
        //   "primary-focus": "#1F271B",
        //   "primary-content": "#F8F4F2",
        //   secondary: "#145C9E",
        //   "secondary-focus": "#092F49",
        //   "secondary-content": "#E8E0D9",
        //   accent: "#EBCE4D",
        //   "accent-focus": "#EAD793",
        //   "accent-content": "#F6F0E0",
        //   neutral: "#F6F0E0",
        // },
        mytheme: {
          primary: "#0F2940",
          "primary-focus": "#2668A2",
          "primary-content": "#F3F3F3",
          secondary: "#4777B3",
          "secondary-focus": "#0077B3",
          "secondary-content": "#120F00",
          accent: "#ffd300",
          "accent-focus": "#FFA600",
          "accent-content": "#120F00",
          neutral: "#333",

          "base-100": "#253641",

          info: "#28B8DC",

          success: "#38b000",

          warning: "#fb5607",

          error: "#f94144",
        },
      },
      "myTheme",
      "cupcake",
    ],
  },
};
