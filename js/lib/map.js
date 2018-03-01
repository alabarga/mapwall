;(function ( exports ) {

	// Styles
    const styles = {}
    

    // Default UI
    const zoom = document.createElement( 'div' );
    zoom.classList.add( 'zoom' );

    const zin  = document.createElement( 'div' );
    zin.classList.add( 'zoom-in' );

    const zout = document.createElement( 'div' );
    zout.classList.add( 'zoom-out' );

    zoom.appendChild( zin );
    zoom.appendChild( zout );


	// Render Map
    const GeoMap = ( element ) => {
        // Container
        const container = document.querySelector( element );
        const draggable  = document.createElement( 'div' );
        draggable.classList.add( 'draggable' );

        if ( !container ) return;

        container.parentNode.appendChild( zoom );

        // Default Settings
        let def = {
			zoom: 13,
			style: 'modern'
		}

        // Options
        const options = {
            center: new google.maps.LatLng(53.90453979999999, 27.5615244),
            zoom: def.zoom,
            disableDefaultUI: true
        }

        // Create Map
        const map = new google.maps.Map(container, options);

        // Event Zoom
        google.maps.event.addDomListener(zin, 'click', () => {
            scaleMap(map.getZoom() + 1, map)
        });
         
        google.maps.event.addDomListener(zout, 'click', () => {
            scaleMap(map.getZoom() - 1, map)
        });
        
		// Default Style Map
		JSONLoader(def.style, map, () => {
            container.parentNode.classList.add( 'loading' );
        });

        return map;
    }
    

    // Scale Map
    const scaleMap = (value, target) => {
        zin.classList[value  >= 15 ? 'add' : 'remove']( 'disabled' );
        zout.classList[value <= 10 ? 'add' : 'remove']( 'disabled' );
        target.setZoom(value <= 10 ? 10 : value >= 15 ? 15 : value)
    }


	// Loader
	const JSONLoader = (name, target, func) => {
		$.get('json/' + name + '.json', ( response ) => {
			styles[name] = response;

			try {
                var object = new google.maps.StyledMapType( styles[name] );
			} catch ( error ) {
				console.error( 'Syntax Error' )
			}

			target.mapTypes.set(name, object);
			target.setMapTypeId( name );

			func();
		})
    }

    exports.GeoMap = GeoMap;
})( this );