module.exports = {
  plugins: [
    require('postcss-import'),
    require('tailwindcss'),
    require('autoprefixer')
    // I removed the thing below because it was causing errors
    // ...(process.env.NODE_ENV === 'production' ? require('cssnano') : [])
  ]
}
