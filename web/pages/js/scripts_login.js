var backend_url = 'https://ytg.eco/';

AOS.init({
	duration: 800,
	easing: 'slide'
});

middle_auth = function () {
	url = window.location.href.substr(window.location.href.lastIndexOf('/') + 1);
	if (url == 'login.html' || url == 'signup.html') {
		window.location.replace('home.html');
	}
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




$(document).ready(function ($) {
	"use strict";

	gtag('event', 'login', {
		'event_category': 'login_page_loaded'
	});

	$('.logout_button').click(function (e) {
		e.preventDefault();
		localStorage.removeItem('token');
		localStorage.removeItem('user_id');
		setTimeout(function(){
			window.location.href = 'home.html';		
		},200);
	})


	$(document).click(function (event) {
        var clickover = $(event.target);
        var _opened = $(".navbar-collapse").hasClass("show");
        if (_opened === true && !clickover.hasClass("navbar-toggle") && !clickover.getAttribute('id') == 'profile_image') {
            $(".navbar-toggler").click();
        }
    });



	var token = localStorage.getItem('token');
	if (token != null) {
		middle_auth();
	}
	else{
		var auth2 = gapi.auth2.getAuthInstance();
	    auth2.signOut().then(function () {
	      // console.log('User signed out.');
	    });
	}

	check_ath();


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

function onSignFbIn(facebookUser){
	var id = facebookUser.id;
	var fname = facebookUser.first_name;
	var lname = facebookUser.last_name;
	var image = facebookUser.picture.data.url;
	var email = facebookUser.email;

	var url = backend_url + 'api/login';
	var data = {
		'username': email,
		'password': id,
		'type': 'user'
	}

	$.post(url, data, function (result) {
		console.log("success");
		localStorage.setItem('token', result.token);
		localStorage.setItem('user_id', result._id);
		window.location.replace('home.html');
	})
	.done(function () {
		console.log("second success");
	})
	.fail(function (error) {
		//Register now if user not exsist

		url = backend_url + 'api/register'
		var data = {
			'first_name': fname,
			'last_name': lname,
			'image': image,
			'password': id,
			'email': email,
			// 'mobile': '+00' + Math.floor(Math.random()*90000) + 10000 ,
			'auth_type': 'facebook'
		}
		$.post(url, data, function (result) {
			console.log("success");
			localStorage.setItem('token', result.token);
			localStorage.setItem('user_id', result._id);
			swal("Thank you!", "Please complete your data", "success", {
				button: "Got it!",
			}).then((value) => {
				window.location.replace('edit.html');
			});
		})
			.done(function () {
				console.log("second success");
			})
			.fail(function (error) {
				swal(error.responseJSON.message, "", "error", {
					button: "Try again!",
				});
			})
			.always(function () {
				console.log("finished");
			});
	})
	.always(function () {
		console.log("finished");
	});

}

var profile,id,fname,lname,image,email;

function onSignIn(googleUser) {
	// $('.g-signin2').click(function(){
	profile = googleUser.getBasicProfile();
	id = profile.getId();
	fname = profile.getGivenName();
	lname = profile.getFamilyName();
	image = profile.getImageUrl();
	email = profile.getEmail();
	google_sign();

}

// $('.g-signin2').click(function(){
	// if(localStorage.getItem('google_sign') != null)
		google_sign();
// })

google_sign = function(){

	var url = backend_url + 'api/login';
	var data = {
		'username': email,
		'password': id,
		'type': 'user'
	}
	localStorage.setItem('google_sign', true);
	$.post(url, data, function (result) {
		console.log("success");
		localStorage.setItem('token', result.token);
		localStorage.setItem('user_id', result._id);
		localStorage.setItem('google_sign', true);
		if (userData.image != null && userData.image != '') {
			localStorage.setItem('user_image', image);
        }
        else{
            localStorage.setItem('user_image', 'assets/imgs/profile.jpeg');
        }
		window.location.replace('home.html');
	})
		.done(function () {
			console.log("second success");
		})
		.fail(function (error) {
			//Register now if user not exsist

			url = backend_url + 'api/register'
			var data = {
				'first_name': fname,
				'last_name': lname,
				'image': image,
				'password': id,
				'email': email,
				// 'mobile': '+00' + Math.floor(Math.random()*90000) + 10000 ,
				'auth_type': 'google'
			}
			$.post(url, data, function (result) {
				console.log("success");
				localStorage.setItem('token', result.token);
				localStorage.setItem('user_id', result._id);
				if (userData.image != null && userData.image != '') {
					localStorage.setItem('user_image', image);
                }
                else{
                    localStorage.setItem('user_image', 'assets/imgs/profile.jpeg');
                }

				swal("Thank you!", "Please complete your data", "success", {
					button: "Got it!",
				}).then((value) => {
					window.location.replace('edit.html');
				});
			})
				.done(function () {
					console.log("second success");
				})
				.fail(function (error) {
					swal(error.responseJSON.message, "", "error", {
						button: "Try again!",
					});
				})
				.always(function () {
					console.log("finished");
				});
		})
		.always(function () {
			console.log("finished");
		});
}


$('#login_submit').click(function (e) {
	e.preventDefault();
	var username = $('#login_user').val();
	var password = $('#login_password').val();
	var url = backend_url + 'api/login';
	var data = {
		'username': username,
		'password': password,
		'type': 'user'
	}
	$.post(url, data, function (result) {
		console.log("success");
		localStorage.setItem('token', result.token);
		localStorage.setItem('user_id', result._id);
		if(result.image != null && result.image != ''){
			localStorage.setItem('user_image', result.image);
		}
		else{
			localStorage.setItem('user_image', 'assets/imgs/profile.jpeg');
		}
        swal("Hi " + result.first_name, "", "success", {
            button: "Ok",
        }).then((value) => {
        	window.location.replace('home.html');
    	});
	})
		.done(function () {
			console.log("second success");
		})
		.fail(function (error) {
			if(error.status == 401){
				swal("Account is not registered", "", "error", {
					button: "Try again!",
				});
			}
			else if (error.status == 403){
				swal("Password not correct", "", "error", {
					button: "Try again!",
				});
			}
		})
		.always(function () {
			console.log("finished");
		});
})

$('.reset_password').click(function (e) {
	e.preventDefault();
	var username = $('#reset_email').val();
	var url = backend_url + 'api/forgot_password';
	var data = {
		'username': username,
		'type': 'user'
	}
	$.post(url, data, function (result) {
		console.log("success");
		localStorage.removeItem('token');
		swal("", "Check your e-mail", "success", {
			button: "Got it!",
		}).then((value) => {
			// window.location.replace('home.html');
		});
	})
		.done(function () {
			console.log("second success");
		})
		.fail(function (error) {
			swal(error.responseJSON.message, "", "error", {
				button: "Try again!",
			});
		})
		.always(function () {
			console.log("finished");
		});
})

$('.register_submit').click(function (e) {
	if ($(".form_login").valid()) {
		var firstname = $('#register_first').val();
		var lastname = $('#register_last').val();
		var mobile = '+00' + $('#register_mobile').val();
		var email = $('#register_mail').val();
		var password = $('#register_password').val();
		var dateOfBirth = $('#register_date').val();
		var residence_address = $('#register_address').val();
		var organization = $('#register_grad').val();
		var graduation_status = $('#register_orgn').val();

		var finalDate = '';

		if(dateOfBirth != null && dateOfBirth != ''){
			var dateArray = dateOfBirth.split("-");
			finalDate = dateArray[1] + "/" + dateArray[2] + "/" + dateArray[0];
		}
		var url = backend_url + 'api/register';
		var data = {
			'first_name': firstname,
			'last_name': lastname,
			'mobile': mobile,
			'password': password,
			'date_of_birth': finalDate,
			'email': email,
			'residence_address':residence_address,
			'organization':organization,
			'graduation_status':graduation_status,
			'auth_type': 'local'
		};
		$.post(url, data, function (result) {
			console.log("success");
			swal("Account created successfully", "Please check your e-mail", "success", {
				button: "Got it!",
			}).then((value) => {
				window.location.replace('login.html');
			});
		})
			.done(function () {
				console.log("second success");
			})
			.fail(function (error) {
				swal(error.responseJSON.message, "", "error", {
					button: "Try again!",
				});
			})
			.always(function () {
				console.log("finished");
			});
	}
});
