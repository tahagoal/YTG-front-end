var backend_url = 'http://209.97.176.62:3000/';
var programs;
var active_programs =[];
var active_services =[];


get_apis = function () {
	get_programs();
	get_services();
	check_ath();
}

$('#program1').click(function(){
	window.location.href = 'programdes.html?program_id=' + active_programs[0]._id;
})

$('#program2').click(function(){
	window.location.href = 'programdes.html?program_id=' + active_programs[1]._id;
})

$('#program3').click(function(){
	window.location.href = 'programdes.html?program_id=' + active_programs[2]._id;
})

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

program_one_append = function (programs){
	$('#program1 h2')[0].append(programs[0].name);
	$('#program1 .program_descrip').append(programs[0].description);
	var img_url = backend_url + programs[0].images[0];
	$('#program1 .p_left_left').css('background-image', 'url(' +img_url+ ')');
	$('#program1 .p_left_right').css('background-color', programs[0].segment);

	if(programs.length > 1){
		$('#program2 h2')[0].append(programs[1].name);
		$('#program2 p')[0].append(programs[1].description);
		var img_url = backend_url + programs[1].images[0];
		$('#program2 .p_top_left').css('background-image', 'url(' + img_url + ')');
		$('#program2 .p_top_right').css('background-color', programs[1].segment);
	}

	if(programs.length > 2){
		$('#program3 h2')[0].append(programs[2].name);
		$('#program3 p')[0].append(programs[2].description);
		var img_url = backend_url + programs[2].images[0];
		$('#program3 .p_bottom_right').css('background-image', 'url(' + img_url + ')');
		$('#program3 .p_bottom_left').css('background-color', programs[2].segment);
	}

	if(programs.length > 3){
		var html = '<div class="row">';
		var loop = programs.length;
		for(var i = 3; i < programs.length ; i ++){

			if (loop % 4 == 3 && i%3 == 0){
				html += '<div class="col-sm-4 offset-2 col-md-3 card_section" data-aos="fade-up"><div class="block-10 cursor_pointer" style="background-color:'+ programs[i].segment +'">';
			}
			else if(loop % 4 == 2 && i%3 == 0){
				html += '<div class="col-sm-4 offset-3 col-md-3 card_section" data-aos="fade-up"><div class="block-10 cursor_pointer" style="background-color:'+ programs[i].segment +'">';
			}
			else if(loop % 4 == 1 && i%3 == 0){
				html += '<div class="col-sm-4 offset-2 col-md-3 card_section" data-aos="fade-up"><div class="block-10 cursor_pointer" style="background-color:'+ programs[i].segment +'">';
			}
			else{
				html += '<div class="col-sm-4 col-md-3 card_section" data-aos="fade-up"><div class="block-10 cursor_pointer" style="background-color:'+ programs[i].segment +'">';
			}
			if( programs[i].images[0] != undefined){
				var img_url = backend_url + programs[i].images[0];
		    	html += '<div class="won-img" style="background: url(' + img_url + ');"></div>';
		    }
		    else{
		    	var img_url = backend_url + programs[i].images[0];
		    	html += '<div class="won-img" style="background: url(../assets/imgs/logo.png); background-repeat:no-repeat; background-size: contain; background-position: center center;"></div>';
		    }

		    html += '<div class="person-info"><span class="name-2 mb-3">'+ programs[i].name +'</span>';
		    html += '<p>'+ programs[i].name +'</p>';
		    html += '<span class="result"><a href="#" class="float_program_card center">';
		    html += '<i class="fa fa-plus my-float-card"></i></a></span></div></div></div></div>';

		}

	$('.programs_section').append(html);
	}
	
}


get_programs = function(){
	var url = backend_url;
	$.get(url + 'api/programs', 
	function (data) {
		programs = data.programs;

		for(var i = 0; i< programs.length; i++){
			if(programs[i].is_active){
				active_programs.push(programs[i]);
			}
		}
		program_one_append(active_programs);
	});
}

service_append = function(active_services){

    var html = '';
    var loop = active_services.length;
                                        
	for (var i = 0; i < active_services.length; i++) {

		if (loop % 4 == 3 && i%3 == 0){
			html += '<div class="col-sm-4 offset-2 col-md-3 card_section" data-aos="fade-up"><div class="block-10 cursor_pointer">';
		}
		else if(loop % 4 == 2 && i%3 == 0){
			html += '<div class="col-sm-4 offset-3 col-md-3 card_section" data-aos="fade-up"><div class="block-10 cursor_pointer">';
		}
		else if(loop % 4 == 1 && i%3 == 0){
			html += '<div class="col-sm-4 offset-2 col-md-3 card_section" data-aos="fade-up"><div class="block-10 cursor_pointer">';
		}
		else{
			html += '<div class="col-sm-4 col-md-3 card_section" data-aos="fade-up"><div class="block-10 cursor_pointer">';
		}
		if( active_services[i].images[0] != undefined){
			var img_url = backend_url + active_services[i].images[0];
	    	html += '<div class="won-img" style="background: url(' + img_url + ');"></div>';
	    }
	    else{
	    	var img_url = backend_url + active_services[i].images[0];
	    	html += '<div class="won-img" style="background: url(../assets/imgs/logo.png); background-repeat:no-repeat; background-size: contain; background-position: center center;"></div>';
	    }

	    html += '<div class="person-info"><span class="name-2 mb-3">'+ active_services[i].name +'</span>';
	    html += '<p>'+ active_services[i].name +'</p>';
	    html += '<span class="result"><a href="#" class="float_program_card center">';
	    html += '<i class="fa fa-plus my-float-card"></i></a></span></div></div></div>';

	}

	$('#service_container .row').append(html);

}


$('#service1').click(function(){
	window.location.href = 'servicedes.html?service_id=' + active_services[0]._id;
})

$('#service2').click(function(){
	window.location.href = 'servicedes.html?service_id=' + active_services[1]._id;
})

$('#service3').click(function(){
	window.location.href = 'servicedes.html?service_id=' + active_services[2]._id;
})

get_services = function(){
	var url = backend_url;
	$.get(url + 'api/services', 
	function (data) {
		services = data.services;

		for(var i = 0; i< services.length; i++){
			if(services[i].is_active){
				active_services.push(services[i]);
			}
		}
		service_append(active_services);
	});
}

check_ath = function (){
	var token = localStorage.getItem('token');

	if(token != null){
		$('.login_navbar').css('display', 'none');
		$('.logout_navbar').css('display', 'block');
	}

	else{
		$('.login_navbar').css('display', 'block');
		$('.logout_navbar').css('display', 'none');
	}
}

$(document).ready(function ($) {
    get_apis();
	check_ath();

})