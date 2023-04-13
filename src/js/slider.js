import $ from 'jquery';
import 'slick-carousel';

$(window).on('load', function () {
	// SETTINGS

	$('.feedback__slider').slick({
		dots: true,
		arrows: false,
		infinite: true,
		autoplay: true,
		autoplaySpeed: 6000,
		speed: 600,
		slidesToShow: 1,
		slidesToScroll: 1,
	})

	$('.brands__slider').slick({
		dots: false,
		arrows: true,
		infinite: true,
		autoplay: true,
		autoplaySpeed: 3500,
		speed: 800,
		slidesToShow: 5,
		slidesToScroll: 1,
		prevArrow: '<button type="button" class="brands__btn-prev" aria-label="Предыдущий слайд"><svg width="32" height="74" viewBox="0 0 32 74" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M30 1L2 39L30 73" stroke-width="3"/></svg></button>',
		nextArrow: '<button type="button" class="brands__btn-next" aria-label="Следующий слайд"><svg width="32" height="74" viewBox="0 0 32 74" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M30 1L2 39L30 73" stroke-width="3"/></svg></button>',
		responsive: [
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 3,
				}
			},
			{
				breakpoint: 600,
				settings: {
					arrows: false,
					slidesToShow: 3,
				}
			},
		]
	})

	// PLAY BY OBSERVER

	const slickPlayStart = (entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				$(entry.target).slick('slickPlay');
			}
		})
	}

	const slickObserver = new IntersectionObserver(slickPlayStart, { threshold: 0.35 });

	$('.slick-slider').each((i, el) => {
		$(el).slick('slickPause');
		slickObserver.observe(el);
	})
})