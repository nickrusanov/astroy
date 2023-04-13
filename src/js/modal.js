import $ from 'jquery';

$(window).on('load', function () {
	let bodyAlreadyPinned = false;

	const modalOpen = (link) => {
		$(link).addClass('modal--visible');

		$('body').hasClass('pinned')
			? bodyAlreadyPinned = true
			: $('body').addClass('pinned');

		$(window).on('keydown', modalKeyListner);
		$(window).on('click', modalClickListner);
	}

	const modalClose = () => {
		$('.modal').removeClass('modal--visible');

		bodyAlreadyPinned
			? bodyAlreadyPinned = false
			: $('body').removeClass('pinned');

	$(window).off('keydown', modalKeyListner);
	$(window).off('click', modalClickListner);

	history.pushState("", document.title, window.location.pathname);
}

	const modalKeyListner = (event) => {
	if (event.code === 'Escape') {
		modalClose();
	}
}

const modalClickListner = (event) => {
	if (event.target === document.querySelector('.modal')
		|| event.target === document.querySelector('.modal__close-icon')) {
		modalClose();
	}
}

$('[href^="#"]').each((i, el) => {
	$(el).click(() => {
		if (el.getAttribute('href') !== '#' && el.dataset.link === 'modal') {
			modalOpen(el.getAttribute('href'));
		}
	})
})

$('.modal').each((i, el) => {
	if ('#' + el.id === window.location.hash) {
		modalOpen('#' + el.id);
	}
})
})