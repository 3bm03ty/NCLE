/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#896AF9',
        background: '#AB95F9',
      },
      fontFamily: {
        sans: ['Nunito', 'sans-serif'],
      },
      lineHeight: {
        'heading': '120%',
        'paragraph': '150%',
      },
      textShadow: {
        'primary': '2px 2px 0px #896AF9',
      },
      boxShadow: {
        'primary': '4px 4px 0px #896AF9',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.text-shadow-primary': {
          'text-shadow': '2px 2px 0px #896AF9'
        },
        '.shadow-primary': {
          'box-shadow': '4px 4px 0px #896AF9'
        }
      }
      addUtilities(newUtilities)
    }
  ],
} 