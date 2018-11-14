var backend_url = 'https://shrouded-ridge-65941.herokuapp.com/';
var programs;


get_apis = function () {
	get_programs();
}

program_one_append = function (programs){
	$('#program1 h2')[0].append(programs[0].name);
	$('#program1 p')[0].append(programs[0].description);
	$('#program1 .p_left_left').css('background-image', 'url(' + programs[0].description + ')');
}


get_programs = function(){
	var url = backend_url;
	$.get(url + 'programs', 
	function (data) {
		programs = data.programs;
		program_one_append(programs);
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