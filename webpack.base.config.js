const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const EslintPlugin = require('eslint-webpack-plugin');

const babelConfig = require('./babel.config.json');

const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
	entry: {
    SPA: './src/SPA.js',
		//algorithms: ['./algorithms/sort/test.js'],
		//benchmark: ['./algorithms/sort/benchmark.js'],
		//['benchmark-search']: ['./algorithms/search/benchmark.js'],
		//search: ['./algorithms/search/test.js'],
		//base: ['./base/test.js', './base/iterator.js', './base/generator.js', './base/async.js', './base/object.js', './base/inherit.js'],
    //vue: ['./MVx/vue/index.js'],
    //react: ['./MVx/react/index.jsx'],
    //mianshi: ['./algorithms/mianshi.js'],
    //net: ['./base/net/xhr.js', './base/net/fetch.js'],
    //regexp: ['./regexp/base.js', './regexp/numbers.js', './regexp/program.js', './regexp/validate.js'],
    //bom: ['./base/bom/index.js'],
    //dom: ['./base/dom/sticky-bar.js'],
    //generator: ['./deep/generator.js'],
	},
  module:{
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.jsx?$/,
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
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader'
        ]
      },
    ],
  },
  resolve:{
    mainFields: ['module', 'main'],
    alias: {
      style: path.resolve(__dirname, './style/'),
      root: path.resolve(__dirname),
      comp: path.resolve(__dirname, 'src/components'),
    }
  },
	output: {
		filename: '[name].bundle.js'
	},

	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			title: 'javascript Playground',
			filename: 'index.html',
			template: './src/index.template.html',
			chunks: ['SPA'],
		}),
		//new HtmlWebpackPlugin({
			//title: 'algorithms in a nutshell, second edition',
			//filename: 'algorithms.html',
			//template: './algorithms/index.html',
			//chunks: ['algorithms']
		//}),
		//new HtmlWebpackPlugin({
			//title: '各种排序算法性能测试',
			//filename: 'benchmark-sort.html',
			//template: './algorithms/sort/benchmark.html',
			//chunks: ['benchmark'],
		//}),
		//new HtmlWebpackPlugin({
			//title: '性能测试-搜索算法',
			//filename: 'benchmark-search.html',
			//template: './algorithms/search/benchmark.html',
			//chunks: ['benchmark-search'],
		//}),
		//new HtmlWebpackPlugin({
			//title: '搜索算法',
			//filename: 'algorithms-search.html',
			//template: './algorithms/search/search.html',
			//chunks: ['search'],
		//}),
		//new HtmlWebpackPlugin({
			//title: '面试中的算法题',
			//filename: 'algorithms-mianshi.html',
			//template: './algorithms/mianshi.html',
			//chunks: ['mianshi'],
		//}),
		//new HtmlWebpackPlugin({
			//title: 'BOM',
			//filename: 'base-bom.html',
			//template: './base/net.html',
			//chunks: ['bom'],
		//}),
		//new HtmlWebpackPlugin({
			//title: 'DOM',
			//filename: 'base-dom.html',
			//template: './base/dom/index.html',
			//chunks: ['dom'],
		//}),
		//new HtmlWebpackPlugin({
			//title: 'Deep-Generator',
			//filename: 'deep-generator.html',
			//template: './base/index.html',
			//chunks: ['generator'],
		//}),
		//new HtmlWebpackPlugin({
			//title: '网络请求与远程资源',
			//filename: 'base-net.html',
			//template: './base/net.html',
			//chunks: ['net'],
		//}),
		//new HtmlWebpackPlugin({
			//title: '正则表达式',
			//filename: 'regexp.html',
			//template: './regexp/index.html',
			//chunks: ['regexp'],
		//}),
		//new HtmlWebpackPlugin({
			//title: 'React快速上手',
			//filename: 'react-demo.html',
			//template: './MVx/react/index.html',
			//chunks: ['react'],
		//}),
		//new HtmlWebpackPlugin({
			//title: '深入浅出Vue.js',
			//filename: 'vue-base.html',
			//template: './MVx/vue/index.html',
			//chunks: ['vue'],
		//}),
		new EslintPlugin({
			outputReport: false,
			emitError: false,
			emitWarning: false,
		}),
    new VueLoaderPlugin(),
	],

}
