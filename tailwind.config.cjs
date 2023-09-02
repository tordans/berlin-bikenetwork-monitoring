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
          50: '#fff7ed',
          100: '#feeed6',
          200: '#fcd9ac',
          300: '#fabd77',
          400: '#f79640',
          500: '#f4791b',
          600: '#ea6011', // primary orange
          700: '#be4710',
          800: '#973815',
          900: '#7a3014',
          950: '#421608',
        },
        ccBlue: {
          50: '#ebfffd',
          100: '#cdfffe',
          200: '#a1feff',
          300: '#60faff',
          400: '#18ecf8',
          500: '#00cfde',
          600: '#009db1', // primary blue
          700: '#088396',
          800: '#10697a',
          900: '#125767',
          950: '#053947',
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
