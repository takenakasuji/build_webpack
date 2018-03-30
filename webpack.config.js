const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = [
{
  mode: 'development',
  devtool: '#inline-source-map',
  cache: true,
  entry: './src/js/app.js',
  output: {
    path: path.join(__dirname, 'dist'),
    // publicPath: 'http://test.com/',
    filename: 'js/bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader?minimize&sourceMap', 'sass-loader'],
          //publicPath: 'http://cdn.com/images/'
        })
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: 'file-loader?name=img/[name].[ext]'
      }
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname),
    port: 3000,
  },
  plugins: [
    new ExtractTextPlugin('css/[name].css')
  ],
}];