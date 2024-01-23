/** @type {import('tailwindcss').Config} */
import tailwindAnimate from "tailwindcss-animate";
export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./@/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
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
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [tailwindAnimate],
};
