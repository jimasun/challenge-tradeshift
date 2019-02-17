const path = require('path')

module.exports = {
  mode: 'development',
  entry: './src/app.js',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: [
          'babel-loader'
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
      //   test: /\.css$/,
      //   use: [
      //     MiniCssExtractPlugin.loader,
      //     'css-loader'
      //   ]
      // },
      // {
      //   test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
      //   loader: 'url-loader'
      // }
    ]
  },
  resolve: {
    extensions: ['*', '.webpack.js', '.web.js', '.js', '.json', '.jsx']
  }
}
