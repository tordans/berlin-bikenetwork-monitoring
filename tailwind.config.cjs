/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        // https://fontsource.org/fonts/hind/install
        display: ['Hind', 'sans-serif'],
        sans: ['Open Sans', 'sans-serif'],
      },
      colors: {
        ccTypo: '#192738',
        // Thanks to https://uicolors.app/create
        ccOrange: {
          50: '#fff2f1',
          100: '#ffe3e0',
          200: '#ffccc7',
          300: '#ffa8a0',
          400: '#ff776a',
          500: '#f84b3b',
          600: '#e84030', // primary orange
          700: '#c12314',
          800: '#a02014',
          900: '#842118',
          950: '#480d07',
        },
        ccBlue: {
          50: '#edf0ff',
          100: '#dee4ff',
          200: '#c3ccff',
          300: '#9fa9ff',
          400: '#797bff',
          500: '#6259fb',
          600: '#523bf0',
          700: '#462ed4',
          800: '#3a28ab',
          900: '#312783', // primary blue
          950: '#1f184e',
        },
        ccGray: {
          50: '#f6f8f9',
          100: '#ecf0f2',
          200: '#dae2e5', // primary background
          300: '#b1c3c8',
          400: '#86a2aa',
          500: '#678690',
          600: '#526d77',
          700: '#435861',
          800: '#3a4c52',
          900: '#344046',
          950: '#222b2f',
        },
        ccNeutral: {
          50: '#f6f7f9',
          100: '#edeef1',
          200: '#d6dbe1',
          300: '#b3bcc6',
          400: '#8997a7',
          500: '#6b7b8c',
          600: '#556274',
          700: '#4b5665', // primary
          800: '#3c4550',
          900: '#353b45',
          950: '#24272d',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
