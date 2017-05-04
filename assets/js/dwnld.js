
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
			//flash_show(elem);
			alert("Please wait while we process your video for download...");
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
				document.body.removeChild(elem);
				//flash_hide();
			}
		})
		.catch(function(err){
			console.error("Error! " + err);
		});
}

module.exports 	= dwnld;