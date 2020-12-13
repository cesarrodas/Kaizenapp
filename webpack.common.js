const path = require("path");

module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, `src`, `app`),
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