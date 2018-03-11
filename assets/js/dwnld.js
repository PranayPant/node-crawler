
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
			console.log(res)
			if ( res.status === 404 ) {
				throw new Error('Video unavailable');		
			}
			
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
			console.error(err);
			flash_error(err.message)
		});
}

window.flash_start = function() {

	flash_create('Preparing your content...')
}

window.flash_error = function( message ) {

	flash_create( message, '#993300' )
	setTimeout( hide_flash, 3000 )
}

window.flash_complete = function() {
	document.getElementById("flash-p").textContent = "Your download has started!";
	setTimeout( hide_flash, 3000 );
}

window.hide_flash = function() {
	var flash = document.getElementById("flash-wrapper");
	document.body.removeChild(flash);
}

window.flash_create = function( text, color ) {

	var wrapper = document.createElement('div');
	var div = document.createElement("div");
	var p = document.createElement('p');
	
	wrapper.setAttribute('id', 'flash-wrapper');
	div.setAttribute('id', 'flash-message');
	p.setAttribute('id', 'flash-p');
	p.textContent = text;
	if( color ) div.setAttribute( 'style', 'background-color:' + color)

	div.appendChild(p);
	wrapper.appendChild(div);

	document.body.appendChild(wrapper);
}

module.exports = dwnld;