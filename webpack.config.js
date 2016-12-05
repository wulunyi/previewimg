/**
 * @description Created by wulunyi on 16/10/5.
 * @author wulunyi
 */
'use strict';

var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var SRC_PATH = path.join(__dirname, './src');
var DIST_PATH = path.join(__dirname, './dist');
var TEST_PATH = path.join(__dirname, './test');

var production = (process.env.NODE_ENV === 'production');

module.exports = {
	entry: {
		index: path.resolve(SRC_PATH, '../index.js')
	},

	output: {
		'filename': '[name].bundle.js',
		'path': 'dist',
		'publicPath': '/preViewImg/dist'
	},

	resolve: {
		extensions: ['', '.js', '.scss'],
		alias: {
			css: path.join(TEST_PATH, 'css'),
			js: path.join(TEST_PATH, 'js'),
			img: path.join(TEST_PATH, 'images'),
			src: path.join(SRC_PATH)
		}
	},

	devServer: {
		contentBase: './dist',
		historyApiFallback: true,
		hot: true,
		inline: true,
		progress: true
	},

	module: {
		// preLoaders: [
		// 	{
		// 		test: /\.js/,
		// 		loader: 'eslint',
		// 		exclude: /node_modules/
		// 	}
		// ],

		loaders: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			},

			{
				test: /\.scss$/,
				loader: 'style!css!sass'
			}

		]
	},

	plugins: [
		// new HtmlWebpackPlugin({
		// 	filename: path.resolve(DIST_PATH, 'index.html'),
		// 	template: path.resolve(TEST_PATH, 'page/index.html'),
		// 	chunks: ['index'],
		// 	inject: 'body'
		// }),
		new webpack.HotModuleReplacementPlugin()
	]
};


