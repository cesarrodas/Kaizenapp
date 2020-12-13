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
      'process.env.SERVER_PRODUCTION_PORT': JSON.stringify(env.parsed.SERVER_PRODUCTION_PORT),
      'process.env.SERVER_CORS_ORIGIN_DEV': JSON.stringify(env.parsed.SERVER_CORS_ORIGIN_DEV),
      'process.env.SERVER_CORS_ORIGIN_PROD': JSON.stringify(env.parsed.SERVER_CORS_ORIGIN_PROD),
      'process.env.PRIVATE_KEY': JSON.stringify(env.parsed.PRIVATE_KEY),
      'process.env.COOKIE_SIGNER': JSON.stringify(env.parsed.COOKIE_SIGNER)
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