(function( AR )
{
	var GalleryView = AR.View.extend({
		
		base: "images/albums/default/", //base directory for pictures
		count: 8, //number of pictures to display in gallery
		prefix: "",
		extension: "jpg",
		startIndex: 0,
		
		events: {
			"#gallery-container":{
				mouseenter: "onSlideMouseEnter",
				mouseleave: "onSlideMouseLeave"
			},
		},
		
		init: function( cfg ) {
			
			this.base = cfg.base || this.base;
			this.count = cfg.count || this.count;
			this.prefix = cfg.prefix || this.prefix;
			this.extension = cfg.extension || this.extension;
			this.startIndex = cfg.startIndex || this.startIndex;
			
			// Call super
			this._parent( cfg );
		},
		
		register: function()
		{
		},
		
		render: function()
		{
			var pictures = this.generatePicturesUrl();
			
			this.container.innerHTML = this.mustache( this.templates.main, {
				pictures: pictures
			});
			
			this.configure();
			
			return this;
		},
		
		configure: function()
		{
			// var container = [this.container];
// 			
			// container.slides({
				// generatePagination: false,
				// randomize: true,
				// hoverPause: true,
				// effect: 'slide, fade',
				// animationStart: function(current){
					// $('.caption').animate({
						// bottom: -50
					// },100);
				// },
				// animationComplete: function(current){
					// $('.caption').animate({
						// bottom:0
					// },200);
				// },
				// slidesLoaded: function() {
					// $('.caption').animate({
						// bottom:0
					// },200);
				// }
			// });
		},
		
		generatePicturesUrl: function()
		{
			var pictures = [];
			
			for (var i = this.startIndex; i < this.count; i++) {
			  pictures.push({
			  	url: this.base + this.prefix + i + "." + this.extension
			  })
			};
			
			return pictures;
		},
		
		/*
		 * Events
		 */
		
		onSlideMouseEnter: function( evt )
		{
			var arrows = AR.all(".arrow");
			
			if (!arrows)
				return;
			
			for (var i=0; i< arrows.length; i++)
				AR.fadeToggle(arrows[i], "fast", "linear");
		},
		
		onSlideMouseLeave: function( evt )
		{
			var arrows = AR.all(".arrow");
			
			if (!arrows)
				return;
			
			for (var i=0; i< arrows.length; i++)
				AR.fadeToggle(arrows[i], "fast", "linear");
		},
		
	});
	

	
	// Publish
	AR.GalleryView = GalleryView;
	
}(AR));