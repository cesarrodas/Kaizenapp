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
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/app/assets/*'),
          to: './assets/',
          flatten: true,
          force: true
        },
        {
          from: 'src/index.js',
          to: '../',
          force: true
        },
        {
          from: 'index.html',
          to: '.',
          force: true
        },
        {
          from: 'styles.css',
          to: '.',
          force: true
        },
        {
          from: 'rootSSL.pem',
          to: '.',
          force: true
        },
        {
          from: 'server.crt',
          to: '.',
          force: true
        },
        {
          from: 'server.key',
          to: '.',
          force: true
        }
      ]
    })
  ]
});