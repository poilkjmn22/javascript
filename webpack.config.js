const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const EslintPlugin = require('eslint-webpack-plugin');

module.exports = {
	mode: 'development',
	devtool: 'inline-source-map',
	entry: {
		algorithms: './algorithms/test.js',
		base: ['./base/test.js', './base/iterator.js', './base/generator.js']
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
		new EslintPlugin({
			outputReport: false,
			emitError: false,
			emitWarning: false,
		})
	],

	devServer: {
		port: 9000,
		hot: true,
		contentBase: path.resolve(__dirname, 'dist')
	},
}
