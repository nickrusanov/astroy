import $ from 'jquery';

$(window).on('load', function () {
	const parallaxShift = () => {
		$('.parallax').each((i, el) => {
			if ($(el).offset().top < window.pageYOffset + window.innerHeight
				&& $(el).offset().top + $(el).height() > window.pageYOffset) {
				$(el).css('transform', `translateY(${Math.round((1 - ($(el).offset().top + $(el).height() - window.pageYOffset) / (window.innerHeight + $(el).height())) * el.dataset.parallax)}px)`)
			}
		})
	}

	$(window).on('scroll', parallaxShift);

	$('.parallax').each((i, el) => {
		$(el).css('transform', `translateY(${Math.round((1 - ($(el).offset().top + $(el).height() - window.pageYOffset) / (window.innerHeight + $(el).height())) * 250)}px)`)
	})
})