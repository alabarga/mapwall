$(document).ready(function () {
    $("#search").attr("value", "Москва");
    $('.search-button').trigger('click');
});


$(document).ready(function () {
    var col_count = 7;
    var $e = $('.carousel');
    while ($e.children('.img').not('.item').length) {
        $e.children('.img').not('.item').filter(':lt(' + col_count + ')').wrapAll('<div class="item">');
    };
});

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

$('.menu-main .container li:nth-child(1)').click(function () {
    $('nav ul li#n1').trigger('click');
});

$('.menu-main .container li:nth-child(2)').click(function () {
    $('nav ul li#n2').trigger('click');
});

$('.menu-main .container li:nth-child(3)').click(function () {
    $('nav ul li#n3').trigger('click');
});

$('.menu-main .container li:nth-child(4)').click(function () {
    $('nav ul li#n4').trigger('click');
});

$('.menu-main .container li').click(function () {
    $('button.menu').trigger('click');
});

$(document).ready(function () {
    $('.w').removeClass('w2');
    $('.w').removeClass('w3');
    $('.w').addClass('w1');
});

$(document).ready(function () {
    $(".nav-item.s1").click(function () {
        $('.w').removeClass('w2');
        $('.w').removeClass('w3');
        $('.w').addClass('w1');
        $(".price").html("1800");
        $("#pr_in").val("1800");
    });
});

$(document).ready(function () {
    $(".nav-item.s2").click(function () {
        $('.w').removeClass('w1');
        $('.w').removeClass('w3');
        $('.w').addClass('w2');
        $(".price").html("2300");
        $("#pr_in").val("2300");
    });
});

$(document).ready(function () {
    $(".nav-item.s3").click(function () {
        $('.w').removeClass('w1');
        $('.w').removeClass('w2');
        $('.w').addClass('w3');
        $(".price").html("2800");
        $("#pr_in").val("2800");
    });
});

$(document).ready(function () {
    $(".nav-item.f1").click(function () {
        $('.frame').removeClass('frame2');
        $('.frame').removeClass('frame3');
        $('.frame').removeClass('frame4');
        $('.frame').addClass('frame1');
    });
    $(".nav-item.f2").click(function () {
        $('.frame').removeClass('frame1');
        $('.frame').removeClass('frame3');
        $('.frame').removeClass('frame4');
        $('.frame').addClass('frame2');
    });
    $(".nav-item.f3").click(function () {
        $('.frame').removeClass('frame1');
        $('.frame').removeClass('frame2');
        $('.frame').removeClass('frame4');
        $('.frame').addClass('frame3');
    });
    $(".nav-item.f4").click(function () {
        $('.frame').removeClass('frame1');
        $('.frame').removeClass('frame2');
        $('.frame').removeClass('frame3');
        $('.frame').addClass('frame4');
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

$(document).ready(function () {
    var $divs1 = $(".info1 input:nth-last-child(1),.info1 input:nth-last-child(2)");
    $divs1.wrapAll('<div class="form-group2"></div>');
});
/*
$('.add-button button').click(function () {
    setTimeout(function () {
        $(".fancybox").fancybox().trigger('click');
    }, 1800);
});
*/

$('.popup .ch1 label').click(function () {
    $('#tabs ch37 label').trigger('click');
});

$('.popup .ch2 label').click(function () {
    $('#tabs .ch38 label').trigger('click');
});

$('.popup .ch2 label').click(function () {
    $('.popup .ch3').toggleClass('active');
});

$('.popup .ch2 label').click(function () {
    $('#tabs .ch39 label').trigger('click');
});

$(document).ready(function () {
    $('.popup2 .ch.3539').addClass('hidden');
});

$('.popup2 .ch.3538 label').click(function () {
    $('.popup2 .ch.3539').toggleClass('active');
});

$('.popup2 .ch label').click(function () {
    $(this).parents(this).toggleClass('act');
});

$('.popup .button').click(function () {
    $('.add-button button').trigger('click');
});

$('.add-button span').click(function () {
    $('.add-button .button').trigger('click');
});

$(document).on('click', '.popup2 button', function () {
    $.fancybox.close();
});

$(document).on('click', '.popup button', function () {
    $.fancybox.close();
});

$('.popup2 button').click(function () {
    setTimeout(function () {
        $(".fancybox").fancybox().trigger('click');
    }, 800);
});

$(document).on('keyup keypress', 'form input[type="text"]', function (e) {
    if (e.keyCode == 13) {
        e.preventDefault();
        return false;
    }
});


