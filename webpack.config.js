const path 							= require('path');
const webpack 						= require('webpack');

module.exports = {
	devtool: 'source-map',
	//context: path.join(__dirname, 'assets', 'js'),
	entry: [
		//'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
		'./assets/js/main.js',
		'./assets/css/main.css'
	],
	output: {
		path: path.join(__dirname, "dist"),
		filename: 'bundle.js',
		publicPath: '/assets/'
	},
	
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			compressor: {
				warnings: false,
			},
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin()
	],
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [ { loader: 'style-loader' }, { loader: 'css-loader' } ]
			}
		]
	}
}