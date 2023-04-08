import $ from 'jquery';

$(window).on('load', function () {
	// LABEL ACTIVE

	$('.input').each((i, el) => {
		$(el).on('click', () => {
			$('.label')[i].classList.add('label--active');
		})

		$(el).on('blur', () => {
			if (el.value.length === 0 || el.value.includes('_')) {
				$('.label')[i].classList.remove('label--active');
			}
		})
	})


	// RANGE SLIDER

	const rangeSliderMove = () => {
		const rangeVal = $('.calculator__range-input').val();
		const rangePos = (rangeVal - $('#calculator__range-min').html()) / ($('#calculator__range-max').html() - $('#calculator__range-min').html() + 8);

		$('.calculator__range-input').css('--slider-position', rangePos * 100 + '%');
		$('.calculator__range-label').html(rangeVal);
		$('.calculator__range-label').css('left', rangePos * $('.calculator__range').innerWidth() - $('.calculator__range-label').innerWidth() / 2 + 8);
	}

	rangeSliderMove();

	$('.calculator__range-input').on('mousemove', rangeSliderMove);
	$('.calculator__range-input').on('touchmove', rangeSliderMove);
	$('.calculator__range-input').on('change', rangeSliderMove);

	$(window).on('resize', rangeSliderMove);


	// CUSTOM RADIO INPUT

	let calcBoxCurrent;

	const calcBoxOpen = () => {
		$('.calculator__subbox-inner')[calcBoxCurrent].classList.add('calculator__subbox-inner--visible');
		$('.calculator__box-btn')[calcBoxCurrent].classList.add('calculator__box-btn--active');

		$('.calculator__subbox')[calcBoxCurrent].style.height = $('.calculator__subbox-inner')[calcBoxCurrent].scrollHeight + 15 + 'px';

		$('.calculator__label').each((j, el) => {
			if (el.innerHTML === $('.calculator__box-btn')[calcBoxCurrent].innerHTML) {
				setTimeout(() => document.getElementById(`${el.htmlFor}`).focus(), 100);
			}
		})

		$(window).on('mouseup', calcBoxMouseListner);

		$(window).on('keydown', calcBoxListner);
	}

	const calcBoxClose = () => {
		$('.calculator__subbox-inner')[calcBoxCurrent].classList.remove('calculator__subbox-inner--visible');
		$('.calculator__box-btn')[calcBoxCurrent].classList.remove('calculator__box-btn--active');
		$('.calculator__subbox')[calcBoxCurrent].style.height = 0;

		$('.calculator__label').removeClass('calculator__label--mouseless');

		$(window).off('mouseup', calcBoxMouseListner);

		$(window).off('keydown', calcBoxListner);

		setTimeout(() => $('.calculator__box-btn')[calcBoxCurrent].focus(), 100);
	}

	const calcBoxListner = (event) => {
		if (event.code === 'Escape') {
			calcBoxClose();
		}

		if (event.code === 'Space' || event.code === 'Enter') {
			btnBoxChangeByKey();
			calcBoxClose();
		}
	}

	const calcBoxMouseListner = (event) => {
		if (event.target !== $('.calculator__box-btn')[calcBoxCurrent]) {
			calcBoxClose();
		}
	}

	const btnBoxChangeByClick = () => {
		$('.calculator__subbox').each((i, el) => {
			if (el.contains(event.target)) {
				$('.calculator__box-btn')[i].innerHTML = event.target.innerHTML;
			}
		})
	}

	const btnBoxChangeByKey = () => {
		$('.calculator__subbox').each((i, subbox) => {
			$('.calculator__radio').each((j, radio) => {
				if (subbox.contains(radio) && $(radio).is(':checked')) {
					$('.calculator__box-btn')[i].innerHTML = $('.calculator__label')[j].innerHTML;
				}
			})
		})
	}

	$('.calculator__box-btn').each((i, el) => {
		$(el).on('click', () => {
			if ($('.calculator__subbox-inner')[i].classList.contains('calculator__subbox-inner--visible')) {
				calcBoxClose();
			} else {
				calcBoxCurrent = i;

				calcBoxOpen();

				if (event.pointerType !== 'mouse') {
					$('.calculator__label').addClass('calculator__label--mouseless');
				}
			}
		})
	})

	$('.calculator__label').click(btnBoxChangeByClick);

	btnBoxChangeByKey();


	// TARIFF SELECT

	$('.tariffs__btn').each((i, el) => {
		$(el).click(() => {
			$('.calculator__radio[name="tariff"]').prop('checked', false)
			$(`#tariff-${el.getAttribute('data-tariff')}`).prop('checked', true);

			priceShow();

			$('.calculator__radio').each((i, radio) => {
				if (radio.getAttribute('name') === 'tariff' && $(radio).is(':checked')) {
					$('.calculator__box-btn')[1].innerHTML = $('.calculator__label')[i].innerHTML;
				}
			})
		})
	})


	// CALCULATOR

	const priceCalc = () => {
		const squareMeter = $('.calculator__range-input').val();

		const priceSquareMeter = $('.calculator__range-input').data('price');

		let ratio = 1;

		$('.calculator__radio').each((i, el) => {
			if ($(el).is(':checked')) {
				ratio *= $(el).data('price');
			}
		})

		return ratio * squareMeter * priceSquareMeter;
	}

	const priceShow = () => {
		$('.calculator__price > span').html(priceCalc().toLocaleString('ru'));
	}

	$('.calculator__form').on('change', priceShow);
	$('.calculator__range-input').on('mousemove', priceShow);
	$('.calculator__range-input').on('touchmove', priceShow);

	priceShow();
})