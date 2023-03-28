module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      width: {
        desktop: '1026px',
        tablet: '650px',
        mobile: '320px',
      },
      height: {
        tablet: '600px',
        mobile: '580px',
      },
      maxHeight: {
        tablet: '600px',
        mobile: '580px',
      },
      minHeight: {
        tablet: '600px',
        mobile: '580px',
      },
      colors: {
        'main-blue': '#3742FA',
        'main-yellow': '#FFA502',
        'main-red': '#e74c3c',
        'secondary-blue': {
          100: '#F1F2F6',
          200: '#B9D1FF',
          300: '#70A1FF',
        },
        'main-gray': {
          100: '#F9F9F9',
          200: '#F0F0F0',
          300: '#CED6E0',
          400: '#C4C4C4',
          500: '#4B4B4B',
        },
      },
      flex: {
        2: '2 2 0%',
      },
    },
  },
  plugins: [],
}
