const webpack = require('webpack');
const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const CopyPlugin = require("copy-webpack-plugin");
let env = require('dotenv').config({ path: path.join(__dirname, '.env') });

module.exports = merge(common, {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist/public'),
    filename: 'bundle.js',
    publicPath: '/kaizen'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
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
