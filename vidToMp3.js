const ffmpeg 	= require('ffmpeg');
const DEBUG 	= require('./config.js').getDEBUG();

function convert(movie, audio){
	try {
		
		var process = new ffmpeg(movie);
		
		process.then(function (video) {
			
			video.fnExtractSoundToMP3(audio, function (error, file) {
				if (error) {
					if(DEBUG){
						console.log("Problem extracting audio!");
						console.log(error);
					}
				}
			});
		}, 
		function (err) {
			if(DEBUG) {
				console.log("Problem processing video!");
				console.log(err);
			}
		});
	} 
	catch (e) {
		if (DEBUG) {
			console.log(e.code);
			console.log(e.msg);
		}

	}
}

module.exports.convert = convert;