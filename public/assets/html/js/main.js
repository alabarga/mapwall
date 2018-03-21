$(document).ready(function () {
    $(".menu").click(function () {
        $(this).toggleClass('active');
        $(".menu-main").slideToggle("300", function () {
            $(this).addClass('active');
            if ($(this).is(':visible')) $(this).css('display', 'flex');
        });
    }), $(window).resize(function () {
        $(window).width() > 810 && $(".menu-main").removeAttr("style")
    })
});

var widthmap = $(window).width();
var heightmap = $(window).width();


$(document).ready(function () {
    $('.w').removeClass('w2');
    $('.w').removeClass('w3');
    $('.w').addClass('w1');
    /*
    $('.map').attr('width', 850).attr('height', 1134);
    */
});

$(document).ready(function () {
    $(".nav-item.s1").click(function () {
        $('.w').removeClass('w2');
        $('.w').removeClass('w3');
        $('.w').addClass('w1');
        /*
        $('.map').attr('width', 850).attr('height', 1134);
        */
    });
});

$(document).ready(function () {
    $(".nav-item.s2").click(function () {
        $('.w').removeClass('w1');
        $('.w').removeClass('w3');
        $('.w').addClass('w2');
        /*
        $('.map').attr('width', 1417).attr('height', 1984);
        */
    });
});

$(document).ready(function () {
    $(".nav-item.s3").click(function () {
        $('.w').removeClass('w1');
        $('.w').removeClass('w2');
        $('.w').addClass('w3');
        /*
        $('.map').attr('width', 1984).attr('height', 2835);
        */
    });
});


$(document).ready(function () {
    $(".ni1").click(function () {
        $('.w').removeClass('horizontal');
        $('.w').addClass('vertical');
    });
    $(".ni2").click(function () {
        $('.w').removeClass('vertical');
        $('.w').addClass('horizontal');
    });
});

/*
$(window).resize(function(){
    var widthmap = $(window).width();
    var heightmap = $(window).width();
    $('.map').css('width', widthmap/1.2 - 30);
    $('.map').css('height', heightmap/1.2 - 30);
});
*/
