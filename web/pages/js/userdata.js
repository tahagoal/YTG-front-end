var backend_url = 'https://ytg.eco/';

$(document).ready(function ($) {
    var user_id = localStorage.getItem('user_id');
    get_user = function () {
        var user_id = localStorage.getItem('user_id');
        var options = {
            method: 'GET',
            url: backend_url + 'api/users/' + user_id + '/profile',
            headers: {"Authorization": localStorage.getItem('token')}
        };
        $.get(options,
            function (data) {
                var userData = data;
                if (userData.image != null) {
                    localStorage.setItem('user_image', userData.image);
                    document.getElementById("profile_image").src = userData.image;
                    document.getElementById("profile_p").src = userData.image;
                }
            });
    };
    get_user();
});

