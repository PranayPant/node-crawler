
window.dwnld = function() {
	
	var link 	= $(this).attr('link');
	var is_mp3 	= $(this).attr('mp3');
	var url 		= "http://localhost:8080/submit"

	var headers = new Headers();
	headers.append("X-Requested-With", "XMLHttpRequest");

	var options = {method: 'GET', headers: headers};
	var request = new Request(url, options);
	
	fetch(request)
		.then(function(res){
			console.log(res.body);
			alert(res.body);
		})
		.catch(function(err){
			alert(err);
		});
}

module.exports 	= dwnld;