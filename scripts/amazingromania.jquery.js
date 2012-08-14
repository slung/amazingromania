var AR = AR || {};

AR.Settings = {
	
};

AR.useEvents = function( className )
{
	AR.mix( M.EventDispatcher, className  );
};



/**
 * Bind function context.
 * 
 * @method bind
 * @param fn
 * @param c
 */
AR.bind = function(fn, c) 
{
    return function() {
        return fn.apply(c || fn, arguments);
    };
};

/**
 * Extend a class
 * 
 * @param subClass
 * @param superClass
 */
AR.mix = function(source, dest) {

	var tmp = dest.prototype;
	
	dest.prototype = new source();
	dest.prototype.constructor = dest;
	
	for( var key in tmp )
		dest.prototype[key] = tmp[key];
};

AR.one = function( selector, parent )
{
	var result = jQuery( selector );

	if( parent )	
		result = jQuery( parent ).find( selector );
		
	return result[0];
};

AR.all = function( selector, parent )
{
	var result = jQuery( selector );

	if( parent )	
		result = jQuery( parent ).find( selector );
		
	return result;
};

AR.append = function( element, content )
{
	return jQuery( element ).append( content );
};

AR.mask = function( element, text )
{
	return jQuery( element ).mask(text);
};

AR.unmask = function( element )
{
	return jQuery( element ).unmask();
};

AR.getSelected = function( element )
{
	return jQuery(element).find(":selected")[0]
}

AR.isMasked = function( element )
{
	return jQuery( element ).isMasked();
};

AR.wrap = function( element, content )
{
	return jQuery( element ).wrap( content );
};

AR.trimString = function( string, count )
{
	return string.substring(0, count) + "...";
};

// Merge Arrays
AR.merge = function( first, second )
{
	return jQuery.merge( first, second );
};

// Merge objects
AR.extend = function( first, second )
{
	return jQuery.extend( first, second );
};

AR.ie = function()
{
	var result = 0;
	
	if( jQuery.browser.msie == true )
		result = jQuery.browser.version.slice(0, 1);
	
	return result;
};

AR.delegate = function( parent, selector, eventType, handler )
{
	return jQuery(parent).delegate( selector, eventType, handler );
};

AR.on = function( selector, eventType, handler )
{
	return jQuery(selector).on( eventType, handler );
};

AR.css = function( container, property, value )
{
	return  jQuery(container).css( property, value );
};

AR.addClass = function( element, className )
{
	jQuery(element).addClass(className);
};
		
AR.removeClass = function( element, className)
{
	jQuery(element).removeClass(className);
};

AR.hasClass = function( element, className )
{
	return jQuery(element).hasClass(className);
};

AR.decodeHTML = function( encodedString )
{
	return jQuery("<div/>").html(encodedString).text();
};

AR.queryStringParameter = function( name ) {

    var match = RegExp('[?&]' + name + '=([^&]*)')
                    .exec(window.location.search);

    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
};

/*
 * Share Store locator related data via Facebook, Twitter and Email
 * 
 * shareTarget: POINT or ITINERARY
 */
