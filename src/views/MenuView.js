(function( AR )
{
	var MenuView = AR.View.extend({
		
		events: {
			".menu-item":{
				click: "onMenuItemClick"
			}
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
		
		/*
		 * Events
		 */
		
		onMenuItemClick: function( evt )
		{
			var menuItem = evt.currentTarget.id;
		}
		
	});
	
	// Publish
	AR.MenuView = MenuView;
	
}(AR));