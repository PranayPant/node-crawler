const cheerio 	= require('cheerio');
const request 	= require('request');
const DEBUG 	= require('./config.js').getDEBUG();
const INVALID 	= "undefined";

// Exports

function getPageInfo(searchUrl, baseUrl, embedBase) {

	var titles = [], hrefs = [], queryLinks = [], ids = [], embedLinks = [];

	var promise = new Promise(function(resolve, reject) {
		
		request(searchUrl, function(error, response, html) {
    		if (error) {
        		if(DEBUG){
        			console.error("Error searching url: " + JSON.stringify(error));
        		}
        		reject(error);
    		}
    
    		var $ = cheerio.load(html);
    
    		$('h3 > [dir=ltr]').each(function(i, elem) {
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

    		var searchObj = {};
    		searchObj.embedLinks = embedLinks;
    		searchObj.queryLinks = queryLinks;
    		searchObj.titles = titles;

    		resolve(searchObj);
		});
	});

	return promise;
}

module.exports.getPageInfo = getPageInfo;