(function( AR )
{
	var MenuView = AR.View.extend({
		
		events: {
			".menu-item":{
				click: "menuItemClick"
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
		
		menuItemClick: function( evt )
		{
			var menuItem = evt.currentTarget.id;
		}
		
	});
	
	// Publish
	AR.MenuView = MenuView;
	
}(AR));