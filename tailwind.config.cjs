const config = {
  content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'],

  plugins: [require('flowbite/plugin')],

  darkMode: 'class',

  theme: {
    extend: {
      colors: {
        // flowbite-svelte
        primary: {
          50: '#FFF5F2',
          100: '#FFF1EE',
          200: '#FFE4DE',
          300: '#FFD5CC',
          400: '#FFBCAD',
          500: '#FE795D',
          600: '#EF562F',
          700: '#EB4F27',
          800: '#CC4522',
          900: '#A5371B'
        },
        socials: {
          github: '#333',
          twitter: '#1DA1F2',
          spotify: '#1DB954',
          linkedin: '#0e76a8',
          youtube: '#FF0000',
        },
        languages: {
          javascript: '#F0DB4F',
          typescript: '#3178C6',
          rust: '#CE422B'
        }
      }
    }
  }
};

module.exports = config;