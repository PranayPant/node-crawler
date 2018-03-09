const youtube 			= require('ytdl-core');
const fs 				= require('fs');
const path 				= require('path');

const DEBUG 			= require('./config.js').getDEBUG();
const {getPageInfo} 	= require('./crawler.js');

const WHITESPACE 		= " ";
const DELIMITER 		= "+";
const BASE_URL 		= "https://www.youtube.com";
const SEARCH_AFFIX 	= "/results?search_query=";
const EMBED_AFFIX   	= "/embed";

// Options

const AUTOPLAY_ON 	= "?autoplay=1";

// Exports

function download(url, isMP3) {
		
	var promise = new Promise((resolve, reject) => {
		
		var options = {};
		if(isMP3){
			options.filter = 'audioonly';
		}
		
		var video = youtube(url, options);
		
		resolve(video);	
	});
	
	return promise;
}

function search(query) {
	return getPageInfo( generateQueryUrl(query), BASE_URL, generateEmbedUrl(), AUTOPLAY_ON );
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