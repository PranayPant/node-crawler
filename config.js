var DEBUG = false;

function setDEBUG(debug) {
	DEBUG = debug;
	if (DEBUG) {
		console.log("DEBUG set to " + DEBUG);
	}
}

function getDEBUG() {
	return DEBUG;
}


module.exports.getDEBUG 	= getDEBUG;
module.exports.setDEBUG 	= setDEBUG;