
window.load_iframe = function(elem) {

	var src = $(elem).attr('embed-url');

	var iframe = document.createElement("iframe");
	iframe.setAttribute( "frameborder", "0" );
	iframe.setAttribute( "allowfullscreen", "" );
	iframe.setAttribute( "src", src );

	$(elem).html("");
	$(elem).append(iframe);
}

module.exports 	= load_iframe;