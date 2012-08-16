(function( AR )
{
	var EventManager = new Class({
		
		$events: null,
		
		init: function()
		{
			this.$events = {};
		},
		
		/**
		 * Add listeners to the map.
		 * 
		 * @param eventName
		 * @param fn
		 * 
		 */
		on: function( eventName, fn )
		{
			this.$events[eventName] = this.$events[eventName] || [];
			
			// @TODO: search function befor push
			this.$events[eventName].push( fn );
		},
		
		/**
		 * Fire an event
		 * 
		 * @param {String} eventName
		 * @param {Object} params
		 */
		fire: function( eventName, params )
		{
			var functions = this.$events[eventName];
			
			if( functions )
			{
				for(var key in functions)
				{
					var fn = functions[key];
					fn.apply( this, [params]);
				}	
			}
		},
		
		detach: function( eventName, fn )
		{
			var events = this.$events[eventName];
			
			for( var i=0; i< events.length; i++ )
			{
				if( events[i] == fn )
				{
					delete events[i];
					return;
				}
			}
			
			return;  
		}
	});	

	
	// Publish
	AR.EventManager = EventManager;
	
}(AR));

(function( AR )
{
	var MsgManager = AR.EventManager.extend({
		
		init: function()
		{
			this._parent();
		},
		
		onMessage: function( msgName, fn )
		{
			AR.dispatcher.on( msgName, AR.bind( fn, this ) );
		},
		
		sendMessage: function( msgName, data )
		{
			AR.dispatcher.fire( msgName, data );
		}
		
	});	

	
	// Publish
	AR.MsgManager = MsgManager;
	
	// Make one instance
	AR.dispatcher = new MsgManager();
	
}(AR));

(function( AR )
{
	// Singleton instance
	var dataManager = null;
	var MASK_ELEMENT = ".page";
	
	var DataManager = AR.EventManager.extend({
		
		tableName: '',
		filters: [],
		rowCount: 20,
		cluster: null,
		showLoading: false,
		
		// stores loaded tables
		tables: [],
		
		init: function( cfg ) 
		{
			if( dataManager )
				throw new Error('You can only create one instance of DataManager!');
			
			this._parent();
		}
		
	});
	
	DataManager.getInstance = function()
	{
		if( dataManager )
			return dataManager;
		
		dataManager = new DataManager();
		return dataManager;
	};
	
	// Publish
	AR.DataManager = DataManager;
	
}(AR));

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

(function( AR )
{
	var GalleryView = AR.View.extend({
		
		base: "images/albums/default/", //base directory for pictures
		count: 8, //number of pictures to display in gallery
		
		events: {
			"#gallery-container":{
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

(function( AR )
{
	var AmazingRomaniaApp = AR.MsgManager.extend({
		
		views: [],
		state: null,
		lastState: null,
		
		init: function( cfg )
		{
			this._parent();
			
			// Store state & add views
			this.state = cfg.state;
			this.language = cfg.language;
			this.addViews( cfg.views || [] );
			this.appReady = cfg.appReady;
			
			// Register message
			this.register();
			
			AR.DataManager.getInstance().app = this;
		},
		
		addView: function( view )
		{
			//IE8 Fix, Array length is incorrect because of trailing comma
			if (!view)
				return;
			
			view.app = this;
			
			if( this.views.indexOf(view) == -1 )
				this.views.push( view );
		},
		
		addViews: function( views )
		{
			for( var i=0; i< views.length; i++ )
				this.addView( views[i] );
		},
		
		removeView: function( view )
		{
		},
		
		register: function()
		{
			this.onMessage( 'changeState', this.onChangeState );
			this.onMessage( 'reverseState', this.onReverseState );
		},
		
		start: function()
		{
			if( this.language )
			{
				AR.LanguageManager.getInstance().loadLanguage(this.language, AR.bind( function() {
					this._start();
				}, this));
			}
			else
			{
				this._start();	
			}
			
		},
		
		_start: function()
		{
			// Render all views
			for( var i=0; i<this.views.length; i++ )
				this.views[i].render();
			
			// Set default state
			this.changeState( this.state || 'home' );
			
			// dispatch
			if( this.appReady )
				this.appReady.call(this, []);
		},
		
		changeState: function( state )
		{
			//if same state => no good
			if (state == this.state && this.lastState != null)
				return;
				
			this.lastState = this.state;
			this.state = state;
			
			// Render all views
			for( var i=0; i<this.views.length; i++ )
			{
				var view = this.views[i];
				
				if( view.hideOnStates.indexOf( this.state ) != -1 )
					this.hideView( view );
				else
					this.showView( view );
			}
			
			this.sendMessage('stateChanged', {currentState: this.state, lastState: this.lastState});
		},
		
		hideView: function( view )
		{
			AR.addClass( view.container, 'hide-view');
			this.sendMessage('hideView', view.container);
		},
		
		showView: function( view )
		{
			AR.removeClass( view.container, 'hide-view');
			this.sendMessage('showView', view.container);
		},
		
		onChangeState: function( msg )
		{
			this.changeState( msg.state );
		},
		
		onReverseState: function( msg )
		{
			this.changeState( this.lastState );
		}
		
	});	

	
	// Publish
	AR.App = AmazingRomaniaApp;
	
	AR.App.States = {};
	AR.App.States.GALLERY = 'gallery';
	AR.App.States.MAP = 'map';
	
}(AR));

