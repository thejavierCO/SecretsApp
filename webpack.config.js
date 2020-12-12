const webpack = require("webpack");
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const path = require("path");
const HWP  = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';

module.exports = {
	entry: {
		bundle: ['./src/main.js']
	},
	resolve: {
		alias: {
			svelte: path.resolve('node_modules', 'svelte')
		},
		extensions: ['*','.mjs', '.js', '.svelte'],
		mainFields: ['svelte', 'browser', 'module', 'main']
	},
	output: {
		path: __dirname + '/build',
		filename: '[name].js',
        chunkFilename: '[name].[id].js',
        // publicPath:__dirname+"/public"
	},
	module: {
		rules: [
			{
				test: /\.svelte$/,
				use: {
					loader: 'svelte-loader',
					options: {
						emitCss: true,
						hotReload: true
					}
				}
			},{
				test: /\.vue$/,
				loader: 'vue-loader'
			},
			{
				test: /\.css$/,
				use: [
                    prod ? MiniCssExtractPlugin.loader : 'style-loader',
                    'css-loader'
				]
            },
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                use:{
                    loader: "babel-loader"
                }
			},
            {
                test: /\.s[ac]ss$/i,
                use: [
					'style-loader',
                    'css-loader',
                    'sass-loader'
                ],
            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
            }
		]
	},
	mode,
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].css'
        }),
        new HWP({
            inject: true,
            template: "./public/index.html",
            filename: "index.html"
        }),
        new webpack.DefinePlugin({
            'process.env.ASSET_PATH': __dirname+"/public",
		}),
		new VueLoaderPlugin()
	],
	devtool: prod ? false: 'source-map'
};