import $ from 'jquery';

$(window).on('load', function () {
	// MENU WRAP

	const menuWrap = () => {
		if (window.innerWidth <= 900) {
			if (!$('.header__contacts').parent()[0].classList.contains('header__menu-inner')) {
				$('.header__social').wrap('<div class="header__menu-inner"></div>');
				$('.header__menu-inner').wrap('<div class="header__menu"></div>');
				$('.header__contacts').appendTo($('.header__menu-inner')[0]);
			}
		} else if ($('.header__contacts').parent()[0].classList.contains('header__menu-inner')) {
			$('.header__menu-inner').unwrap();
			$('.header__contacts').unwrap();
		}
	}

	$(window).resize(menuWrap);

	menuWrap();


	// HAMBURGER

	$('.header__hamburger').click(() => {
		$('.header__menu').toggleClass('header__menu--active');
		$('.header__hamburger').toggleClass('header__hamburger--active');
		$('body').toggleClass('pinned');
	})
})