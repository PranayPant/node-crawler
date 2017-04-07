const ffmpeg 	= require('ffmpeg');
const DEBUG 	= require('./config.js').getDEBUG();

function convert(movie, audio) {
	
	var promise = new Promise( (resolve, reject) => {
		
		var process = new ffmpeg(movie);
		
		process.then(function (video) {
			
			video.fnExtractSoundToMP3(audio, function (error, file) {
				if (error) {
					if(DEBUG){
						console.error("Problem extracting audio!");
						console.error(error);
					}
					reject(false);
				}
				else {
					if (DEBUG) {
						console.log("Sound extracted!");
					}
					resolve(true);
				}
			});
		})
		.catch(function (error) {
			if(DEBUG) {
				console.error("Problem processing sound!");
				console.error(error);
			}
			reject(false);
		});

	});

	return promise;
}

module.exports.convert = convert;