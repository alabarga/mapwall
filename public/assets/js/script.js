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
        minZoom: mapMinZoom,
        preferCanvas: true
    });

    mapInit('mono', 0, 0, 0);
    function mapInit(style, lat, lng, zoom){
        $('.leaflet-tile-pane').empty();
        var layer = 'https://tiles.mapiful.com/'+style+'/{z}/{x}/{y}.png';

        L.tileLayer(layer, {
            minZoom: mapMinZoom,
            maxZoom: mapMaxZoom
        }).addTo( map );
        map.setView([lat, lng], zoom);
    }

    $('#add_cart').on('click', function(){
        $('.leaflet-tile-container img').each(function(i){
            $.post('parse', {image: this.src});
        });
        buildImg(map);
    })

    /*===================== BUILD IMG =========================*/
    function buildImg(map){
        leafletImage(map, function(err, canvas) {
            console.log(map.getSize());

            var img = document.createElement('img');
            var dimensions = map.getSize();
            img.width = dimensions.x;
            img.height = dimensions.y;
            img.src = canvas.toDataURL();
            document.getElementById('images').innerHTML = '';
            document.getElementById('images').appendChild(img);
        });
    }

    /*===================== CHANGE STYLE =========================*/

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

