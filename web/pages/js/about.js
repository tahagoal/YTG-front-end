
    var backend_url = 'https://ytg.eco/';

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


    team_append = function (members) {
        var html = '';
        for (var i = 0; i < members.length; i++) {
            html += '<div class="col-lg-20" style="padding-right: 0px; padding-left: 0px;">';
            html += '<div class="personne larg" data-id="26">';
            var img_url = backend_url + members[i].image1;
            var img_url2 = backend_url + members[i].image2;
            html += '<img class="img_2_about" src="' + img_url2 +'">';
            html += '<img class="img_1_about" src="' + img_url +'">';
            html += '<h4 align="center" style="font-weight: bold; color:#09d364;margin-top: 10px;">' + members[i].name + '&nbsp';
            if(members[i].pinned)
                html += '<a href="'+ members[i].linkedinUrl +'"><i class="fa fa-linkedin-square" aria-hidden="true"></i></a>';
            html += '</h4><h4 align="center" style="margin-top: 5px;">'+ members[i].title +'</h4></div></div>';
        }

        html += '<div class="col-lg-20" style="padding-right: 0px; padding-left: 0px;">';
        html += '<div class="personne-add larg" data-id="26"><div><i class="fa fa-plus join-team-i"></i>';
        html += '<h3 align="center" style="color: white;">Join our team</h3></div></div></div>';

        $('#team_members').append(html);

        $('.personne-add').click(function(){
            window.location.href = 'careers.html';
        })
    }

    get_team = function () {
        var url = backend_url + 'api/';
        $.get(url + 'team-member',
            function (data) {
                members = data;
                team_append(members.teammembers);
            });
    }

    $(document).ready(function ($) {
        get_team();
        check_ath();
    })


    var a = 0;
    $(window).scroll(function () {

        var oTop = $('#counter').offset().top - window.innerHeight;
        if (a == 0 && $(window).scrollTop() > oTop) {

            // animation
            $('.counter1').addClass('start_animation');
            $('.counter2').addClass('start_animation');
            $('.counter3').addClass('start_animation');
            $('.counter4').addClass('start_animation');
            $('.counter5').addClass('start_animation');
            // end animation
            a = 1;

        }

    })