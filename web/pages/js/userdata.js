var backend_url = 'https://ytg.eco/';

$(document).ready(function ($) {

    $(document).click(function (event) {
        var clickover = $(event.target);
        var _opened = $(".navbar-collapse").hasClass("show");
        if (_opened === true && !clickover.hasClass("navbar-toggle") && clickover.get()[0].id != 'profile_image') {
            $(".navbar-toggler").click();
        }
    });

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
                if (userData.image != null && userData.image != '') {
                    localStorage.setItem('user_image', userData.image);
                    // document.getElementById("profile_image").src = userData.image;
                    // document.getElementById("profile_p").src = userData.image;
                }
            });
    };
    document.getElementById("profile_image").src = localStorage.getItem('user_image');
    document.getElementById("profile_p").src = localStorage.getItem('user_image');
    get_user();
});

