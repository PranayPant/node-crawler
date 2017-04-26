require('./lib/config.js').setDEBUG((process.argv[2]) ? true : false);

const path 										= require('path');
const express 									= require('express');
const bodyParser 								= require("body-parser");
const app 										= express();
const webpack 									= require('webpack');
const webpackDevMiddleware 				= require("webpack-dev-middleware");
const webpackHotMiddleware 				= require("webpack-hot-middleware");

const {getDEBUG}								= require("./lib/config.js");
const {printJSON}						 		= require("./lib/util.js");
const {search}									= require("./lib/youtube.js");
const webpackConfig 							= require("./webpack.config.js");
const DEBUG 									= getDEBUG();


// Set up server

var PORT = process.env.PORT || 8080;
app.listen(PORT);
console.log("Listening on port " + PORT);


// Configure middleware

const compiler = webpack(webpackConfig);

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, "views"));

app.use(express.static(path.resolve(path.join(__dirname, '/dist'))));
app.use(express.static(path.resolve(path.join(__dirname, '/assets/img'))));
app.use(bodyParser.urlencoded({extended: false}));

app.use(webpackDevMiddleware(compiler, {
	hot: true,
	filename: 'bundle.js',
	publicPath: webpackConfig.output.publicPath,
	stats: {
		colors: true,
	},
	historyApiFallback: true,
})); 
app.use(webpackHotMiddleware(compiler, {
	log: console.log,
	path: '/__webpack_hmr',
	heartbeat: 10 * 1000,
}));


// Routes

app.get("/", function(req, res) {
	res.render("home");
});

app.post("/submit", function(req, res){
	
	var query = req.body.query;
	var searchPromise = search(query);
	searchPromise
		.then(function(data){
			if(DEBUG) {
				printJSON("Data is ", data);
			}
			res.render("results", data);
		})
		.catch(function(err){
			if(DEBUG){
				console.log("Error: " + err);
			}
			res.send(JSON.stringify(err));
		});
});

app.get("/submit", function(req, res) {
	res.send("success!");
});


//module.exports = app;