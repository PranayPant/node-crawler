
window.load_iframe = function(elem) {

	var src = $(elem).attr('embed-url');

	var iframe = document.createElement("iframe");
	iframe.setAttribute( "width", "246" );
	iframe.setAttribute( "frameborder", "0" );
	iframe.setAttribute( "allowfullscreen", "" );
	iframe.setAttribute( "src", src );

	$(elem).html("");
	$(elem).html($(iframe).prop('outerHTML'));
}

function sleep(milliseconds) {
	var start = new Date().getTime();
	for (var i = 0; i < 1e7; i++) {
		if ((new Date().getTime() - start) > milliseconds){
			break;
		}
	}
}

module.exports 	= load_iframe;