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
        var url = 'https://api.mapwall.ru/search';
         /*
          xhr.open('POST', url, true);
          // замена onreadystatechange
          xhr.onload = function() {
              document.getElementById('response').innerHTML = xhr.responseText
          }
          xhr.onerror = function() {
              alert("Error")
          }
          xhr.send(search)*/



        $.post('/search', {
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

            $('.subtitle').text(res.lat + ' / ' + res.lng);
            $('#map_subtitle').val(res.lat + ' / ' + res.lng);
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
        var ajax_count = 0;
        var img_count = $('.leaflet-tile-container img').length;
        localStorage.setItem('hash', hash);
        $('.leaflet-tile-container img').each(function (i) {
            $.ajax({
                type: 'post',
                async: false,
                url: '/parse',
                data: {
                    image: this.src,
                    hash: hash
                },
                success: function (res) {
                    if (res == 'done') ajax_count++;
                    if (ajax_count == img_count) buildImg(map);
                }
            })
        });
    })

    /*===================== BUILD IMG =========================*/
    function buildImg(map) {
        leafletImage(map, function (err, canvas) {
            try {
                console.log(canvas);
                var img = document.createElement('img');
                var dimensions = $('.print_size:checked').val();
                dimensions = dimensions.split('/');
                img.width = dimensions[0];
                img.height = dimensions[1];
                img.src = canvas.toDataURL();
                var map_src = img.src;
                // document.getElementById('images').innerHTML = '';
                // document.getElementById('images').appendChild(img);

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
                    $.post('save', {
                        map_src: map_src,
                        labels_src: labels_src,
                        hash: hash
                    }, res => {
                        console.log('save: ', res);
                        alert('saved');
                    });
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


