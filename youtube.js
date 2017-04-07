const youtube 			= require('youtube-dl');
const fs 				= require('fs');
const DEBUG 			= require('./config.js').getDEBUG();
const {getPageInfo} 	= require('./crawler.js');

const WHITESPACE 	= " ";
const DELIMITER 	= "+";
const BASE_URL 		= "https://www.youtube.com";
const SEARCH_AFFIX 	= "/results?search_query=";
const EMBED_AFFIX   = "/embed";

// Exports

function download(url, file) {
	var promise = new Promise((resolve, reject) => {
		var video = youtube(url);
		video
			.on('info', (info) => {
				if (DEBUG){	
					console.log('Download started...');
					console.log('filename: ' + info._filename);
					console.log('size: ' + info.size);
				}
			})
			.pipe(fs.createWriteStream(file))
			.on('close', (file) => {
				if (DEBUG) {
					console.log("Download success!");
				}
				resolve(true);
			});
		
	});
	return promise;
}

function search(query) {
	return getPageInfo(generateQueryUrl(query), BASE_URL, generateEmbedUrl());
}

// Helpers

function generateQueryUrl(query) {
	return BASE_URL + SEARCH_AFFIX + query.split(WHITESPACE).join(DELIMITER);
}

function generateEmbedUrl() {
	return BASE_URL + EMBED_AFFIX;
}


module.exports.download = download;
module.exports.search 	= search;