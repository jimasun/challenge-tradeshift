const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  mode: 'development',
  entry: './src/app.js',
  devtool: 'source-map',
  // devServer: {
  //   publicPath: '/dist/',
  //   contentBase: path.join(__dirname, 'dist'),
  //   watchContentBase: true,
  //   inline: true
  // },
  watch: true,
  watchOptions: {
    aggregateTimeout: 300,
    ignored: ['/node_modules/'],
    poll: 1000
  },
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      favicon: './src/img/favicon-32x32.png',
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css'
    })
  ],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: [
          'babel-loader'
        ]
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      }
      // {
      //   test: /\.(html)$/,
      //   exclude: /node_modules/,
      //   use: {
      //     loader: 'html-loader'
      //   }
      // },
      // {
      //   test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
      //   loader: 'url-loader'
      // }
    ]
  },
  resolve: {
    extensions: ['*', '.webpack.js', '.web.js', '.js', '.mjs', '.json', '.jsx']
  }
}
