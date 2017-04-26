const path 							= require('path');

function printJSON(message, json) {
	console.log(message);
	console.log("{");
	for (key in json) {
		console.log("   " + key + ": " + normalize(json[key]));
	}
	console.log("}");
}

function normalize(data){
	if(data instanceof Array) {
		var string = "\n   [\n";
		for (index in data) {
			string += "    " + index.toString() + "." + "\t" + data[index] + "\n";
		}
		string += "   ]";
		return string;
	}

	return data;
}

module.exports.printJSON 		= printJSON;