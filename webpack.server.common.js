const webpack = require('webpack');
const path = require("path");
const nodeExternals = require('webpack-node-externals');
const env = require('dotenv').config();

console.log("ENV", env);

module.exports = {
  mode: "development",
  target: "node",
  entry: path.resolve(__dirname, `src`, `server`),
  externals: [nodeExternals()],
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new webpack.DefinePlugin({
      // 'process.env.NODE_ENV': JSON.stringify('production'),
      'process.env.SERVER_DEVELOPMENT_PORT': JSON.stringify(env.parsed.SERVER_DEVELOPMENT_PORT),
      'process.env.SERVER_PRODUCTION_PORT': JSON.stringify(env.parsed.SERVER_PRODUCTION_PORT)
    })
  ],
  module: {
    rules: [{
      test: /\.jsx?/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  }
}