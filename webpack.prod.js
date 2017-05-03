const path                = require('path');
const webpack             = require('webpack');

module.exports = {
  //devtool: 'source-map',
  //context: path.join(__dirname, 'assets', 'js'),
  entry: [
    './assets/js/main.js',
    './assets/css/main.css'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/assets/'
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        screw_ie8: true
      },
      comments: false
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ { loader: 'style-loader' }, { loader: 'css-loader' } ]
      }
    ]
  }
}