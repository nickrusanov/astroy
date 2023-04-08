import $ from 'jquery';

$(window).on('load', function () {
	$('.faq__item-btn').each((i, el) => {
		$(el).on('click', () => {
			$('.faq__item')[i].classList.contains('faq__item--active')
				? $('.faq__item-text')[i].style.maxHeight = 0
				: $('.faq__item-text')[i].style.maxHeight = $('.faq__item-text')[i].scrollHeight + 'px';

			$('.faq__item')[i].classList.toggle('faq__item--active');
			$('.faq__item-icon')[i].classList.toggle('faq__item-icon--active');
		})
	})
})