const youtube 		= require('youtube-dl');
const fs 			= require('fs');
const DEBUG 		= require('./config.js').getDEBUG();

const WHITESPACE 	= " ";
const DELIMITER 	= "+";
const BASE_URL 		= "https://www.youtube.com/";
const SEARCH_SUFFIX = "results?search_query=";

// Exports

function download(url, file) {
	var video = youtube(url);
	video
		.on('info', log)
		.pipe(fs.createWriteStream(file))
		.on('close', completedDownload);
}

// Helpers

function getVideo(searchUrl) {
	
}

function generateUrl(query) {
	return BASE_URL + SEARCH_SUFFIX + query.split(WHITESPACE).join(DELIMITER);
}

function log(info) {
	if (DEBUG){	
		console.log('Download started');
		console.log('filename: ' + info.filename);
		console.log('size: ' + info.size);
	}
}

function completedDownload() {
	if (DEBUG) {
		console.log("Finished downloading file!");
	}
}

module.exports.download = download;