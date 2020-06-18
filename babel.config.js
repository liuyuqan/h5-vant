const plugins = []
if (process.env.NODE_ENV != 'development') {
  plugins.push('transform-remove-console')
}
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset' // es6 => es5
  ],
  plugins: plugins
}
