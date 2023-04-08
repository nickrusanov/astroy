import $ from 'jquery';

$(window).on('load', function () {
	$('.footer__btn').each((i, el) => {
		$(el).on('click', () => {
			if (!$('.footer__list')[i].classList.contains('footer__list--active')) {
				$('.footer__list').removeClass('footer__list--active');
				$('.footer__btn').removeClass('footer__btn--active');
			}

			$('.footer__list')[i].classList.toggle('footer__list--active');
			$('.footer__btn')[i].classList.toggle('footer__btn--active');
		})
	})
})