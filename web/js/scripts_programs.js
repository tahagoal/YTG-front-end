var backend_url = 'https://shrouded-ridge-65941.herokuapp.com/';
var programs;
var active_programs =[];
var active_services =[];


get_apis = function () {
	get_programs();
	get_services();
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

program_one_append = function (programs){
	$('#program1 h2')[0].append(programs[0].name);
	$('#program1 .program_descrip').append(programs[0].description);
	var img_url = backend_url + programs[0].images[0];
	$('#program1 .p_left_left').css('background-image', 'url(' +img_url+ ')');
	$('#program1 .p_left_right').css('background-color', programs[0].segment);

	if(programs.length > 1){
		$('#program2 h2')[0].append(programs[1].name);
		$('#program2 .program_descrip').append(programs[1].description);
		$('#program2 .p_left_left').css('background-image', 'url(' + programs[1].description + ')');
		$('#program1 .p_top_right').css('background-color', programs[1].segment);
	}
	
	if(programs.length > 2){
		$('#program3 h2')[0].append(programs[2].name);
		$('#program3 .program_descrip').append(programs[2].description);
		$('#program3 .p_left_left').css('background-image', 'url(' + programs[2].description + ')');
		$('#program1 .p_bottom_left').css('background-color', programs[2].segment);
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
	$('#service1 .name-2')[0].append(active_services[0].name);
	$('#service2 .name-2')[0].append(active_services[1].name);
	$('#service3 .name-2')[0].append(active_services[2].name);
	
	$('#service1 p')[0].append(active_services[2].description);
	$('#service2 p')[0].append(active_services[2].description);
	$('#service3 p')[0].append(active_services[2].description);
}

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