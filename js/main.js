//@prepros-append burger_js.js
//@prepros-append script.js
//@prepros-append forms.js
//@prepros-append popup_script.js

/*
prepros-append ibg.js
prepros-append popup_script.js
prepros-append no_target_click.js
prepros-append jq-start.js
prepros-append forms.js
prepros-append script.js
prepros-append jq-end.js
prepros-append burger_jq.js
prepros-append burger_js.js
*/


"use strict"
//===== Определяет с какой ОС зашли на сайт =====================================================//
const isMobile = {
	Android: function () {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function () {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: function () {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera: function () {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function () {
		return navigator.userAgent.match(/IEMobile/i);
	},
	any: function () {
		return (
			isMobile.Android() ||
			isMobile.BlackBerry() ||
			isMobile.iOS() ||
			isMobile.Opera() ||
			isMobile.Windows());
	}
};
//===============================================================================================//

//===============================================================================================//
if (isMobile.any()) {
	document.body.classList.add('_touch'); //добавляет данный класс для body если определил сенсорный экран

	let menuArrows = document.querySelectorAll('.menu__arrow'); //собираем в переменную все объекты с классом .menu__arrow (стрелочки)
	if (menuArrows.length > 0) { //проверяем есть ли такие объекты
		for (let index = 0; index < menuArrows.length; index++) { //если есть, запускаем цикл, чтобы пройтись по всем
			const menuArrow = menuArrows[index]; //создаем константу с каждой стрелочкой
			menuArrow.addEventListener("click", function (e) { //навешиваем событие клик
				menuArrow.parentElement.classList.toggle('_active'); //добавляем класс родителю нажатой стрелочки при клике.
			});
		}
	}
} else {
	document.body.classList.add('_pc'); //добавляет класс для body если не определил сенсорный экран
}
//===============================================================================================//


//===== Открытие и закрытие меню бургера ========================================================//
const iconMenu = document.querySelector('.menu__icon'); //ищем класс и добавляем его в константу
const menuBody = document.querySelector('.menu__body'); //получаем еще один класс в константу
if (iconMenu) { //проверяем есть ли такой класс
	iconMenu.addEventListener("click", function (e) { //вешаем на иконку событие клик
		document.body.classList.toggle('_lock'); //ставим и убираем класс _lock на body каждый раз при клике (для запрета скролла сайта при открытом меню бургер)
		iconMenu.classList.toggle('_active');//ставим и убираем класс _active на иконку бургера каждый раз при клике (для навешивания анимаций при клике на иконку бургера)
		menuBody.classList.toggle('_active');//ставим и убираем класс _active на menu__body каждый раз при клике (для выезда меню при открытии бургера)
	});
}
//===============================================================================================//


//===== Плавная прокрутка к контенту из меню ====================================================//
const menuLinks = document.querySelectorAll('.menu__link[data-goto]'); //собираем массив объектов которые будут учавствовать в навигации. (объекты с атрибутом data-goto)
if (menuLinks.length > 0) {//проверяет есть ли такие объекты
	menuLinks.forEach(menuLink => { //если есть, запускает цикл, чтобы пройтись по всем
		menuLink.addEventListener("click", onMenuLinkClick); //вешаем событие клик и сразу задаем функцию
	});
	function onMenuLinkClick(e) {//создаем функцию
		const menuLink = e.target; //получаем объект на который мы кликаем
		if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) { //условие которое проверяет заполнен ли атрибут у объекта, и существует ли объект на который ссылаются
			const gotoBlock = document.querySelector(menuLink.dataset.goto); //получаем в константу сам объект, на который ссылаемся
			const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight; //высчитываем положение объекта,на который ссылаемся (с учетом высоты шапки)

			if (iconMenu.classList.contains('_active')) {//проверяем содержит ли иконка бургера класс _active (т.е. меню открыто)
				document.body.classList.remove('_lock'); // удаляет класс _lock у body
				iconMenu.classList.remove('_active');// удаляет класс _active у иконки бургера
				menuBody.classList.remove('_active');// удаляет класс _active у меню бургера
			}

			//далее скрипт который прокручивает страницу
			window.scrollTo({ //обращаемся к окну браузера и указываем функцию которая делает прокрутку.
				top: gotoBlockValue, //указывает откуда прокручивать и до какого объекта.
				behavior: "smooth" //делает прокрутку плавной
			});
			e.preventDefault(); //отключает работу ссылки, чтоб она не переходила по href.
		}
	}
}
//===============================================================================================//
const spoilerColumn = document.querySelectorAll('.body-footer__column_sp'); //ищем класс и добавляем его в константу
const spoilerItem = document.querySelectorAll('.body-footer__item_sp'); //получаем еще один класс в константу
const spoilerTitle = document.querySelectorAll('.item-body-footer__title_sp'); //получаем еще один класс в константу
const spoilerList = document.querySelectorAll('.item-body-footer__list_sp'); //получаем еще один класс в константу
function getWindowWidth() {
	return window.innerWidth || document.body.clientWidth;
}
if (document.documentElement.clientWidth <= 900) {
	for (var i = 0; i < spoilerColumn.length; i++) {
		spoilerColumn[i].classList.add('spollers-block');
	};
	for (var i = 0; i < spoilerItem.length; i++) {
		spoilerItem[i].classList.add('spollers-block__item');
	};
	for (var i = 0; i < spoilerTitle.length; i++) {
		spoilerTitle[i].classList.add('spollers-block__title');
	};
	for (var i = 0; i < spoilerList.length; i++) {
		spoilerList[i].classList.add('spollers-block__body');
	};
	//spoilerColumn.classList.add('spollers-block'); //ставим и убираем класс _lock на body каждый раз при клике (для запрета скролла сайта при открытом меню бургер)
	//spoilerItem.classList.add('spollers-block__item');//ставим и убираем класс _active на иконку бургера каждый раз при клике (для навешивания анимаций при клике на иконку бургера)
	//spoilerTitle.classList.add('spollers-block__title');
	//spoilerList.classList.add('spollers-block__body');
};

//=================
//SlideToggle
let _slideUp = (target, duration = 500) => {
	target.style.transitionProperty = 'height, margin, padding';
	target.style.transitionDuration = duration + 'ms';
	target.style.height = target.offsetHeight + 'px';
	target.offsetHeight;
	target.style.overflow = 'hidden';
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	window.setTimeout(() => {
		target.style.display = 'none';
		target.style.removeProperty('height');
		target.style.removeProperty('padding-top');
		target.style.removeProperty('padding-bottom');
		target.style.removeProperty('margin-top');
		target.style.removeProperty('margin-bottom');
		target.style.removeProperty('overflow');
		target.style.removeProperty('transition-duration');
		target.style.removeProperty('transition-property');
		target.classList.remove('_slide');
	}, duration);
}
let _slideDown = (target, duration = 500) => {
	target.style.removeProperty('display');
	let display = window.getComputedStyle(target).display;
	if (display === 'none')
		display = 'block';

	target.style.display = display;
	let height = target.offsetHeight;
	target.style.overflow = 'hidden';
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	target.offsetHeight;
	target.style.transitionProperty = "height, margin, padding";
	target.style.transitionDuration = duration + 'ms';
	target.style.height = height + 'px';
	target.style.removeProperty('padding-top');
	target.style.removeProperty('padding-bottom');
	target.style.removeProperty('margin-top');
	target.style.removeProperty('margin-bottom');
	window.setTimeout(() => {
		target.style.removeProperty('height');
		target.style.removeProperty('overflow');
		target.style.removeProperty('transition-duration');
		target.style.removeProperty('transition-property');
		target.classList.remove('_slide');
	}, duration);
}
let _slideToggle = (target, duration = 500) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		if (window.getComputedStyle(target).display === 'none') {
			return _slideDown(target, duration);
		} else {
			return _slideUp(target, duration);
		}
	}
}
//========================================
//Spollers
let spollers = document.querySelectorAll("._spoller");
let spollersGo = true;
if (spollers.length > 0) {
	for (let index = 0; index < spollers.length; index++) {
		const spoller = spollers[index];
		spoller.addEventListener("click", function (e) {
			if (spollersGo) {
				spollersGo = false;
				if (spoller.classList.contains('_spoller-992') && window.innerWidth > 992) {
					return false;
				}
				if (spoller.classList.contains('_spoller-768') && window.innerWidth > 768) {
					return false;
				}
				if (spoller.closest('._spollers').classList.contains('_one')) {
					let curent_spollers = spoller.closest('._spollers').querySelectorAll('._spoller');
					for (let i = 0; i < curent_spollers.length; i++) {
						let el = curent_spollers[i];
						if (el != spoller) {
							el.classList.remove('_active');
							_slideUp(el.nextElementSibling);
						}
					}
				}
				spoller.classList.toggle('_active');
				_slideToggle(spoller.nextElementSibling);

				setTimeout(function () {
					spollersGo = true;
				}, 500);
			}
		});
	}
}
//=================
//===== Свой скрипт =====================================================================================
let playButton = document.querySelector('.play');
let coverImage = document.querySelector('.cover');
let videoItem = document.querySelector('iframe');

if (playButton) {
	playButton.addEventListener("click", function (e) {
		playButton.classList.add('_hide');
		coverImage.classList.add('_hide');
	});
};
//=======================================================================================================

//===== Поля ввода  + textarea ====================================================================
$('input,textarea').focus(function () {
	if ($(this).val() == $(this).attr('data-value')) {
		$(this).addClass('focus');
		$(this).parent().addClass('focus');
		if ($(this).attr('data-type') == 'pass') {
			$(this).attr('type', 'password');
		};
		$(this).val('');
	};
	removeError($(this));
});
$('input[data-value], textarea[data-value]').each(function () {
	if (this.value == '' || this.value == $(this).attr('data-value')) {
		if ($(this).hasClass('l') && $(this).parent().find('.form__label').length == 0) {
			$(this).parent().append('<div class="form__label">' + $(this).attr('data-value') + '</div>');
		} else {
			this.value = $(this).attr('data-value');
		}
	}
	if (this.value != $(this).attr('data-value') && this.value != '') {
		$(this).addClass('focus');
		$(this).parent().addClass('focus');
		if ($(this).hasClass('l') && $(this).parent().find('.form__label').length == 0) {
			$(this).parent().append('<div class="form__label">' + $(this).attr('data-value') + '</div>');
		}
	}

	$(this).click(function () {
		if (this.value == $(this).attr('data-value')) {
			if ($(this).attr('data-type') == 'pass') {
				$(this).attr('type', 'password');
			};
			this.value = '';
		};
	});
	$(this).blur(function () {
		if (this.value == '') {
			if (!$(this).hasClass('l')) {
				this.value = $(this).attr('data-value');
			}
			$(this).removeClass('focus');
			$(this).parent().removeClass('focus');
			if ($(this).attr('data-type') == 'pass') {
				$(this).attr('type', 'text');
			};
		};
		if ($(this).hasClass('vn')) {
			formValidate($(this));
		}
	});
});
$('.form-input__viewpass').click(function (event) {
	if ($(this).hasClass('active')) {
		$(this).parent().find('input').attr('type', 'password');
	} else {
		$(this).parent().find('input').attr('type', 'text');
	}
	$(this).toggleClass('active');
});

//$('textarea').autogrow({vertical: true, horizontal: false});
//===============================================================================================

//====== Очистка формы =============================================================================
function clearForm(form) {
	$.each(form.find('.input'), function (index, val) {
		$(this).removeClass('focus').val($(this).data('value'));
		$(this).parent().removeClass('focus');
		if ($(this).hasClass('phone')) {
			maskclear($(this));
		}
	});
}
//==================================================================================================

//====== Всплывающее окно ============================================================================
$('.pl').click(function (event) {
	var pl = $(this).attr('href').replace('#', '');
	var v = $(this).data('vid');
	popupOpen(pl, v);
	return false;
});
function popupOpen(pl, v) {
	$('.popup').removeClass('active').hide();
	if (!$('.menu__body').hasClass('active')) {
		//$('body').data('scroll',$(window).scrollTop());
	}
	if (!isMobile.any()) {
		$('body').css({ paddingRight: $(window).outerWidth() - $('.wrapper').outerWidth() }).addClass('lock');
		$('.pdb').css({ paddingRight: $(window).outerWidth() - $('.wrapper').outerWidth() });
	} else {
		setTimeout(function () {
			$('body').addClass('lock');
		}, 300);
	}
	history.pushState('', '', '#' + pl);
	if (v != '' && v != null) {
		$('.popup-' + pl + ' .popup-video__value').html('<iframe src="https://www.youtube.com/embed/' + v + '?autoplay=1"  allow="autoplay; encrypted-media" allowfullscreen></iframe>');
	}
	$('.popup-' + pl).fadeIn(300).delay(300).addClass('active');

	if ($('.popup-' + pl).find('.slick-slider').length > 0) {
		$('.popup-' + pl).find('.slick-slider').slick('setPosition');
	}
}
function openPopupById(popup_id) {
	$('#' + popup_id).fadeIn(300).delay(300).addClass('active');
}
function popupClose() {
	$('.popup').removeClass('active').fadeOut(300);
	if (!$('.menu__body').hasClass('active')) {
		if (!isMobile.any()) {
			setTimeout(function () {
				$('body').css({ paddingRight: 0 });
				$('.pdb').css({ paddingRight: 0 });
			}, 200);
			setTimeout(function () {
				$('body').removeClass('lock');
				//$('body,html').scrollTop(parseInt($('body').data('scroll')));
			}, 200);
		} else {
			$('body').removeClass('lock');
			//$('body,html').scrollTop(parseInt($('body').data('scroll')));
		}
	}
	$('.popup-video__value').html('');

	history.pushState('', '', window.location.href.split('#')[0]);
}
$('.popup-close,.popup__close').click(function (event) {
	popupClose();
	return false;
});
$('.popup').click(function (e) {
	if (!$(e.target).is(".popup>.popup-table>.cell *") || $(e.target).is(".popup-close") || $(e.target).is(".popup__close")) {
		popupClose();
		return false;
	}
});
$(document).on('keydown', function (e) {
	if (e.which == 27) {
		popupClose();
	}
});
//=======================================================================================================

//===== Всплывающие подсказки ==========================================================================
if ($('.t,.tip').length > 0) {
	tip();
}
function tip() {
	$('.t,.tip').webuiPopover({
		placement: 'top',
		trigger: 'hover',
		backdrop: false,
		//selector:true,
		animation: 'fade',
		dismissible: true,
		padding: false,
		//hideEmpty: true
		onShow: function ($element) { },
		onHide: function ($element) { },
	}).on('show.webui.popover hide.webui.popover', function (e) {
		$(this).toggleClass('active');
	});
}
//=======================================================================================================
