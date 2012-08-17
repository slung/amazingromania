(function( AR )
{
	var MapView = AR.View.extend({
		
		map: null,
		
		events: {
			
		},
		
		init: function( cfg ) {
			
			// Call super
			this._parent( cfg );
		},
		
		register: function()
		{
			this.onMessage("showView", this.onShowView);
		},
		
		render: function()
		{
			var mapOptions = 
			{
				zoom: 7,
				center: new google.maps.LatLng(48.5, 20),
				mapTypeId: google.maps.MapTypeId.HYBRID,
				mapTypeControl: true,
			    mapTypeControlOptions: {
			        style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
			        position: google.maps.ControlPosition.TOP_RIGHT
			    },
			    panControl: true,
			    zoomControl: true,
			    zoomControlOptions: {
			        style: google.maps.ZoomControlStyle.LARGE
			    },
			}
			
			this.map = new google.maps.Map( this.container, mapOptions );
			
			return this;
		},
		
		/*
		 * Draws a region on Google Map
		 * The region param represents an array og LatLng objects defining the polygon
		 */
		drawRegion: function( region )
		{
			var regionCenter = new google.maps.LatLng(46.16, 24.13);
			var regionRadius = 150000;
			
			this.transylvaniaRegion = new google.maps.Circle({
				center: regionCenter,
				radius: regionRadius,
				strokeColor: "#81B23C",
			    strokeOpacity: 0.8,
			    strokeWeight: 2,
			    fillColor: "#81B23C",
			    fillOpacity: 0.2	
			});
			
			this.transylvaniaRegion.setMap(this.map);
			
			google.maps.event.addListener(this.transylvaniaRegion, 'mouseover', AR.bind(function(){
				this.transylvaniaRegion.strokeWeight = 5;
				this.transylvaniaRegion.setMap(this.map);
			}, this));
			
			google.maps.event.addListener(this.transylvaniaRegion, 'mouseout', AR.bind(function(){
				this.transylvaniaRegion.strokeWeight = 2;
				this.transylvaniaRegion.setMap(this.map);
			}, this));
			
		},
		
		/*
		 * Messages
		 */
		
		onShowView: function( msg )
		{
			if ( msg.id != this.container.id)
				return;
				
			google.maps.event.trigger(this.map, "resize");
			
			this.drawRegion();
		}
		
	});
	
	// Publish
	AR.MapView = MapView;
	
}(AR));