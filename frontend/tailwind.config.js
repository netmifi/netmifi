/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"], // Heading/important font
        montserrat: ["Montserrat", "sans-serif"], //Body/paragraph font
        dancingScript: ["Dancing Script", "cursive"], // script font
      },
      colors: {
        // White theme:
        "white-background": "#FAFAFA", // background color
        "eerie-black": "#1F1F1F", // main or important text
        "jet-black": "#292929", // body or less important text
        "resolution-blue": "#00288F",
        "penn-red": "#9C0000",
        // Dark theme:
        "black-background": "#121212", // background color
        "timber-wolf": "#d6d6d6", // main or important text
        "silver-white": "#cccccc", // body or less important text
        "vista-blue": "#85A7FF",
        "imperial-red": "#FF4545",
      },
    },
  },
  plugins: [],
};
