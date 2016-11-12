$(function () {
    $('#nav-bar ul li.compose').on('click', function () {

        if ($(this).hasClass('clicked')) {
            $(this).removeClass('clicked');
            $('section.new-tweet').slideUp(300);
            $(this).css({'background-color':'#e8fdff'});
        } else {
            $('section.new-tweet').slideDown(300);
            $('form#compose-tweet textarea').focus();
            $(this).addClass('clicked');
            $(this).css({'background-color':'#fff'});
            window.scrollTo(0,0);
        }
    });
});
