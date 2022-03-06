const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
module.exports = {
  entry: {
    server: './server/index.js',
    //test: './server/test/index.js'
  },
  mode: 'production',
  devtool: 'nosources-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          }
        }
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns:[
        {from: 'server/views', to: 'views'},
        {from: 'server/js', to: 'js'},
      ]
    })
  ],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js'
  },
  optimization: {
    minimize: false
  },
  resolve: {
    alias: {
      root: path.resolve(__dirname),
      '@': path.resolve(__dirname, '/src')
    }
  },
  target: 'node'
}
