const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const EslintPlugin = require('eslint-webpack-plugin');

const babelConfig = require('./babel.config.json');

const VueLoaderPlugin = require('vue-loader/lib/plugin');

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
	},
  module:{
    rules: [
      {
        test: /\.js$/,
        exclude: file => (
          /node_modules/.test(file) &&
          !/\.vue\.js/.test(file)
        ),
        use: {
          loader: 'babel-loader',
          options: Object.assign({
            cacheDirectory: true
          }, babelConfig)
        },
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      },
    ],
  },
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].bundle.js'
	},

	plugins: [
		new CleanWebpackPlugin(),
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
		contentBase: path.resolve(__dirname, 'dist')
	},
}
