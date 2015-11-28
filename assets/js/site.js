$(document).ready(function () {
    // code will go here...
    if (window.location.href === "http://localhost:4000/" ||
        window.location.href === "https://jasonsjones.github.io/") {
        $('.header-content').addClass('animated fadeInLeft');
    }

    $('.down-button').addClass('animated shake');

    $('.down-button').click(function () {
        $(this).fadeOut('slow');
    })
});
