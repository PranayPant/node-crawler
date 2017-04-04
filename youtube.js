const youtube 		= require('youtube-dl');
const fs 			= require('fs');
const DEBUG 		= require('./config.js').getDEBUG();
const {getQueryLinks} 	= require('./crawler.js');

const WHITESPACE 	= " ";
const DELIMITER 	= "+";
const BASE_URL 		= "https://www.youtube.com/";
const SEARCH_SUFFIX = "results?search_query=";

// Exports

function download(url, file) {
	return new Promise((resolve, reject) => {
		var video = youtube(url);
		video
			.on('info', log)
			.pipe(fs.createWriteStream(file))
			.on('close', (resolve) => completedDownload);
		
		//resolve(true);
	});
	
}

function search(query) {
	var links = getQueryLinks(generateUrl(query));
	if(DEBUG) {
		console.log(links);
	}
}

// Helpers

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

function completedDownload(resolve) {
	if (DEBUG) {
		console.log("Finished downloading file!");
		resolve(true);
	}
}

module.exports.download = download;
module.exports.search 	= search;