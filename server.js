require('./lib/config.js').setDEBUG((process.argv[2]) ? true : false);

const path 										= require('path');
const express 									= require('express');
const bodyParser 								= require("body-parser");

const app 										= express();
const {getDEBUG, configureDev}			= require("./lib/config.js");
const {printJSON}						 		= require("./lib/util.js");
const {search, download}					= require("./lib/youtube.js");
const DEBUG 									= getDEBUG();


// Set up server

var PORT = process.env.PORT || 8080;
app.listen(PORT);
console.log("Listening on port " + PORT);


// Configure middleware

configureDev(app, express);

app.set('view engine', 'pug');
app.set('views', path.resolve( path.join(__dirname, "views") ));

app.use(express.static( path.resolve( path.join(__dirname, 'dist') ) ));
app.use(express.static( path.resolve( path.join(__dirname, 'assets/img') ) ));
app.use(bodyParser.urlencoded({extended: false}));

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

app.get("/xhr", function(req, res) {

	var option = ( req.headers.is_mp3 === '0' ) ? false : true;
	
	download(req.headers.link, option)
		.then( (readStream)=> {
			readStream
				.once( 'data', (data) => {
					console.log('Received data of size ' + data.length)
					res.end(data)
				})
				.once( 'error', (err) => {
					res.status(404).end( err.message )
				});

		})
		.catch( (err)=> {
			console.error("Error retrieving video stream!");
			console.error(err);
		});
});

