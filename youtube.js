const youtube 		= require('youtube-dl');
const fs 			= require('fs');
const DEBUG 		= require('./config.js').getDEBUG();

function download(url, file) {
	var video = youtube(url);

	video
		.on('info', function(info) {
			if(DEBUG) {
				console.log('Download started');
				console.log('filename: ' + info._filename);
				console.log('size: ' + info.size);
			}
		})
		.pipe(fs.createWriteStream(file))
		.on('close', () => {
			if (DEBUG) {
				console.log("Finished downloading file!");
			}
		});
}

function log(info) {
	if (DEBUG){	
		console.log('Download started');
		console.log('filename: ' + info.filename);
		console.log('size: ' + info.size);
	}
}

function completedDownload() {
	if (DEBUG) {
		console.log("Finished downloading file!");
	}
}

module.exports.download = download;