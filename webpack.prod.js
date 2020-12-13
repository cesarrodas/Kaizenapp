const webpack = require('webpack');
const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = merge(common, {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist/public'),
    filename: 'bundle.js',
    publicPath: '/'
  },
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
        }
      ]
    })
  ],
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
});