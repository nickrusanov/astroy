import $ from 'jquery';

$(window).on('load', function () {
	$('.hidden');

	const elementAppear = (entries) => {
		let order = 1;
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				setTimeout(() => {
					entry.target.classList.remove('hidden');
				}, (entry.target.dataset.order ? Number(entry.target.dataset.order) : order++) * 200)
			}
		})
	}

	const appearObserver = new IntersectionObserver(elementAppear, { threshold: 0.35 });

	$('.hidden').each((i, el) => {
		appearObserver.observe(el);
	})
})