const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    path: path.resolve(__dirname, 'dev/public'),
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
  devServer: {
    contentBase: path.join(__dirname, 'dev'),
    http2: true,
    https: {
      key: fs.readFileSync('./server.key'),
      cert: fs.readFileSync('./server.crt'),
      ca: fs.readFileSync('./rootSSL.pem')
    },
    historyApiFallback: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ]
});