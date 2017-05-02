const path 					= require('path');

const VIDEO_PATH			= path.join(__dirname, "data", "videos", "video.mp3");
const AUDIO_PATH 			= path.join(__dirname, "data", "soundtracks", "sound.mp3");

var DEBUG = false;

// Set up debugging

function setDEBUG(debug) {
	DEBUG = debug;
	if (DEBUG) {
		console.log("DEBUG set to " + DEBUG);
	}
}

function getDEBUG() {
	return DEBUG;
}


// Exports

module.exports.getDEBUG 		= getDEBUG;
module.exports.setDEBUG 		= setDEBUG;
module.exports.AUDIO_PATH 		= AUDIO_PATH;
module.exports.VIDEO_PATH 		= VIDEO_PATH;
