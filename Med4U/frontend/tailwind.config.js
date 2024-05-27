/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    keyframes: {
      ekg: {
        "0%": { opacity: 0 },
        "25%": { opacity: 1 },
        "50%": { strokeDashoffset: "2000" },
        "99%": { opacity: 0, strokeDashoffset: "3000" },
        "100%": { strokeDashoffset: "1000" },
      },
    },
    animation: {
      ekg: "ekg 1.5s linear forwards infinite",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
