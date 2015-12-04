$(document).ready(function () {
    // code will go here...

    // $('.down-button').addClass('animated shake');

    $('nav a, .down-button a').bind('click', function () {
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top - 50
        }, 1500);
        event.preventDefault();
    });
});
