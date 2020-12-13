const { merge } = require('webpack-merge');
const common = require('./webpack.server.common.js');
const path = require('path');

module.exports = merge(common, {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist/server'),
    filename: 'bundle.js',
    publicPath: '/'
  },
});