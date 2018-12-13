var backend_url = 'https://ytg.eco/';
var news, programs;
var active_progs =[];

get_apis = function () {
	get_news();
	get_programs();
	get_sliders();
	get_logo();
}

gonew = function (new_id) {
	window.location.href = 'new.html?new_id=' + new_id;
}

function formatDate(date) {
	var monthNames = [
	  "January", "February", "March",
	  "April", "May", "June", "July",
	  "August", "September", "October",
	  "November", "December"
	];
  
	var day = date.getDate();
	var monthIndex = date.getMonth();
	var year = date.getFullYear();
  
	return day + ' ' + monthNames[monthIndex] + ' ' + year;
  }

  function parseISOString(s) {
	var b = s.split(/\D+/);
	return formatDate (new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6])));
  }

news_append = function (news) {
	if(news.length > 4)
		var loop = 4;
	else
		var loop = news.length;

	for (var i = 0; i < loop; i++) {
		var due_date = parseISOString(news[i].dueDate);
		if (i % 2 == 0) {
			$('.new_divs').append('<div class="col-md-4 mb-4"><div><svg style="float: left;" class="counter2_1" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" ' +
				'width="18px" height="300px" viewBox="0 0 18 377.942" enable-background="new 0 0 18 377.942" xml:space="preserve"><g id="XMLID_97_"> ' +
				'<line id="XMLID_53_" fill="none" stroke="#09D364" stroke-width="18" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" x1="9" y1="42.859" x2="9" y2="368.942" />' +
				'<circle id="XMLID_70_1" fill="' + news[i].segment + '" cx="9" cy="8.989" r="8.989" /></g></svg><div style="padding-left: 40px;" id="news1"><h4 data-aos="fade-up" class="cursor_pointer news_title" onclick = gonew("' +
				news[i]._id + '")>' +
				news[i].title + '</h4><p data-aos="fade-up" data-aos-delay="200"><small>' + due_date + '</small></p><p data-aos="fade-up" data-aos-delay="200" class="body_news">' +
				news[i].description + '</p></div>' + '</div></div><div class="col-md-2"></div>')

		}
		else {
			$('.new_divs').append('<div class="col-md-4 mb-4"><div><svg style="float: left;" class="counter2_1" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" ' +
				'width="18px" height="300px" viewBox="0 0 18 377.942" enable-background="new 0 0 18 377.942" xml:space="preserve"><g id="XMLID_97_"> ' +
				'<line id="XMLID_53_" fill="none" stroke="#09D364" stroke-width="18" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" x1="9" y1="42.859" x2="9" y2="368.942" />' +
				'<circle id="XMLID_70_1" fill="' + news[i].segment + '" cx="9" cy="8.989" r="8.989" /></g></svg><div style="padding-left: 40px;" id="news1"><h4 data-aos="fade-up" class="cursor_pointer news_title" onclick = gonew("' +
				news[i]._id + '")>' +
				news[i].title + '</h4><p data-aos="fade-up" data-aos-delay="200"><small>' + due_date + '</small></p><p data-aos="fade-up" data-aos-delay="200" class="body_news">' +
				news[i].description + '</p></div>' + '</div></div><div class="col-md-1"></div><div class="col-md-1"></div>')

		}
	}
	// $('#news1 h4')[0].append(news[0].title);
	// $('#news1 p')[0].append(news[0].description);
}

get_news = function () {
	var url = backend_url + 'api/';
	$.get(url + 'news',
		function (data) {
			news = data.news;
			var news_active = check_activity(news);
			news_append(news_active);
		});
}

get_sliders = function () {
	var url = backend_url + 'api/';
	$.get(url + 'upload/slider',
		function (data) {
			slider = data.contents;

			slider.sort(function(a, b){ // sort object by age field
				return a.index-b.index
			})

			var valid_slider = [];
			for(var i=0; i<slider.length; i++){
				if(slider[i].image != "")
					valid_slider.push(slider[i])
			}

			append_slider(valid_slider);
		});
}

append_slider = function (slider) {
	var html = '';
	// if(slider.images.length < 5){
	// 	var loop = slider.images.length;
	// }
	// else{
	// 	var loop = 5
	// }
		html += '<div class="slItems">';
	for(var i = 0 ; i < slider.length ; i++){
		var img_url = backend_url + slider[i].image;
		// var img_url = 'assets/imgs/bright-bulb-close-up-1108572.jpg';
		if(i == 0)
			html += '<div class="slItem active" style="background-image: url('+ img_url +');">';
		else
			html += '<div class="slItem" style="background-image: url('+ img_url +');">';
		html += '<div class="slText">'+ slider[i].comment +'</div>';
		html += '<a class="slider_btn" href="'+ slider[i].link +'"><button class="btn btn-2 btn-2g" style="float: right;margin-top: 5px;">'+ slider[i].buttonText +'</button></a>';
		html += '</div>';
	}
		html += '</div>';
	$('#slider').append(html);

	if(slider.length > 1)
	{
		$(function () {
	        $('#slider').rbtSlider({
	            height: '100vh',
	            'dots': true,
	            'arrows': true,
	            'auto': 4
	        });
	    });
	}
}

