var backend_url = 'https://shrouded-ridge-65941.herokuapp.com/';
var programs;


get_apis = function () {
	get_programs();
}

$('#program1').click(function(){
	window.location.replace('programdes.html?program_id=' + programs[0]._id);
})

$('#program2').click(function(){
	window.location.replace('programdes.html?program_id=' + programs[1]._id);
})

// $('#program3').onclick = function(){
// 	window.location.replace('programdes.html?program_id=' + programs[2]._id);
// }

program_one_append = function (programs){
	$('#program1 h2')[0].append(programs[0].name);
	$('#program1 p')[0].append(programs[0].description);
	$('#program1 .p_left_left').css('background-image', 'url(' + programs[0].description + ')');

	$('#program2 h2')[0].append(programs[1].name);
	$('#program2 p')[0].append(programs[1].description);
	$('#program2 .p_left_left').css('background-image', 'url(' + programs[1].description + ')');

	// $('#program3 h2')[0].append(programs[2].name);
	// $('#program3 p')[0].append(programs[2].description);
	// $('#program3 .p_left_left').css('background-image', 'url(' + programs[2].description + ')');
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