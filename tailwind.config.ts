import type { Config } from "tailwindcss"

export default {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f7f7f8",
          100: "#ececf0",
          200: "#dcdce3",
          300: "#c4c6d0",
          400: "#9ca0b1",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#111827",
          900: "#0b0f1a",
        }
      },
      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,.08)",
      },
      borderRadius: {
        xl2: "1.25rem",
      }
    },
  },
  plugins: [],
} satisfies Config
