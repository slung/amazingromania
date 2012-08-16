(function( AR )
{
	var MenuView = AR.View.extend({
		
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
	AR.MenuView = MenuView;
	
}(AR));