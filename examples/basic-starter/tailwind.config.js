const defaultTheme = require('tailwindcss/defaultTheme')
const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    // hacky fix to make sure Tailwind classes provided by cloakwp package get included in build:
    './node_modules/cloakwp/**/components/**/*.js',
    './node_modules/cloakwp/**/coreBlocks/**/*.js',
  ],
  safelist: [ // this safelist ensures certain classes are ALWAYS included in the final tailwind build, which helps ensure cloakwp's dynamic block styling works as intended. 
    // TODO: update the color classes that always get included to match the project's colors
    {
      pattern: /(bg|text)-(blue|gray)-(50|100|200|300|400|500|600|700|800|900)\/(|60|70|80|90)/,
    },
    {
      pattern: /col-span-(1|2|3|4|5|6|7|8|9|10|11|12)/,
    },
    {
      pattern: /text-(left|right|center)/,
    },
    {
      pattern: /p(|t|b|r|l)-(1|2|3|4|6|8|10|12|16|20|24|32|40)/, // include lots of padding options
    },
    {
      pattern: /m(|t|b|r|l)-(0|1|2|3|4|6|8|10|12|16|20|24|32|40)/, // include lots of margin options
    },
    // "sm:mt-0", // safelist a one-off class like this
  ],
  darkMode: 'class',
  theme: {
    typography: require('./typography'),
    screens: { // we add 'xs' and 'xmd' in with the default Tailwind breakpoints (order matters which is why 'xmd' is placed where it is)
      'xs': '475px',
      'sm': defaultTheme.screens.sm,
      'md': defaultTheme.screens.md,
      'xmd': '940px',
      'lg': defaultTheme.screens.lg,
      'xl': defaultTheme.screens.xl,
      '2xl': defaultTheme.screens['2xl'],
    },
    fontSize: { // by default, all the below sizes exactly match the Tailwind defaults -- we just include this here to make it easy to change the default sizes/line-heights should you want to
      xs: ['0.75rem', { lineHeight: '1rem' }],
      sm: ['0.875rem', { lineHeight: '1.25rem' }],
      base: ['1rem', { lineHeight: '1.5rem' }],
      lg: ['1.125rem', { lineHeight: '2rem' }],
      xl: ['1.25rem', { lineHeight: '1.75rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      '5xl': ['3rem', { lineHeight: '1' }],
      '6xl': ['3.75rem', { lineHeight: '1' }],
      '7xl': ['4.5rem', { lineHeight: '1' }],
      '8xl': ['6rem', { lineHeight: '1' }],
      '9xl': ['8rem', { lineHeight: '1' }],
    },
    extend: {
      colors: ({ colors }) => ({
        gray: colors.slate, // we want to maintain a convention across projects where we always have a "gray" family, but maybe we want to use another built-in color family like "gray" for our grays, which is why we do this.. or you can provide custom gray colors like below
        blue: colors.cyan,
        /* custom: { // recommendation: if designer doesn't provide you with Tailwind-style palette, use https://uicolors.app/create to create a tailwind palette that you can easily export/copy into here
          '50': '#f2f7fd',
          '100': '#dbe9fb',
          '200': '#bbd8f7',
          '300': '#8fc1f0',
          '400': '#5da3e9',
          '500': '#387ee0',
          '600': '#2960c7',
          '700': '#294fa8',
          '800': '#26438c',
          '900': '#1e315c',
        }, */
      }),
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
        // serif: ['Della Respira', 'serif'] // add other font families like so
      },
      lineHeight: {
        'tightest': '1.1',
      },
      listStyleType: {
        circle: 'circle',
      },
      maxWidth: {
        '8xl': '88rem',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.highlight-white-10': {
          'box-shadow': 'inset 0 1px 0 0 rgb(255 255 255/0.1)',
        },
        '.highlight-white-20': {
          'box-shadow': 'inset 0 1px 0 0 rgb(255 255 255/0.2)',
        },
        // You can create custom Tailwind classes that are usable with Tailwind modifiers/breakpoints here (as we've done above)
      })
    }),
  ],
}
