import $ from 'jquery';

$(window).on('load', function () {
	$('[href^="#"]').each((i, el) => {
		$(el).click(() => {
			if (el.getAttribute('href') !== '#' && el.dataset.link !== 'modal') {
				$('html').animate({
					scrollTop: $(`${el.getAttribute('href')}`).offset().top - 20
				}, 500)
			}
		})
	})

	$(window).scroll(() => {
		window.scrollY > window.innerHeight / 2
			? $('.mainbox__top').addClass('mainbox__top--visible')
			: $('.mainbox__top').removeClass('mainbox__top--visible');
	})
})