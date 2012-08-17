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
			
			switch ( menuItem )
			{
				case "home":
				{
					this.sendMessage("changeState", {
						state: AR.App.States.GALLERY
					});
					
					break;
				}
				
				case "map":
				{
					this.sendMessage("changeState", {
						state: AR.App.States.MAP
					});
					
					break;
				}
				
				case "places":
				{
					this.sendMessage("changeState", {
						state: AR.App.States.PLACES
					});
					
					break;
				}
				
				case "tours":
				{
					this.sendMessage("changeState", {
						state: AR.App.States.TOURS
					});
					
					break;
				}
				
				case "contact":
				{
					this.sendMessage("changeState", {
						state: AR.App.States.CONTACT
					});
					
					break;
				}
			}
		}
		
	});
	
	// Publish
	AR.MenuView = MenuView;
	
}(AR));