$(document).ready(function(){
    $('form.config').on('submit', function(e) {
        e.preventDefault();
    })

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


    /*=====================   SEARCH   =======================*/
    $('#search').change(function(){
        var search = this.value;
        $.post('search', {search: $.trim(search)}, res => {
            var zoom = map.getZoom();

            mapInit('mono', res.lat, res.lng, zoom);

            $('.city').text(res.title);
            $('#map_city').val(res.title);

            $('.country span').text(res.country);
            $('#map_country').val(res.country);

            $('.subtitle').text(res.lat + ' / ' + res.lng);
            $('#map_subtitle').val(res.lat + ' / ' + res.lng);
        })
    });


    /*===================== MAP INIT =========================*/
    
    const mapMinZoom = 1;
    const mapMaxZoom = 20;

    var map = L.map('map', {
        maxZoom: mapMaxZoom,
        minZoom: mapMinZoom
    });

    mapInit('mono', 0, 0, 0);
    function mapInit(style, lat, lng, zoom){
        
        var layer = 'https://tiles.mapiful.com/'+style+'/{z}/{x}/{y}.png';
        
        L.tileLayer(layer, {
            minZoom: mapMinZoom,
            maxZoom: mapMaxZoom
        }).addTo( map );

        map.setView([lat, lng], zoom);
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

