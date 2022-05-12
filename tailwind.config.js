module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './features/**/*.{js,ts,jsx,tsx}',
    'node_modules/react-daisyui/dist/react-daisyui.cjs',
    'node_modules/daisyui/dist/**/*',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
}
