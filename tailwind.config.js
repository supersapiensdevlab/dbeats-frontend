module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // or 'media' or 'class'

  content: ['./node_modules/@themesberg/flowbite/**/*.js'],
  theme: {
    scale: {
      0: '0',
      25: '.25',
      50: '.5',
      75: '.75',
      90: '.9',
      95: '.95',
      99: '.99',
      100: '1',
      101: '1.01',
      105: '1.05',
      110: '1.1',
      125: '1.25',
      150: '1.5',
      200: '2',
    },
    minHeight: {
      0: '0',
      100: '100px',
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
      full: '100%',
    },
    zIndex: {
      '-1': '-1',
      0: 0,
      1: 1,
      2: 2,
      3: 3,
      5: 5,
      10: 10,
      20: 20,
      30: 30,
      40: 40,
      50: 50,
      25: 25,
      75: 75,
      100: 100,
      200: 200,
      500: 500,
      auto: 'auto',
    },
    extend: {
      backdropBlur: {
        lg: '20px',
      },

      grayscale: { 50: '50%', 75: '75%' },
      width: {
        250: '250px',
        180: '180px',
        130: '130px',
        200: '200px',
      },
      height: {
        88: '21.8rem',
        90: '90px',
        110: '28rem',
        120: '42rem',
        150: '150px',
        200: '200px',
        180: '180px',
      },
      padding: {
        xl: '300px',
        18: '4.75rem',
        0.1: '0.1rem',
      },
      margin: {
        13: '3.2rem',
      },
      fontFamily: {
        'proxima-reg': ['Proxima', 'Arial', 'sans-serif'],
        GTWalsheimPro: ['GTWalsheimPro', 'Arial', 'sans-serif'],
      },
      colors: {
        'dbeats-white': '#fcfdfe',
        'dbeats-alt': '#061720',
        'dbeats-secondary-light': '#00AEFF',
        'dbeats-dark': '#000',
        'dbeats-light': '#00d3ff',
        'dbeats-dark-primary': '#101010',
        'dbeats-dark-alt': '#1c1c1c',
        'dbeats-dark-secondary': '#181818',
      },
    },
  },
  variants: {
    extend: {
      // ...
      display: ['dark'],
      animation: ['hover', 'focus'],
      backdropBlur: ['hover', 'focus'],
      backgroundColor: ['dark', 'hover', 'focus'],
      borderColor: ['dark', 'hover', 'focus'],
      textColor: ['dark', 'hover', 'focus'],
      margin: ['dark', 'hover', 'focus'],
      padding: ['dark', 'hover', 'focus'],
      width: ['important'],
      height: ['important'],
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    require('tailwindcss-filters'),
    require('@themesberg/flowbite/plugin'),
    require('tailwindcss-important')(),
  ],
};
