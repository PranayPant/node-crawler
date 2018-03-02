const cheerio 		    = require('cheerio');
const request 		    = require('request');
const DEBUG             = require('./config.js').getDEBUG();

const INVALID           = "undefined";
const PLAYLIST          = "&list=";
const VIDEO_SELECTOR    = 'h3.yt-lockup-title > a[dir=ltr]';
const IMG_SELECTOR      = 'span.yt-thumb-simple > img';
const TIME_SELECTOR     = '.video-time'
const PLAYLIST_NUM      = 'span.formatted-video-count-label > b';
const RESULTS_SELECTOR  = '.num-results';

// Exports

function getPageInfo(searchUrl, baseUrl, embedBase, AUTOPLAY) {

	var titles = [], hrefs = [], queryLinks = [], ids = [], embedLinks = [], imgLinks = [], times = [], isPlaylist = [], playlistSizes = [], numResults = 0;

	var promise = new Promise(function(resolve, reject) {
		
		if(DEBUG) {
			console.log("Search url: " + searchUrl);
			console.log("Base url: " + baseUrl);
			console.log("embedBase: " + embedBase);
		}

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
                if(hrefs[i].includes(PLAYLIST)) {
                    isPlaylist[i] = true;
                }
                else {
                    isPlaylist[i] = false;
                }
    		});
    
    		queryLinks = hrefs.map(function(href) {
    			if(href.includes("?v=")){
    				return (baseUrl + href);
    			}
    		})

    		embedLinks = ids.map(function(id) {
        		// Check if href is not a link to channel, etc
        		if(id){
        			return (embedBase + "/" + id + AUTOPLAY);
        		}
    		});

			$(IMG_SELECTOR).each(function(i, elem) {
        		var src = ( $(this).attr('data-thumb') ) ? $(this).attr('data-thumb') : $(this).attr('src');
        		if(!(src.includes('https'))) {
        			src = "https:" + src;
        		}
        		imgLinks[i] = src;
    		});

            $(TIME_SELECTOR).each(function(i, elem) {
                times[i] = $(this).text();
            });	

            $(PLAYLIST_NUM).each(function(i, elem) {
                playlistSizes[i] = $(this).text();
            });

            numResults = $(RESULTS_SELECTOR).text();

    		var searchObj 			= {};
    		searchObj.embedLinks 	= embedLinks;
    		searchObj.queryLinks 	= queryLinks;
    		searchObj.imgLinks 		= imgLinks;
    		searchObj.titles 		= titles;
            searchObj.times         = times;
            searchObj.isPlaylist    = isPlaylist;
            searchObj.playlistSizes = playlistSizes;
            searchObj.numResults    = numResults;

    		resolve(searchObj);
		});
	});

	return promise;
}

module.exports.getPageInfo = getPageInfo;