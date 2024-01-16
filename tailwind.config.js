/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,ts}',
    './node_modules/flowbite/**/*.js' // add this line
  ],
  theme: {
    extend: {
      keyframes: {
        progress: {
          '0%': { transform: 'translateX(0) scaleX(0)' },
          '40%': { transform: 'translateX(0) scaleX(0.4)' },
          '100%': { transform: 'translateX(100%) scaleX(0.5)' }
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 }
        },
        fadeOut: {
          '100%': { opacity: 1 },
          '0%': { opacity: 0 }
        }
      },
      animation: {
        progress: 'progress 1s infinite linear',
        fadeIn: 'fadeIn 0.5s ease-in-out',
        fadeOut: 'fadeOut 0.5s ease-in-out'
      },
      transformOrigin: {
        'left-right': '0% 50%'
      }
    }
  },
  plugins: [require('flowbite/plugin')]
};