AR.share = function( shareTarget, shareEngine, options ){
	
	options = options || {};
	var url = "";
	
	var language = "";
	
	if (AR.Settings.language)
		language = "&LANGUAGE=" + AR.Settings.language;
	
	switch ( shareTarget.toLowerCase() )
	{
		case 'point':
		{
			options.sharedField = options.sharedField || "id";
			options.sharedValue = options.sharedValue || options.point.pointId;
			
			url = AR.Settings.shareUrl + 
				  "mapurl.html?key=" + AR.Settings.key +
				  language + 
				  "&customer=" + AR.Settings.customer +
				  "&tableName=" + AR.Settings.tableName;
				  
			url = encodeURIComponent( url + "&" + options.sharedField + "=" + options.sharedValue );
			
			break;
		}
		
		case 'itinerary':
		{
			var itineraryParameters = "&startAddress=" + options.itinerary.startAddress +
									  "&endAddress=" + options.itinerary.endAddress +
									  "&endAddressString=" + options.itinerary.endAddressString +
									  "&travelMode=" + options.itinerary.travelMode;
									  
			url = AR.Settings.shareUrl + 
				  "itineraryurl.html?key=" + AR.Settings.key +
				  language + 
				  "&customer=" + AR.Settings.customer;
				  
			url = encodeURIComponent( url + itineraryParameters );
			
			break;
		}
	}
	

	
	switch (shareEngine.toLowerCase())
	{
		case 'facebook':
		{
			url = decodeURIComponent( url );
			url = encodeURI( url );  
			
			this.dataManager = AR.DataManager.getInstance();
			
			this.dataManager.shortenUrl( url, function( data ){
				
				var windowWidth = "660";
				var windowHeight = "280";
			    var centerWidth = (window.screen.width - windowWidth) / 2;
	    		var centerHeight = (window.screen.height - windowHeight) / 2;
				
				window.open(
					"http://www.facebook.com/sharer/sharer.php?u=" + data.id + "&t=test",
					null,
					"resizable=0,width=" + windowWidth + 
					",height=" + windowHeight +
					",left=" + centerWidth + 
					",top=" + centerHeight
				);
			} );
			
			break;
		}
		
		case 'twitter':
		{
			url = decodeURIComponent( url );
			url = encodeURI( url );  
			
			this.dataManager = AR.DataManager.getInstance();
			
			this.dataManager.shortenUrl( url, function( data ){
				
				var windowWidth = "660";
				var windowHeight = "280";
			    var centerWidth = (window.screen.width - windowWidth) / 2;
	    		var centerHeight = (window.screen.height - windowHeight) / 2;
				
				window.open(
					'https://twitter.com/share?url=' + data.id, 
					null, 
					"resizable=yes,width=" + windowWidth + 
					",height=" + windowHeight +
					",left=" + centerWidth + 
					",top=" + centerHeight
				);
			} );
			
			break;
		}
		
		case 'mail':
		{
			options.mail = options.mail || {};
			
			var windowWidth = options.mail.windowWidth || "355";
			var windowHeight = options.mail.windowHeight || "320";
		    var centerWidth = (window.screen.width - windowWidth) / 2;
    		var centerHeight = (window.screen.height - windowHeight) / 2;
			
			var language = "";
			
			if (AR.Settings.language)
				language = "&LANGUAGE=" + AR.Settings.language;
			
			var emailUrl = 	'email.html?target=' + shareTarget + 
							language +
							'&url=' + url +
							'&name=' + options.mail.name + 
							'&address=' + options.mail.address +
							'&zip=' + options.mail.zip + 
							'&city=' + options.mail.city
			
			window.open(emailUrl, 
						null, 
						"resizable=0,width=" + windowWidth + 
						",height=" + windowHeight +
						",left=" + centerWidth + 
						",top=" + centerHeight
			);
			
			break;
		}
	}
};

AR.scrollTop = function( container, parent, elementToScrollTo, offset )
{
	jQuery(parent).scrollTop(0);
	
	jQuery(parent).animate(
		{ 
			scrollTop: jQuery(elementToScrollTo).offset().top - jQuery(container).offset().top - offset
		 }, 
		 { 
		 	duration: 300 
		 } );
};

AR.toggle = function ( selector, duration, callback )
{
	jQuery(selector).toggle( duration, callback );
};

AR.height = function ( selector, height )
{
	jQuery(selector).height( height );
};

AR.width = function ( selector, width )
{
	jQuery(selector).width( width );
};

AR.isString = function(input)
{
    return typeof(input)=='string';
};

AR.stringToBoolean = function(string){
	if (AR.isString(string))
	{
        switch(string.toLowerCase()){
                case "true": case "yes": case "1": return true;
                case "false": case "no": case "0": case null: return false;
                default: return Boolean(string);
        }
     }
     
     return string;
};

AR.NumberFormat = function( nStr, thousandSeparator, decimals, decimalSeparator )
{
	if( !decimals)
		nStr = Math.ceil(Number(nStr));
	else
		nStr = Number(nStr).toFixed( decimals );
	
	if (!thousandSeparator)
		thousandSeparator = " ";
		
	if (!decimalSeparator)
		decimalSeparator = "";
		
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? decimalSeparator + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + thousandSeparator + '$2');
	}
	
	return x1 + x2;
}

AR.openFancyBox = function( urls )
{
	//do not open fancy box if nothing to open
	if ( urls.length > 0 )
		$.fancybox.open(urls);
}

if (!Array.prototype.indexOf)
{
  Array.prototype.indexOf = function(elt /*, from*/)
  {
    var len = this.length >>> 0;

    var from = Number(arguments[1]) || 0;
    from = (from < 0)
         ? Math.ceil(from)
         : Math.floor(from);
    if (from < 0)
      from += len;

    for (; from < len; from++)
    {
      if (from in this &&
          this[from] === elt)
        return from;
    }
    return -1;
  };
}

