(function( AR )
{
	var GalleryView = AR.View.extend({
		
		base: "images/albums/default/", //base directory for pictures
		count: 8, //number of pictures to display in gallery
		
		events: {
			".slide":{
				mouseenter: "onSlideMouseEnter",
				mouseleave: "onSlideMouseLeave"
			},
		},
		
		init: function( cfg ) {
			
			this.base = cfg.base || this.base;
			this.count = cfg.count || this.count;
			
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
			
			for (var i=0; i < this.count; i++) {
			  pictures.push({
			  	url: this.base + i + ".jpg"
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
			
			for (var i=0; i< arrows.length; i++)
				AR.fadeToggle(arrows[i], "fast", "linear");
		},
		
		onSlideMouseLeave: function( evt )
		{
			var arrows = AR.all(".arrow");
			
			for (var i=0; i< arrows.length; i++)
				AR.fadeToggle(arrows[i], "fast", "linear");
		},
		
	});
	

	
	// Publish
	AR.GalleryView = GalleryView;
	
}(AR));