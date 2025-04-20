/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"], 
    content: [
      "./src/**/*.{ts,tsx}",
      "./components/**/*.{ts,tsx}",
      "./app/**/*.{ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          background: "hsl(var(--background))",
          foreground: "hsl(var(--foreground))",
        },
        borderRadius: {
          lg: "var(--radius)",
        },
      },
    },
    plugins: [],
  }
  