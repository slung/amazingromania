(function( AR )
{
	var View = AR.MsgManager.extend({
		
		app: null,
		mustache: null,
		templates: null,

		init: function( cfg ) {
			
			this.mustache  = AR.mustache;
			
			this.templates = cfg.templates;
			this.container = cfg.container;
			this.hideOnStates = cfg.hideOnStates || [];
			this.formatRenderData = cfg.formatRenderData;
			this.dataManager = AR.DataManager.getInstance();
			
			this.events = AR.extend( this.events || {}, cfg.events || {} );
			
			this.parseEvents();
			this.register();
		},
		
		register: function()
		{
		},
		
		render: function()
		{
		},
		
		parseEvents: function()
		{
			var events = this.events || {};
			
			for( var selector in events ) 
				for( var eventType in events[selector] )
				{
					var fn = this[events[selector][eventType]] || events[selector][eventType];
					AR.delegate( this.container, selector, eventType, AR.bind( fn, this));
				}
		},
		
		getDictionary: function()
		{
			return AR.LanguageManager.getInstance().dictionary;
		}
	});
	
	// Publish
	AR.View = View;
	
}(AR));