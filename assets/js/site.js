$(document).ready(function () {
    // code will go here...

    $('.down-button').addClass('animated shake');

    $('.down-button').click(function () {
        $('html, body').animate({
            scrollTop: $('#next-section').offset().top-50
        }, 1500);
        $(this).fadeOut('slow');
    });
});
