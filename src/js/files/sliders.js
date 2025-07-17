/*
Документация по работе в шаблоне: 
Документация слайдера: https://swiperjs.com/
Сниппет(HTML): swiper
*/

// Подключаем слайдер Swiper из node_modules
// При необходимости подключаем дополнительные модули слайдера, указывая их в {} через запятую
// Пример: { Navigation, Autoplay }
import Swiper, { Navigation, Pagination } from 'swiper';
/*
Основные модули слайдера:
Navigation, Pagination, Autoplay, 
EffectFade, Lazy, Manipulation
Подробнее смотри https://swiperjs.com/
*/

// Стили Swiper
// Базовые стили
import "../../scss/base/swiper.scss";
// Полный набор стилей из scss/libs/swiper.scss
// import "../../scss/libs/swiper.scss";
// Полный набор стилей из node_modules
// import 'swiper/css';

// Список слайдеров
if (document.querySelector('.left-home__slider')) {
	new Swiper('.left-home__slider', {
		modules: [Navigation, Pagination],
		observer: true,
		observeParents: true,
		slidesPerView: 1,
		spaceBetween: 20,
		speed: 800,

		// Пагинация с кастомным выводом
		pagination: {
			el: ".left-home__pagination",
			type: "fraction",
			renderFraction: function (currentClass, totalClass) {
				return '<span class="' + currentClass + '"></span>' +
					' / ' +
					'<span class="' + totalClass + '"></span>';
			}
		},

		// Кнопки навигации
		navigation: {
			prevEl: '.left-home__arrow-prev',
			nextEl: '.left-home__arrow-next',
		},

		on: {
			init: function () {
				// При инициализации обновляем классы
				updateFractionWithLeadingZeros(this);
			},
			slideChange: function () {
				// При смене слайда обновляем
				updateFractionWithLeadingZeros(this);
			}
		}
	});
}

// Функция для добавления ведущих нулей
function updateFractionWithLeadingZeros(slider) {
	const current = slider.realIndex + 1; // Индекс текущего слайда (начиная с 1)
	const total = slider.slides.length;

	const currentEl = slider.pagination.el.querySelector('.' + slider.params.pagination.currentClass);
	const totalEl = slider.pagination.el.querySelector('.' + slider.params.pagination.totalClass);

	if (currentEl && totalEl) {
		currentEl.textContent = current < 10 ? '0' + current : current;
		totalEl.textContent = total < 10 ? '0' + total : total;
	}
}

document.querySelectorAll('.block-slider__slider').forEach(container => {
	// Переменная для хранения экземпляра Swiper
	let smmSeoSlider = null;
	const mediaQuerySize = 991.98;

	function smmSeoSliderInit() {
		// Инициализируем слайдер только если еще не был создан
		if (!smmSeoSlider) {
			smmSeoSlider = new Swiper(container, {
				modules: [Navigation],
				observer: true,
				observeParents: true,
				spaceBetween: 10,
				speed: 800,
				preloadImages: true,

				navigation: {
					prevEl: '.block-slider__arrow-prev',
					nextEl: '.block-slider__arrow-next',
				},

				breakpoints: {
					0: {
						slidesPerView: 1,
					},
					767.98: {
						slidesPerView: 2,
					},
					991.98: {
						slidesPerView: 3,
					},
				},
			});
		}
	}

	function smmSeoSliderDestroy() {
		if (smmSeoSlider) {
			smmSeoSlider.destroy();
			smmSeoSlider = null;
		}
	}

	function handleResize() {
		const windowWidth = window.innerWidth;

		if (windowWidth <= mediaQuerySize) {
			smmSeoSliderInit();
		} else {
			smmSeoSliderDestroy();
		}
	}

	// Слушаем resize
	window.addEventListener('resize', handleResize);

	// Инициализация при загрузке страницы
	window.addEventListener('load', handleResize);
});

if (document.querySelector('.cases__slider')) {
	new Swiper('.cases__slider', {
		modules: [Navigation, Pagination],
		observer: true,
		observeParents: true,
		slidesPerView: 3,
		spaceBetween: 50,
		autoHeight: true,
		speed: 800,

		// Пагинация с кастомным выводом
		pagination: {
			el: ".cases__pagination",
		},

		// Кнопки навигации
		navigation: {
			prevEl: '.cases__arrow-prev',
			nextEl: '.cases__arrow-next',
		},

		breakpoints: {
			0: {
				slidesPerView: 1, 
				autoHeight: false,
			},
			767.98: {
				slidesPerView: 2,
				spaceBetween: 25,
			},
			1200: {
				slidesPerView: 3,
			},
		},
	});
}

