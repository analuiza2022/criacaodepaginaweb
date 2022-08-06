$(document).ready(function () {
    $(
        ".hamburguer".click(function () {
            $(this).toogletClass("active");
            $(".menu").toogletClass("active");
        })
    );        
});