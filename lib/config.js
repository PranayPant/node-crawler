
const path 					= require('path');
const webpack				= require('webpack');
const bodyParser 			= require("body-parser");


const env 					= process.env.NODE_ENV;
const webpackConfigFile = ( env === 'development' ) ? "../webpack.dev.js" : "../webpack.prod.js";
const webpackConfig		= require(webpackConfigFile);
const webpackCompiler	= webpack(webpackConfig);

var DEBUG = false;

// Configure middleware for development

function configure(app, express) {
	
	if (env === 'development'){
		
		const webpackDevMiddleware 				= require("webpack-dev-middleware");
		const webpackHotMiddleware 				= require("webpack-hot-middleware");

		app.use(webpackDevMiddleware(webpackCompiler, {
			hot: true,
			filename: 'bundle.js',
			publicPath: webpackConfig.output.publicPath,
			stats: {
				colors: true,
			},
			historyApiFallback: true,
		}));

		app.use(webpackHotMiddleware(webpackCompiler, {
			log: console.log,
			path: '/__webpack_hmr',
			heartbeat: 10 * 1000,
		}));
	}

	app.set('view engine', 'pug');
	app.set('views', path.resolve( path.join("../webcrawlers", "views") ));

	app.use(express.static( path.resolve( path.join("../webcrawlers", 'dist') ) ));
	app.use(express.static( path.resolve( path.join("../webcrawlers", 'assets/img') ) ));
	app.use(bodyParser.urlencoded({extended: false}));
}

// Set up debugging

function setDEBUG(debug) {
	DEBUG = debug;
	if (DEBUG) {
		console.log("DEBUG set to " + DEBUG);
	}
}

function getDEBUG() {
	return DEBUG;
}


// Exports

module.exports.getDEBUG 			= getDEBUG;
module.exports.setDEBUG 			= setDEBUG;
module.exports.configure 			= configure;
