const cheerio 	= require('cheerio');
const request 	= require('request');
const DEBUG 	= require('./config.js').getDEBUG();

// Exports

function getQueryLinks(searchUrl) {
	request(searchUrl, (error, response, html) => {
		if (error) {
			if (DEBUG) {
				console.error(error);
				return;
			}
		}
		var $ = cheerio.load(html);

		var links = $(".yt-lockup-title:nth-child(1)").attr('src');
		if(DEBUG) {
			console.log("Search links are: " + links);
		}
		return links;

	});
}


module.exports.getQueryLinks = getQueryLinks;