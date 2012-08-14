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