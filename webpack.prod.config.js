const {merge} = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(require('./webpack.base.config.js'), {
	mode: 'production',
	devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
        ]
      },
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'prod'),
    }),
    new CopyWebpackPlugin({
      patterns: [
        {from: 'assets', to: '', globOptions: {
          ignore: ['**/*.iso', '**/*.doc']
        }}
      ]
    }),
    new MiniCssExtractPlugin()
  ],
  output: {
		path: path.resolve(__dirname, 'build/public'),
  }
});
