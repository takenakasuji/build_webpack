const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = [
{
  entry: './src/js/app.js',
  output: {
    path: path.join(__dirname, 'public'),
    // publicPath: 'http://test.com/',
    filename: 'bundle.js'
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
  plugins: [
    new ExtractTextPlugin('css/[name].css'),
    new CopyWebpackPlugin([
      {
        from: 'src/img',
        to: path.join(__dirname, 'public/img'),
      },
      {
        from: '**/*.html',
        to: path.join(__dirname, 'public/'),
        ignore: [
          'node_modules/**/*.html',
          'public/**/*.html'
        ],
      }
    ]),
    new ImageminPlugin({ test: /\.(jpe?g|png|gif|svg)$/i })
  ]
}];