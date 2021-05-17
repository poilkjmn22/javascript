const path = require('path');
const {merge} = require('webpack-merge');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = merge(require('./webpack.base.config.js'), {
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
		path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'dev'),
    }),
    new CopyWebpackPlugin({
      patterns: [
        {from: 'assets', to: '', globOptions: {
          ignore: ['**/*.iso', '**/*.doc']
        }}
      ]
    })
  ],
	devServer: {
		port: 9000,
    proxy: {
      '/api': 'http://localhost:3004'
    },
		hot: true,
		contentBase: path.resolve(__dirname, 'dist'),
    before(app){
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
          status: 200
        })
      });
    }
	},
});
