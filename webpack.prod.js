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
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new CopyPlugin({
      patterns: [
        { 
          from: './src/app/assets/*',
          to: './assets/',
          flatten: true,
          force: true
        },
        {
          from: './src/index.js',
          to: '../',
          force: true
        },
        {
          from: './index.html',
          to: '.',
          force: true
        },
        {
          from: './styles.css',
          to: '.',
          force: true
        }
      ]
    })
  ]
});