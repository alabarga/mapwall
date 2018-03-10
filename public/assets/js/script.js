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
            var style = $('.map_style:checked').val();
            mapInit(style, res.lat, res.lng, zoom);

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
        maxBoundsViscosity: 1.0,
        preferCanvas: true
    });

    var southWest = L.latLng(-89.98155760646617, -180);
    var northEast = L.latLng(89.99346179538875, 180);
    var bounds = L.latLngBounds(southWest, northEast);
    map.setMaxBounds(bounds);

    var style = $('.map_style:checked').val();
    mapInit(style, 0, 0, 0);
    function mapInit(style, lat, lng, zoom){
        $('.leaflet-tile-pane').empty();
        map.eachLayer(function(layer){
            map.removeLayer(layer);
        });

        var layer = 'https://tiles.mapiful.com/'+style+'/{z}/{x}/{y}.png';
        L.tileLayer(layer, {
            minZoom: mapMinZoom,
            maxZoom: mapMaxZoom
        }).addTo( map );

        if(lat != undefined && lng != undefined && zoom !=undefined) map.setView([lat, lng], zoom);
    }

    $('#add_cart').on('click', function(){
        var ajax_count = 0;
        var img_count = $('.leaflet-tile-container img').length;
        var hash = Math.random().toString(36).replace(/[^a-z]+/g, '');
        localStorage.setItem('hash', hash);
        $('.leaflet-tile-container img').each(function(i){
            $.post('parse', {image: this.src, hash: hash}, res => {
                if(res =='done') ajax_count++;
                if(ajax_count == img_count) buildImg(map);
            });
        });
    })

    /*===================== BUILD IMG =========================*/
    function buildImg(map){
        leafletImage(map, function(err, canvas) {
            console.log(map.getSize());

            var img = document.createElement('img');
            var dimensions = $('.print_size:checked').val();
            dimensions = dimensions.split('/');
            img.width = dimensions[0];
            img.height = dimensions[1];

            img.src = canvas.toDataURL();
            document.getElementById('images').innerHTML = '';
            document.getElementById('images').appendChild(img);
        });
    }

    /*===================== CHANGE STYLE =========================*/
    $('.map_style').on('click', function(){
        mapInit(this.value);
    })
})

