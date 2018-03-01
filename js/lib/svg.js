;(function ( selector ) {

    var images = document.querySelectorAll( selector );
    var reader = new FileReader();
    var index  = 0;

    if ( !images.length ) return;

    function createElement ( data ) {
        var temp = document.createElement( 'div' );
        temp.innerHTML = data;

        if ( temp.children.length ) return temp.children[0];

        return document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    }

    function readDataFile ( image ) {
        var id = image.id.trim();
        var classes = image.className.replace(/\s+/g,' ').trim();

        var array = image.src.split( '.' );
        var type  = array[array.length - 1];

        if ( type != 'svg' ) {
            index++;
            
            if ( index < images.length ) { readDataFile( images[index] ) }

            return;
        }

        XMLRequest(image.src, function ( data ) {
            var element = createElement( data );

            if ( id.length ) element.setAttribute('id', id);
            if ( classes.length ) element.setAttribute('class', classes);

            element.removeAttribute( 'xmlns:a' );
            image.parentNode.replaceChild(element, image);

            index++;

            if ( index < images.length ) { readDataFile( images[index] ) }
        })
    }
    
    function XMLRequest (src, callback) {
        var xmlhttp = new XMLHttpRequest();
        
        xmlhttp.onreadystatechange = function() {
            if ( this.readyState == 4 ) {
                callback( this.status == 200 ? this.response : '' )
            }
        }

        xmlhttp.open('GET', src, true);
        xmlhttp.send();
    }

    readDataFile( images[index] );

})( '.svg' );