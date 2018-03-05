;(function ( exports ) {
     
    'use strict';
    
    const transition = $( '.transition' );
    const navigation = $( 'nav' );
    const header = $( 'header' );
    const sections = $( 'section' );


    // Index
    var index = 0;
    

    // Transform
    const transform = function () {
        let theme = sections.eq( index ).data( 'theme' );

        navigation.attr('data-theme', theme);
        header.attr('data-theme', theme);
    
        transition.css('top', -index * document.body.clientHeight);
    }
    

    // Navigation
    $('li', navigation).on('click', function () {
        index = $( this ).index();
    
        $('li', navigation).removeClass( 'active' );
        $( this ).addClass( 'active' );

        transform();
    });
    

    // Scroll Button
    $( '.scroll' ).on('click', function () {
        index = 1;
    
        $('li', navigation).removeClass( 'active' );
        $('li', navigation).eq( 1 ).addClass( 'active' );

        transform();

        let offset = sections.eq( index ).offset();

        $( 'html, body' ).animate({
            scrollTop: offset.top
        }, 800 )
    });


    // Fade Out Alert
    $( 'form.config input' ).on('focus', function () {
        $( this.parentNode ).next().removeClass( 'fade-in-out' );
    }).on('blur', function () {
        $( this.parentNode ).next().addClass( 'fade-in-out' );
    });


   /* // Demo Test
    const map = GeoMap( '#map' );

    $( '#styles [name = type]' ).on('change', function () {
        let value = $( this ).val();

        $.get('json/' + value + '.json', ( response ) => {
			try {
                var object = new google.maps.StyledMapType( response );
			} catch ( error ) {
				console.error( 'Syntax Error' )
			}

			map.mapTypes.set(value, object);
			map.setMapTypeId( value );
		})
    });*/

    
    // Event Window
    $( window ).on('resize', function () {
        transition.css('top', -index * document.body.clientHeight);
    });
    
})( this );