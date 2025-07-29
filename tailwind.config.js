export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        nunito: ["Nunito", "sans-serif"],
      },
      colors: {
        primary: "#F4E041",
        primaryHover: "#FFE302",
        secondary: "#00BDD3",
        secondaryHover: "#00a6bb",
        dark: "#000000",
        light: "#FFFFFF",
        borderGray: "#D0CFCF",
        inputBg: "#F8F8F8",
        inputBorder: "#D0CFCF",
        ringColor: {
          primary: "#F4E041",
          secondary: "#00BDD3",
        },
      },
    },
  },
  plugins: [],
};
