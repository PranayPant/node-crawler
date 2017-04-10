const cheerio 	= require('cheerio');
const request 	= require('request');
const DEBUG 	= require('./config.js').getDEBUG();

const INVALID 			= "undefined";
const VIDEO_SELECTOR 	= 'h3.yt-lockup-title > a[dir=ltr]';
const IMG_SELECTOR 		= 'span.yt-thumb-simple > img';

// Exports

function getPageInfo(searchUrl, baseUrl, embedBase) {

	var titles = [], hrefs = [], queryLinks = [], ids = [], embedLinks = [], imgLinks = [];

	var promise = new Promise(function(resolve, reject) {
		
		request(searchUrl, function(error, response, html) {
    		if (error) {
        		if(DEBUG){
        			console.error("Error searching url: " + JSON.stringify(error));
        		}
        		reject(error);
        		return promise;
    		}
    
    		var $ = cheerio.load(html);
    
    		$(VIDEO_SELECTOR).each(function(i, elem) {
        		titles[i] = $(this).attr('title');
        		hrefs[i] = $(this).attr('href');
        		ids[i] = hrefs[i].split('?v=')[1];
    		});
    
    		queryLinks = hrefs.map(function(href) {
    			if(href.includes("?v=")){
    				return (baseUrl + href);
    			}
    		})

    		embedLinks = ids.map(function(id) {
        		// Check if href is not a link to channel, etc
        		if(id){
        			return (embedBase + "/" + id);
        		}
    		});

			$(IMG_SELECTOR).each(function(i, elem) {
        		var src = ( $(this).attr('data-thumb') ) ? $(this).attr('data-thumb') : $(this).attr('src');
        		// Check is its actual link to img
        		if(src.includes('https')) {
        			imgLinks[i] = src;
        		}
    		});    		

    		var searchObj 			= {};
    		searchObj.embedLinks 	= embedLinks;
    		searchObj.queryLinks 	= queryLinks;
    		searchObj.imgLinks 		= imgLinks;
    		searchObj.titles 		= titles;

    		resolve(searchObj);
		});
	});

	return promise;
}

module.exports.getPageInfo = getPageInfo;