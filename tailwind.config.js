/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./src/**/*.{html,js,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "governor-bay": {
          50: "#eef3ff",
          100: "#e1e9fe",
          200: "#c8d7fd",
          300: "#a7bbfa",
          400: "#8397f6",
          500: "#6672ee",
          600: "#494ce2",
          700: "#3535bb",
          800: "#3233a1",
          900: "#30347f",
          950: "#1c1c4a",
        },
      },
      fontFamily: {
        pacifico: ["Pacifico", "cursive"],
      },
      keyframes: {
        fadeInDown: {
          "0%": { opacity: 0, transform: "translateY(-0.5rem)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};
