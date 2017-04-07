
require('./config.js').setDEBUG((process.argv[2]) ? true : false);
const DEBUG 			= require('./config.js').getDEBUG();
const path 				= require('path');
const {search}			= require("./youtube.js");
const express 			= require('express');
const bodyParser 		= require("body-parser");
const app 				= express();

var PORT = process.env.PORT || 3000;
app.listen(PORT);
console.log("Listening on port " + PORT);

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, "views"));

app.use(bodyParser.urlencoded({extended: false}));

app.get("/", function(req, res) {
	res.render("index");
});

app.post("/submit", function(req, res){
	var query = req.body.query;
	var searchPromise = search(query);
	searchPromise
		.then(function(data){
			if(DEBUG) {
				console.log("Data is " + JSON.stringify(data));
			}
			res.send(JSON.stringify(data));
		})
		.catch(function(err){
			if(DEBUG){
				console.log("Error: " + JSON.stringify(err));
			}
			res.send(JSON.stringify(err));
		});
});


module.exports = app;