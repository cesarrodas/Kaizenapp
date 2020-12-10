const path = require("path");
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: "development",
  target: "node",
  entry: path.resolve(__dirname, `src`, `server`),
  output: {
    path: path.resolve(__dirname, 'dist/server'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  externals: [nodeExternals()],
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