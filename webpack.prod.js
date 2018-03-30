const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = [
  {
    mode: 'production',
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
    optimization: {
      minimizer: [
        new UglifyJSPlugin({
          uglifyOptions: {
            compress: {
              drop_console: true
            }
          }
        })
      ]
    },
    plugins: [
      new ExtractTextPlugin('css/[name].css'),
      new CopyWebpackPlugin([
        {
          from: 'src/img',
          to: path.join(__dirname, 'dist/img'),
        },
        {
          from: '**/*.html',
          to: path.join(__dirname, 'dist'),
          ignore: [
            'node_modules/**/*.html',
            'dist/**/*.html'
          ],
        }
      ]),
      new ImageminPlugin({ test: /\.(jpe?g|png|gif|svg)$/i })
    ]
  }];