
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
			console.log('1st')
			flash_start();
			return res.blob();
		})
		.then(function(blob){
			console.log('2nd')
			var type = ( is_mp3 === '0' ) ? 'video/mp4' : 'audio/mp3';
			var ext  = ( is_mp3 === '0' ) ? '.mp4' : '.mp3';

			var blob = new Blob([blob], {type: type});
   		if(window.navigator.msSaveOrOpenBlob) {
      		window.navigator.msSaveBlob(blob, filename);
			}
			else{
				console.log('2nd')
				var elem = window.document.createElement('a');
				elem.onclick = flash_complete;
				elem.href = window.URL.createObjectURL(blob);
				elem.download = title + ext;        
				document.body.appendChild(elem);
				elem.click();        
				document.body.removeChild(elem);
			}
		})
		.catch(function(err){
			console.log('4nd')
			console.error("Error! " + err);
		});
}

function flash_start() {
	
	var div = document.createElement("div");
	div.setAttribute('class', 'flash-message');
	div.textContent = "Preparing your content...";
	document.body.appendChild(div);
}

function flash_complete() {
	document.getElementById("flash-message").textContent = "Your download has started!";
	console.log('don2')
	setTimeout( hide_flash, 3000 );
}

function hide_flash() {
	document.getElementById("flash-message").style = "display:none";
}

module.exports = dwnld;