var backend_url = 'https://shrouded-ridge-65941.herokuapp.com/';
var news, programs;

AOS.init({
	duration: 800,
	easing: 'slide'
});

get_apis = function () {
	get_news();
	get_programs();
}

news_append = function (news) {
	$('#news1 h4')[0].append(news[0].title);
	$('#news1 p')[0].append(news[0].description);
}

get_news = function () {
	var url = backend_url;
	$.get(url + 'news',
		function (data) {
			news = data.news;
			news_append(news);
		});
}

program_one_append = function (programs) {
	$('#program1 h2')[0].append(programs[0].name);
	$('#program1 p')[0].append(programs[0].description);
	$('#program1 .p_left_left').css('background-image', 'url(' + programs[0].description + ')');
}


get_programs = function () {
	var url = backend_url;
	$.get(url + 'programs',
		function (data) {
			programs = data.programs;
			program_one_append(programs);
		});
}

check_ath = function () {
	var token = localStorage.getItem('token');

	if (token != null) {
		$('.login_navbar').css('display', 'none');
		$('.logout_navbar').css('display', 'block');
	}

	else {
		$('.login_navbar').css('display', 'block');
		$('.logout_navbar').css('display', 'none');
	}
}

$('.logout_navbar').click(function (e) {
	e.preventDefault();
	var url = backend_url + 'logout';
	// $.post(url, function (result) {
	localStorage.removeItem('token');
	window.location.replace('home.html');
	// })
	// .done(function () {
	// 	console.log("second success");
	// })
	// .fail(function () {
	// 	console.log("error");
	// })
	// .always(function () {
	// 	console.log("finished");
	// });
})


$(document).ready(function ($) {

	get_apis();

	// $('.p_bottom_right').hover(function(){
	// 	$('.p_bottom_left').css('z-index','1');
	// },function(){
	// 	$('.p_bottom_left').css('z-index','0');
	// })

	check_ath();

	setTimeout(function () {
		$('#XMLID_20_').fadeIn();
		$('#logo_loading').addClass('logo_start');
	},
		2500)

	setTimeout(function () {
		$('#body').removeClass('no_scroll');
		$('#logo_loading').fadeOut();
	}, 5000);

	"use strict";


	// loader
	var loader = function () {
		setTimeout(function () {
			if ($('#ftco-loader').length > 0) {
				$('#ftco-loader').removeClass('show');
			}
		}, 1);
	};
	loader();

	// scroll
	var scrollWindow = function () {
		$(window).scroll(function () {
			var $w = $(this),
				st = $w.scrollTop(),
				navbar = $('.ftco_navbar'),
				sd = $('.js-scroll-wrap');

			if (st > 150) {
				if (!navbar.hasClass('scrolled')) {
					navbar.addClass('scrolled');
				}

				if (!navbar.hasClass('awake')) {
					navbar.addClass('awake');
				}

				if (sd.length > 0) {
					sd.addClass('sleep');
				}

			}
			if (st < 150) {
				if (navbar.hasClass('scrolled')) {
					navbar.removeClass('scrolled sleep');
				}

				if (navbar.hasClass('awake')) {
					navbar.removeClass('awake');
					navbar.addClass('sleep');
				}
				if (sd.length > 0) {
					sd.removeClass('sleep');
				}
			}

		});
	};
	scrollWindow();

	var isMobile = {
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
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};

	var mobileMenuOutsideClick = function () {

		$(document).click(function (e) {
			var container = $("#colorlib-offcanvas, .js-colorlib-nav-toggle");
			if (!container.is(e.target) && container.has(e.target).length === 0) {

				if ($('body').hasClass('offcanvas')) {

					$('body').removeClass('offcanvas');
					$('.js-colorlib-nav-toggle').removeClass('active');

				}


			}
		});

	};
	mobileMenuOutsideClick();


	var offcanvasMenu = function () {

		$('#page').prepend('<div id="colorlib-offcanvas" />');
		$('#page').prepend('<a href="#" class="js-colorlib-nav-toggle colorlib-nav-toggle colorlib-nav-white"><i></i></a>');
		var clone1 = $('.menu-1 > ul').clone();
		$('#colorlib-offcanvas').append(clone1);
		var clone2 = $('.menu-2 > ul').clone();
		$('#colorlib-offcanvas').append(clone2);

		$('#colorlib-offcanvas .has-dropdown').addClass('offcanvas-has-dropdown');
		$('#colorlib-offcanvas')
			.find('li')
			.removeClass('has-dropdown');

		// Hover dropdown menu on mobile
		$('.offcanvas-has-dropdown').mouseenter(function () {
			var $this = $(this);

			$this
				.addClass('active')
				.find('ul')
				.slideDown(500, 'easeOutExpo');
		}).mouseleave(function () {

			var $this = $(this);
			$this
				.removeClass('active')
				.find('ul')
				.slideUp(500, 'easeOutExpo');
		});


		$(window).resize(function () {

			if ($('body').hasClass('offcanvas')) {

				$('body').removeClass('offcanvas');
				$('.js-colorlib-nav-toggle').removeClass('active');

			}
		});
	};
	offcanvasMenu();


	var burgerMenu = function () {

		$('body').on('click', '.js-colorlib-nav-toggle', function (event) {
			var $this = $(this);


			if ($('body').hasClass('overflow offcanvas')) {
				$('body').removeClass('overflow offcanvas');
			} else {
				$('body').addClass('overflow offcanvas');
			}
			$this.toggleClass('active');
			event.preventDefault();

		});
	};
	burgerMenu();


	// navigation
	var OnePageNav = function () {
		$(".smoothscroll[href^='#'], #ftco-nav ul li a[href^='#']").on('click', function (e) {
			e.preventDefault();

			var hash = this.hash,
				navToggler = $('.navbar-toggler');
			$('html, body').animate({
				scrollTop: $(hash).offset().top
			}, 700, 'easeInOutExpo', function () {
				window.location.hash = hash;
			});


			if (navToggler.is(':visible')) {
				navToggler.click();
			}
		});
		$('body').on('activate.bs.scrollspy', function () {
			console.log('nice');
		})
	};
	OnePageNav();

});


