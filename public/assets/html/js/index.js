;
(function (exports) {

    'use strict';

    const transition = $('.transition');
    const navigation = $('nav');
    const header = $('header');
    const sections = $('section');


    // Index
    var index = 0;


    // Transform

    const transform = function () {
        let theme = sections.eq(index).data('theme');

        navigation.attr('data-theme', theme);
        header.attr('data-theme', theme);

        transition.css('top', -index * document.body.clientHeight);
    }

    // Scroll
    $(window).bind('mousewheel DOMMouseScroll', function (event) {
        if (event.originalEvent.wheelDelta > 0 && $('#n1').hasClass('active')) {
            // вверх
            $('#n1').trigger("click", function () {
                index = $(this).index();
                $('li', navigation).removeClass('active');
                $(this).addClass('active');
                transform();
            });
        }
        if ($('#n2').hasClass('active') && event.originalEvent.wheelDelta > 0) {
            // вверх
            $('#n1').trigger("click", function () {
                index = $(this).index();
                $('li', navigation).removeClass('active');
                $(this).addClass('active');
                transform();
            });
        }
        if ($('#n3').hasClass('active') && event.originalEvent.wheelDelta > 0) {
            // вверх
            $('#n2').trigger("click", function () {
                index = $(this).index();
                $('li', navigation).removeClass('active');
                $(this).addClass('active');
                transform();
            });
        }
        if ($('#n4').hasClass('active') && event.originalEvent.wheelDelta > 0) {
            // вверх
            $('#n3').trigger("click", function () {
                index = $(this).index();
                $('li', navigation).removeClass('active');
                $(this).addClass('active');
                transform();
            });
        }
        if ($('#n1').hasClass('active') && event.originalEvent.wheelDelta < 0) {
            // вниз
            $('#n2').trigger("click", function () {
                index = $(this).index();
                $('li', navigation).removeClass('active');
                $(this).addClass('active');
                transform();
            });
        } else if ($('#n2').hasClass('active') && event.originalEvent.wheelDelta < 0) {
            // вниз
            $('#n3').trigger("click", function () {
                index = $(this).index();
                $('li', navigation).removeClass('active');
                $(this).addClass('active');
                transform();
            });
        } else if ($('#n3').hasClass('active') && event.originalEvent.wheelDelta < 0) {
            // вниз
            $('#n4').trigger("click", function () {
                index = $(this).index();
                $('li', navigation).removeClass('active');
                $(this).addClass('active');
                transform();
            });
        }

    });


    // Navigation
    $('li', navigation).on('click', function () {
        index = $(this).index();

        $('li', navigation).removeClass('active');
        $(this).addClass('active');

        transform();
    });


    // Scroll Button
    $('.scroll').on('click', function () {
        index = 1;

        $('li', navigation).removeClass('active');
        $('li', navigation).eq(1).addClass('active');

        transform();

        let offset = sections.eq(index).offset();

        $('html, body').animate({
            scrollTop: offset.top
        }, 800)
    });


    // Fade Out Alert
    $('form.config input').on('focus', function () {
        $(this.parentNode).next().removeClass('fade-in-out');
    }).on('blur', function () {
        $(this.parentNode).next().addClass('fade-in-out');
    });


    // Event Window
    $(window).on('resize', function () {
        transition.css('top', -index * document.body.clientHeight);
    });

})(this);
