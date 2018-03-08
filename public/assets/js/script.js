$(document).ready(function(){
    /*=================== TEXT on MAP =======================*/
    $('#map_city').keyup(function() {
        $('.city').text(this.value);        
    });
    $('#map_city').change(function(){
        $('.city').text(this.value);
    });
    $('#map_country').keyup(function() {
        $('.country span').text(this.value);
    });
    $('#map_country').change(function(){
        $('.country span').text(this.value);
    });
    $('#map_subtitle').keyup(function() {
        $('.subtitle').text(this.value);
    });
    $('#map_subtitle').change(function(){
        $('.subtitle').text(this.value);
    });

    /*===================== MAP INIT =========================*/
    
    const mapMinZoom = 1;
    const mapMaxZoom = 20;

    var map = L.map('map', {
        maxZoom: mapMaxZoom,
        minZoom: mapMinZoom
    });

    mapInit('mono');
    function mapInit(style){      
        
        var layer = 'https://tiles.mapiful.com/'+style+'/{z}/{x}/{y}.png';
        
        L.tileLayer(layer, {
            minZoom: mapMinZoom,
            maxZoom: mapMaxZoom
        }).addTo( map );

        map.setView([0, 0], 0);
    }

    
    $('#modern').on('click', function(){
        mapInit('mono');
    })

    $('#asphalt').on('click', function(){
        mapInit('asphalt');
    })

    $('#blue').on('click', function(){
        mapInit('blue');
    })

    $('#nautical').on('click', function(){
        mapInit('oldschool');
    })

    $('#pantone').on('click', function(){
        mapInit('mono');
    })


    
})

