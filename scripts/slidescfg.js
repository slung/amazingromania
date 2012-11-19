function loadBanner()
{
	$('#slides').slides({
		play: 1500,
		generatePagination: false,
		effect: 'fade',
		fadeSpeed: 0
	});
}

function loadGallery()
{
	$('#slides').slides({
		play: 3000,
		generatePagination: false,
		randomize: true,
		//hoverPause: true,
		effect: 'fade',
		generatePagination: true,
		paginationClass: 'pagination',
		currentClass: 'current',
		bigTarget: true,
		animationStart: function(current){
			$('.caption').animate({
				bottom: -50
			},100);
		},
		animationComplete: function(current){
			$('.caption').animate({
				bottom:0
			},200);
		},
		slidesLoaded: function() {
			$('.caption').animate({
				bottom:0
			},200);
		}
	});
}