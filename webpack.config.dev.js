var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'eventsource-polyfill', // necessary for hot reloading with IE
    'webpack-hot-middleware/client',
    './src/init'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  stylus: {
    use: [require('nib')()]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      { test: /\.jsx?/, loaders: ['babel'], include: path.join(__dirname, 'src') },
      { test: /\.styl$/, loader: 'style!css!stylus' },
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.png(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
      { test: /\.svg(\?v=.+)?$/, loader: 'file' },

      // For font-awesome
      { test: /\.eot(\?v=.+)?$/, loader: 'file' },
      { test: /\.otf(\?v=.+)?$/, loader: 'file' },
      { test: /\.woff(\?v=.+)?$/, loader: 'file' },
      { test: /\.woff2(\?v=.+)?$/, loader: 'file' },
      { test: /\.ttf(\?v=.+)?$/, loader: 'file' },
    ]
  }
};
