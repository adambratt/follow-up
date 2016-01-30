var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: [
    './src/init'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
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
