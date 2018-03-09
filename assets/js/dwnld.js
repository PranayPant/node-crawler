
window.dwnld = function(elem) {
	
	const cbURL 	= window.location.origin + "/xhr";
	const link 		= $(elem).attr('link');
	const title 	= $(elem).attr('title');
	const is_mp3 	= $(elem).attr('mp3');
	
	var headers  = new Headers();
	headers.append("link", link);
	headers.append("is_mp3", is_mp3);
	
	const options = 	{	
							method: 'GET', 
							headers: headers 
						};
	const request = new Request(cbURL, options);

	fetch(request)
		.then(function(res){
			flash_start();
			return res.blob();
		})
		.then(function(blob){
			var type = ( is_mp3 === '0' ) ? 'video/mp4' : 'audio/mp3';
			var ext  = ( is_mp3 === '0' ) ? '.mp4' : '.mp3';

			var blob = new Blob([blob], {type: type});
   		if(window.navigator.msSaveOrOpenBlob) {
      		window.navigator.msSaveBlob(blob, filename);
			}
			else{
				var elem = window.document.createElement('a');
				elem.href = window.URL.createObjectURL(blob);
				elem.download = title + ext;        
				document.body.appendChild(elem);
				elem.click();
				flash_complete();  
				document.body.removeChild(elem);
			}
		})
		.catch(function(err){
			console.error("Error! " + err);
		});
}

window.flash_start = function() {
	var div = document.createElement("div");
	div.setAttribute('id', 'flash-message');
	div.textContent = "Preparing your content...";
	document.body.appendChild(div);
}

window.flash_complete = function() {
	document.getElementById("flash-message").textContent = "Your download has started!";
	setTimeout( hide_flash, 5000 );
}

window.hide_flash = function() {
	document.getElementById("flash-message").style = "display:none";
}

module.exports = dwnld;