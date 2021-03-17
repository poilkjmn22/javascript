const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const EslintPlugin = require('eslint-webpack-plugin');

const babelConfig = require('./babel.config.json');

const VueLoaderPlugin = require('vue-loader/lib/plugin');

debugger;

module.exports = {
	mode: 'development',
	devtool: 'inline-source-map',
	entry: {
		algorithms: ['./algorithms/sort/test.js'],
		benchmark: ['./algorithms/sort/benchmark.js'],
		['benchmark-search']: ['./algorithms/search/benchmark.js'],
		search: ['./algorithms/search/test.js'],
		base: ['./base/test.js', './base/iterator.js', './base/generator.js', './base/async.js', './base/object.js', './base/inherit.js'],
    vue: ['./MVx/vue/index.js'],
    mianshi: ['./algorithms/mianshi.js'],
    net: ['./base/net/xhr.js', './base/net/fetch.js'],
    regexp: ['./regexp/base.js', './regexp/numbers.js'],
	},
  module:{
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      //{
        //test: /\.js$/,
        //exclude: file => (
          ///node_modules/.test(file) &&
          //!/\.vue\.js/.test(file)
        //),
        //use: {
          //loader: 'babel-loader',
          //options: Object.assign({
            //cacheDirectory: true
          //}, babelConfig)
        //},
      //},
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      //{
        //test: /\.s[ac]ss$/,
        //use: [
        //'vue-style-loader',
        //'css-loader', 
        //{
          //loader: 'sass-loader',
          //options: {
            //implementation: require("sass"),
            //sassOptions: {
              //fiber: false,
            //},
          //}, 
        //}],
      //},
      {
        test: /\.s[ac]ss$/,
        use: [
        'style-loader',
        'css-loader', 
        {
          loader: 'sass-loader',
          options: {
            implementation: require("sass"),
            sassOptions: {
              fiber: false,
            },
          }, 
        }],
      },
    ],
  },
  resolve:{
    mainFields: ['module', 'main'],
    alias: {
      style: path.resolve(__dirname, './style/'),
      root: path.resolve(__dirname)
    }
  },
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].bundle.js'
	},

	plugins: [
		new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
		new HtmlWebpackPlugin({
			title: 'algorithms in a nutshell, second edition',
			filename: 'algorithms.html',
			template: './algorithms/index.html',
			chunks: ['algorithms']
		}),
		new HtmlWebpackPlugin({
			title: 'javascript 高级程序设计（第4版）',
			filename: 'index.html',
			template: './base/index.html',
			chunks: ['base'],
		}),
		new HtmlWebpackPlugin({
			title: '各种排序算法性能测试',
			filename: 'benchmark-sort.html',
			template: './algorithms/sort/benchmark.html',
			chunks: ['benchmark'],
		}),
		new HtmlWebpackPlugin({
			title: '性能测试-搜索算法',
			filename: 'benchmark-search.html',
			template: './algorithms/search/benchmark.html',
			chunks: ['benchmark-search'],
		}),
		new HtmlWebpackPlugin({
			title: '搜索算法',
			filename: 'algorithms-search.html',
			template: './algorithms/search/search.html',
			chunks: ['search'],
		}),
		new HtmlWebpackPlugin({
			title: '面试中的算法题',
			filename: 'algorithms-mianshi.html',
			template: './algorithms/mianshi.html',
			chunks: ['mianshi'],
		}),
		new HtmlWebpackPlugin({
			title: '网络请求与远程资源',
			filename: 'base-net.html',
			template: './base/net.html',
			chunks: ['net'],
		}),
		new HtmlWebpackPlugin({
			title: '正则表达式',
			filename: 'regexp.html',
			template: './regexp/index.html',
			chunks: ['regexp'],
		}),
		new HtmlWebpackPlugin({
			title: '深入浅出Vue.js',
			filename: 'vue-base.html',
			template: './MVx/vue/index.html',
			chunks: ['vue'],
		}),
		new EslintPlugin({
			outputReport: false,
			emitError: false,
			emitWarning: false,
		}),
    new VueLoaderPlugin(),
	],

	devServer: {
		port: 9000,
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
}
