(function( AR )
{
	var MapView = AR.View.extend({
		
		events: {
			
		},
		
		init: function( cfg ) {
			
			// Call super
			this._parent( cfg );
		},
		
		register: function()
		{
		},
		
		render: function()
		{
			this.container.innerHTML = this.mustache( this.templates.main, {});
			
			return this;
		},
		
	});
	
	// Publish
	AR.MapView = MapView;
	
}(AR));