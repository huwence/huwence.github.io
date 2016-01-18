var webpack = require('webpack')
var plugins = [new webpack.HotModuleReplacementPlugin()]
var minimize = process.argv.indexOf('--minimize') > -1 ? true : false

if (minimize) {
  plugins.push(new webpack.optimize.UglifyJsPlugin())
}

module.exports = {
  entry: [
    './index.js'
  ],
  output: {
    filename: 'bundle.js'
  },
  plugins: plugins,
  module: {
    loaders: [
      {test: /\.less$/, loader: 'style!css!less'},
      {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader?presets[]=es2015'}
    ]
  }
}
