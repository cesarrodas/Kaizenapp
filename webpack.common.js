const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, `src`, `app`),
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: 'src/app/assets/*',
          to: './assets/',
          flatten: true
        },
        {
          from: 'src/index.js',
          to: '../'
        },
        {
          from: 'index.html',
          to: '.'
        },
        {
          from: 'styles.css',
          to: '.'
        },
        {
          from: 'rootSSL.pem',
          to: '.'
        },
        {
          from: 'server.crt',
          to: '.'
        },
        {
          from: 'server.key',
          to: '.'
        }
      ]
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [{
      test: /\.jsx?/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  }
}