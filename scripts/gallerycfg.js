$("#slides").slides({
	generatePagination: false,
	randomize: true,
	hoverPause: true,
	effect: 'slide, fade',
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