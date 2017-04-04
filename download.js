const fs 		= require('fs');
const request 	= require('request');
const {DEBUG} 	= require('./config.js');

if(DEBUG) {
	require('request-debug')(request);
}

function download(url, destination) {
	
	request(url, (error, response, html) => {
		if(error) {
			console.error(error);
			return;
		}
	})
	.pipe(fs.createWriteStream(destination)).on( 'close', () => {
																	if(DEBUG){
																		console.log("Download complete!");
																	}
																});
}

module.exports.download = download;