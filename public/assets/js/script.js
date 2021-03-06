$(document).ready(function () {
    var hash = Math.random().toString(36).replace(/[^a-z]+/g, '');

    $('.config').on('submit', function (e) {
        e.preventDefault();
    })

    /*=================== TEXT on MAP =======================*/
    $('#map_city').keyup(function () {
        $('.city').text(this.value);
    });
    $('#map_city').change(function () {
        $('.city').text(this.value);
    });
    $('#map_country').keyup(function () {
        $('.country span').text(this.value);
    });
    $('#map_country').change(function () {
        $('.country span').text(this.value);
    });
    $('#map_subtitle').keyup(function () {
        $('.subtitle').text(this.value);
    });
    $('#map_subtitle').change(function () {
        $('.subtitle').text(this.value);
    });


    /*=====================   SEARCH   =======================*/
    $('#search').change(function () {
        var search = this.value;


        $.post('https://195.133.197.218:3000/search', {
            search: $.trim(search)
        }, res => {
            var zoom = map.getZoom();
            var style = $('.map_style:checked').val();
            if (zoom < 12) zoom = 12;
            mapInit(style, res.lat, res.lng, zoom);

            $('.city').text(res.title);
            $('#map_city').val(res.title);

            $('.country span').text(res.country);
            $('#map_country').val(res.country);

            var lat = String(res.lat);
            var lng = String(res.lng);
            lat = lat.substring(0, 6);
            lng = lng.substring(0, 6);

            $('.subtitle').text(lat + ' / ' + lng);
            $('#map_subtitle').val(lat + ' / ' + lng);
        })

    });


    /*===================== MAP INIT =========================*/
    const mapMinZoom = 4;
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
    map.scrollWheelZoom.disable()

    function mapInit(style, lat, lng, zoom) {
        $('.leaflet-tile-pane').empty();
        map.eachLayer(function (layer) {
            map.removeLayer(layer);
        });

        var layer = 'https://tiles.mapiful.com/' + style + '/{z}/{x}/{y}.png';
        L.tileLayer(layer, {
            minZoom: mapMinZoom,
            maxZoom: mapMaxZoom
        }).addTo(map);

        if (lat != undefined && lng != undefined && zoom != undefined) map.setView([lat, lng], zoom);
    }

    /*
    $(".nav-item.s2").click(function () {

        function mapInit(style, lat, lng, zoom) {
            $('.leaflet-tile-pane').empty();
            map.eachLayer(function (layer) {
                map.removeLayer(layer);
            });

            var layer = 'https://tiles.mapiful.com/' + style + '/{z}/{x}/{y}.png';
            L.tileLayer(layer, {
                minZoom: mapMinZoom,
                maxZoom: mapMaxZoom
            }).addTo(map);

            if (lat != undefined && lng != undefined && zoom != undefined) map.setView([lat, lng], zoom);
        }

    });
    */

    $('#add_cart').on('click', function(){
        var size =$('.size_block .print_size:checked').attr('data-size');
        var coord = map.getCenter();
        var data = {
            hash: hash,
            city: $('.city').text(),
            country: $('.country span').text(),
            subtitle: $('.subtitle').text(),
            size: size,
            lat: coord.lat,
            lng: coord.lng,
            zoom: map.getZoom(),
            style: $('.map_style:checked').val(),
            price: $('.price_value').text()
        }

        $.ajax({
            type: 'post',
            async: false,
            url: '/config',
            data: data,
            success: function (res) {
                location.href = '/print?hash='+res;
            }
        })
    })

    $('#print').on('click', function(){
        var lat = $('#lat').val();
        var lng = $('#lng').val();
        var zoom = $('#zoom').val();
        var style = $('#style').val();
        mapInit(style, lat, lng, zoom);

    })


    $('.test_print').on('click', function () {
        hash = Math.random().toString(36).replace(/[^a-z]+/g, '');
        localStorage.setItem('hash', hash);
        var src = $('.leaflet-tile-container img').attr('src');
        src = src.split('/'); // ["https:", "", "tiles.mapiful.com", "mono", "6", "33", "25.png"]
        var style = src[3];
        var zoom = src[4];
        var imgs = [];
        $('.leaflet-tile-container img').each(function (i) {
            src = this.src;
            src = src.split('/');
            imgs.push(src[5]+'/'+src[6]);
        });

        var data = {};
        data.hash = hash;
        data.style = style;
        data.zoom = zoom;
        data = JSON.stringify(data);
        imgs = JSON.stringify(imgs);
        $.ajax({
            type: 'post',
            async: false,
            url: 'https://195.133.197.218:3000/parse',
            data: {
                data: data,
                img: imgs
            },
            success: function (res) {
                setTimeout(function(){
                    buildImg(map);
                }, 40000);
            }
        })
        console.log(data);
    })

    /*===================== BUILD IMG =========================*/
    function buildImg(map) {
        leafletImage(map, function (err, canvas) {
            try {
                console.log(canvas);
                var img = document.createElement('img');
                var orientation = $('input.orientation:checked').val();
                
                img.width = 1984;
                if(orientation == 'vertical') img.height = 2835;
                if(orientation == 'horizontal') img.height = 1417;
                
                console.log('width: ', img.width, 'height: ', img.height);

                img.src = canvas.toDataURL();
                var map_src = img.src;

                var labels = document.getElementById('frame');
                labels.style.width = img.width;
                labels.style.position = 'relative';
            } catch (err) {
                console.error('buildImg(map) error: ', err);
            }

            domtoimage.toPng(labels)
                .then(function (labels_src) {
                    console.log(labels_src);
                    labels.style.position = 'absolute';
                    $.ajax({
                        type: 'post',
                        async: false,
                        url: 'https://195.133.197.218:3000/save',
                        data: {
                            map_src: map_src,
                            labels_src: labels_src,
                            hash: hash
                        },
                        success: function (res) {
                            console.log('save: ', res);
                            alert('saved');
                        }
                    })
                })
                .catch(function (error) {
                    console.error('domtoimage.toPng(labels) error: ', error);
                });
        });
    }
   
    /*===================== CHANGE STYLE =========================*/
    $('.map_style').on('click', function () {
        mapInit(this.value);
    })
});


