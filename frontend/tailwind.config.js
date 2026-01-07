/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      fontFamily:{

        leckerli: ["Leckerli One", "cursive"],
        nuninto:["Nunito", "serif"],
        rubik:["Rubik", "serif"],
        lexend:["Lexend", "serif"]
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': {
            boxShadow: '0 0 5px hsl(45 93% 58% / 0.5)',
          },
          '50%': {
            boxShadow: '0 0 20px hsl(45 93% 58% / 0.8)',
          },
        },
      },
      animation:{

        'slow-spin':'spin 10s linear infinite',
        'pulse-glow': 'pulse-glow 1.5s infinite ease-in-out',
      }
    },
  },
  plugins: [],
}