const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const CopyPlugin = require("copy-webpack-plugin");
let env = require('dotenv').config({ path: path.join(__dirname, '.env') });

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
      'process.env.NODE_ENV': JSON.stringify('development'),
      'process.env.FRONT_END_SAGAS_DEV': JSON.stringify(env.parsed.FRONT_END_SAGAS_DEV),
      'process.env.FRONT_END_SAGAS_PROD': JSON.stringify(env.parsed.FRONT_END_SAGAS_PROD)
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