// Function to reveal lightbox and adding YouTube autoplay
function revealVideo(div, video_id) {
	var video = document.getElementById(video_id).src;
	document.getElementById(video_id).src = video + '&autoplay=1'; // adding autoplay to the URL
	document.getElementById(div).style.display = 'block';
}

// Hiding the lightbox and removing YouTube autoplay
function hideVideo(div, video_id) {
	var video = document.getElementById(video_id).src;
	var cleaned = video.replace('&autoplay=1', ''); // removing autoplay form url
	document.getElementById(video_id).src = cleaned;
	document.getElementById(div).style.display = 'none';
}


var a = 0;
var b = 0;
$(window).scroll(function () {

	var oTop = $('#counter').offset().top - window.innerHeight;
	if (a == 0 && $(window).scrollTop() > oTop) {

		// animation
		$('.counter1').addClass('start_animation');
		$('.counter2').addClass('start_animation');
		$('.counter3').addClass('start_animation');
		$('.counter4').addClass('start_animation');

		// end animation

		a = 1;
		$('.count').each(function () {
			$(this).prop('Counter', 0).animate({
				Counter: $(this).text()
			}, {
					duration: 3500,
					easing: 'swing',
					step: function (now) {
						$(this).text(Math.ceil(now));
					}
				});
		});
	}

	var oTop2 = $('.news_section').offset().top - window.innerHeight;
	if (b == 0 && $(window).scrollTop() > oTop2) {

		// animation

		setTimeout(function () {
			$('.counter2_1').fadeIn();
			$('.counter2_2').fadeIn();
			$('.counter2_1').addClass('start_animation2');
			$('.counter2_2').addClass('start_animation2');
		}, 2000);
		// end animation
		b = 1;

	}

})
