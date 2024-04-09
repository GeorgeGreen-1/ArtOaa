/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    screens: {
      540: "540px",
      640: "640px",
      768: "768px",
      834: "834px",
      1024: "1024px",
      1280: "1280px",
      1440: "1440px",
      1536: "1536px",
      1592: "1592px",
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      transitionDuration: {
        400: "400ms",
      },
      dropShadow: {
        "red-outline-mobile": "0 3px #F83A05",
        "red-outline-desktop": "0 6px #F83A05",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "spinner-box": {
          "0%, 100%": { top: "0", left: "0" },
          "25%": { top: "0", left: "calc(100% - 12px)" },
          "50%": { top: "calc(100% - 12px)", left: "calc(100% - 12px)" },
          "75%": { top: "calc(100% - 12px)", left: "0" },
        },
      },
      fontFamily: {
        "geom-semibold": "Geom Graphic W03 SemiBold",
        "geom-bold": "Geom Graphic W03 Bold",
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "spinner-box": "spinner-box 2s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
