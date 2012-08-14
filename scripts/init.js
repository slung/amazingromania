function init()
{
	//Load slide show
	$('#slides').slides({
		play: 3000,
		bigTarget: true,
		generatePagination: false,
		generateNextPrev: true,
		crossfade: true,
		// animationStart: function(current){
			// $('.caption').animate({
				// bottom: 0
			// },100);
		// },
		// animationComplete: function(current){
			// $('.caption').animate({
				// bottom: -20
			// },200);
		// },
		// slidesLoaded: function() {
			// $('.caption').animate({
				// bottom: 20
			// },200);
		// }
	});
};

function selectMenuItem( item )
{
	switch (item)
	{
		case 'home':
		{
			$(".menu").css("background-position", "0px 0");
			//document.location.href = "index.html"
			break;
		}
		case 'models':
		{
			$(".menu").css("background-position", "723px 0");
			//document.location.href = "models.html"
			break;
		}
		case 'gallery':
		{
			$(".menu").css("background-position", "482px 0");
			//document.location.href = "gallery.html"
			break;
		}
		case 'buy':
		{
			$(".menu").css("background-position", "241px 0");
			//document.location.href = "buy.html"
			break;
		}
	}
}
