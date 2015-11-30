$(document).ready(function () {
    // code will go here...

    $('.down-button').addClass('animated shake');

    $('.down-button').click(function () {
        $(this).fadeOut('slow');
    });
});
