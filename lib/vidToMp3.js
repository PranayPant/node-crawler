const ffmpeg 	= require('ffmpeg');
const path 		= require('path');

const DEBUG 	= require('./config.js').getDEBUG();

function convert(movie, AUDIO) {
	
	var promise = new Promise( (resolve, reject) => {
		
		var process = new ffmpeg(movie);
		
		process.then(function (video) {
			
			video.fnExtractSoundToMP3(AUDIO, function (error, file) {
				if (error) {
					if(DEBUG){
						console.error("Problem extracting audio!");
						console.error(error);
					}
					reject(error);
				}
				else {
					if (DEBUG) {
						console.log("Sound extracted!");
					}
					resolve(file);
				}
			});
		})
		.catch(function (error) {
			if(DEBUG) {
				console.error("Problem processing sound!");
				console.error(error);
			}
			reject(error);
		});

	});

	return promise;
}

module.exports.convert = convert;