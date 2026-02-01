/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,js,svelte,ts}',
    './node_modules/layerchart/**/*.{svelte,js}' // Don't skip this!
  ],
  theme: {
    extend: {
      colors: {
        // This maps the 'primary' shorthand LayerChart uses
        primary: {
          DEFAULT: 'hsl(217, 91%, 60%)',
          content: 'white',
        }
      }
    }
  },
  plugins: []
};