import $ from 'jquery';

$(window).on('load', function () {
	$('[href^="#"]').each((i, el) => {
		$(el).click(() => {
			if (el.getAttribute('href') !== '#') {
				$('html').animate({
					scrollTop: $(`${el.getAttribute('href')}`).offset().top - 20
				}, 500)
			}
		})
	})
})