check_activity = function (old_data) {
	new_data = [];
	for (var i = 0; i < old_data.length; i++) {
		if (old_data[i].is_active && old_data[i].pinned) {
			new_data.push(old_data[i]);
		}
	}
	return new_data;
}

program_one_append = function (active_progs) {
	var leng = active_progs.length;

	$('#program1 h5')[0].append(active_progs[leng - 3].name);
	$('#program1 p')[0].append(active_progs[leng - 3].description);
	var img_url = backend_url + active_progs[leng - 3].images[0];

	if( active_progs[leng - 3].images[0] != undefined){
		$('#program1 .p_left_left').css('background-image', 'url(' + img_url + ')');
    }
    else{
    	$('#program1 .p_left_left').css('background-image', 'url("./assets/imgs/logo.png")');
    }

	$('#program1 .p_left_right').css('background-color', active_progs[leng - 3].segment);

	if(active_progs.length > 1){
		$('#program2 h5')[0].append(active_progs[leng - 2].name);
		$('#program2 p')[0].append(active_progs[leng - 2].description);
		var img_url = backend_url + active_progs[leng - 2].images[0];

		if( active_progs[leng - 2].images[0] != undefined){
		$('#program2 .p_top_left').css('background-image', 'url(' + img_url + ')');
	    }
	    else{
	    	$('#program2 .p_top_left').css('background-image', 'url("./assets/imgs/logo.png")');
	    }
		$('#program2 .p_top_right').css('background-color', active_progs[leng - 2].segment);
	}

	if(active_progs.length > 2){
		$('#program3 h5')[0].append(active_progs[leng - 1].name);
		$('#program3 p')[0].append(active_progs[leng - 1].description);
		var img_url = backend_url + active_progs[leng - 1].images[0];
		if( active_progs[leng - 1].images[0] != undefined){
			$('#program3 .p_bottom_right').css('background-image', 'url(' + img_url + ')');
	    }
	    else{
	    	$('#program3 .p_bottom_right').css('background-image', 'url("./assets/imgs/logo.png")');
	    }
		$('#program3 .p_bottom_left').css('background-color', active_progs[leng - 1].segment);
	}

	$('.about_us_red').click(function(){
		window.location.href = 'about.html';
	})

	$('#program1').click(function(){
		window.location.href = 'program.html?program_id=' + active_progs[0]._id;
	})

	$('#program2').click(function(){
		window.location.href = 'program.html?program_id=' + active_progs[1]._id;
	})

	$('#program3').click(function(){
		window.location.href = 'program.html?program_id=' + active_progs[2]._id;
	})
}


get_programs = function () {
	var url = backend_url + 'api/';
	$.get(url + 'programs',
		function (data) {
			programs = data.programs;
			for(var i= 0; i<programs.length; i++){
				if(programs[i].pinned && programs[i].is_active )
					active_progs.push(programs[i]);
			}
			program_one_append(active_progs);
		});
}

get_logo = function(){
	var url = backend_url + 'api/upload/';
	$.get(url + 'logos',
		function (data) {
			logos = data;
			logo_append(logos);
		});
}

logo_append = function (logos){
	var html = '';
	for(var i = 0 ; i < logos.contents.length; i++){
		html += '<div class="col-md-3 col-sm-6" data-aos="fade-up"><div class="media block-6 d-block text-center">'
		html += '<div class="icon icon_logo"><a href="'+logos.contents[i].link+'" target="_blank">'
		var img_url = backend_url + logos.contents[i].image;
		html +=	'<img alt="partnerLogo" src="'+ img_url +'" style="width: 60%;"></a>';
		html +=	'</div></div></div>';		
	}
	html += '<div class="col-md-3 col-sm-6" data-aos="fade-up" data-aos-delay="200">';
	html += '<div class="media block-6 d-block text-center"><div class="icon">';
	html += '<a href="partners.html#formsection" class="float_partner"><i class="fa fa-plus my-float-partner"></i></a>';
	html += '</div></div><h6 class="text-center" id="next_partner" >Be the next</h6></div>';
	$('#partner_logos').append(html);
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

// $('#next_partner').click(function(){
// 	window.location.href = 'partners.html#formsection';
// })


$(document).ready(function ($) {
	gtag('event', 'home', {
        'event_category': 'home_page_loaded'
    });

    $('.logout_button').click(function (e) {
		e.preventDefault();
		var url = backend_url + 'logout';
		// localStorage.clear();
		localStorage.removeItem('token');
		localStorage.removeItem('user_id');
		gapi.load('auth2', function() {
	        gapi.auth2.init();
	        var auth2 = gapi.auth2.getAuthInstance();
        		auth2.signOut().then(function () {
            	console.log("on sign out");
        	});
      	});
		
	    document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); })
	    setTimeout(function(){
		    window.location.href = 'home.html';
	    }, 500);
	});

	$('.about_us_red').click(function() {
		window.location.href = 'about.html';
	})

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
		AOS.init({
			duration: 800,
			easing: 'slide'
		});
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
		}, 500);
		// end animation
		b = 1;

	}

});

