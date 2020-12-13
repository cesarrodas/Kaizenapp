const { merge } = require('webpack-merge');
const common = require('./webpack.server.common.js');
const path = require('path');

module.exports = merge(common, {
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dev/server'),
    filename: 'bundle.js',
    publicPath: '/'
  },
});