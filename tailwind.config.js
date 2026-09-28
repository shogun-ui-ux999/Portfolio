/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        night: {
          950: "#120D0A",
          900: "#171110",
          850: "#1D1512",
          800: "#241A16",
          700: "#33251E",
          600: "#4A382D",
        },
        paper: {
          50: "#FBF6EA",
          100: "#F4ECDC",
          200: "#E7DAC2",
          300: "#D4C2A5",
          400: "#A8946F",
          500: "#7C6A4E",
        },
        amber: {
          lamp: "#E8A33D",
          glow: "#F5C36B",
          ember: "#B97A2A",
        },
        screen: {
          300: "#8AB6E8",
          400: "#5D93D6",
          500: "#3B73B8",
          600: "#2C5A96",
        },
        gold: {
          400: "#D9B45B",
          500: "#C09B3F",
          600: "#9A7A2E",
        },
        brick: {
          400: "#D97A5A",
          500: "#C05B3B",
        },
      },
      fontFamily: {
        serif: ['"Fraunces"', "Georgia", "serif"],
        sans: ['"Inter"', "system-ui", "sans-serif"],
        hand: ['"Caveat"', "cursive"],
        type: ['"Special Elite"', '"Courier New"', "monospace"],
      },
      boxShadow: {
        lamp: "0 0 120px 30px rgba(232,163,61,0.14)",
        plaque: "0 20px 50px -12px rgba(0,0,0,0.8)",
        "paper-lift": "0 10px 30px -8px rgba(0,0,0,0.55)",
      },
      keyframes: {
        flicker: {
          "0%, 100%": { opacity: "1" },
          "92%": { opacity: "1" },
          "94%": { opacity: "0.86" },
          "96%": { opacity: "1" },
          "97%": { opacity: "0.92" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
        hotspotPulse: {
          "0%": { transform: "scale(1)", opacity: "0.7" },
          "100%": { transform: "scale(1.9)", opacity: "0" },
        },
      },
      animation: {
        flicker: "flicker 7s linear infinite",
        float: "float 5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
