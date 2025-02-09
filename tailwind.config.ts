import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
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
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#0EA5E9",
          hover: "#0284C7",
        },
        secondary: {
          DEFAULT: "#10B981",
          hover: "#059669",
        },
        accent: {
          DEFAULT: "#F3F3F3",
          foreground: "#221F26",
        },
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.3s ease-out",
        "scale-in": "scale-in 0.2s ease-out",
      },
      backgroundImage: {
        'gradient-login': 'linear-gradient(to bottom right, #3B82F6, #34D399)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;