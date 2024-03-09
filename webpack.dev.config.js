const path = require('path');
const { merge } = require('webpack-merge');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
const SizePlugin = require('size-plugin');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const smp = new SpeedMeasurePlugin();

module.exports = smp.wrap(
  merge(require('./webpack.base.config.js'), {
    mode: 'development',
    devtool: 'inline-source-map',
    output: {
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new webpack.DefinePlugin({
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: 'public/assets',
            to: '',
            globOptions: {
              ignore: ['**/*.iso', '**/*.doc'],
            },
          },
        ],
      }),
      new SizePlugin(),
      new DashboardPlugin(),
    ],
    devServer: {
      port: 9000,
      proxy: {
        '/api': 'http://localhost:3004',
      },
      host: '0.0.0.0',
      hot: true,
      static: path.join(__dirname, 'dist'),
      setupMiddlewares(middlewares, { app }) {
        app.get('/get-sample', (req, res) => {
          const params = req.query;
          res.json(params.name);
        });
        app.get('/get-timeout', (req, res) => {
          const params = req.query;
          setTimeout(() => res.json(params.name), 3000);
        });
        app.get('/package.json', (req, res) => {
          res.json(require('./package.json'));
        });
        app.post('/send-me-json', (req, res) => {
          //console.dir(req);
          res.json({
            status: 200,
          });
        });
      return middlewares;
      },
    },
  })
);
