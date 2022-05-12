/** @type {import('next').NextConfig} */

const withTM = require('next-transpile-modules')(['react-daisyui'])

module.exports = withTM({
  //... your content here
  reactStrictMode: true,
})
