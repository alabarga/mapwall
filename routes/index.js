const express   = require('express');
const router    = express.Router();
const jimp      = require('jimp');
const fs        = require('fs');

var googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyARNKILWOLm83HD1EDxTrVV0tjAhkCzHC8',
    language: 'ru',
    Promise: Promise
});

router.get('/', (request, response, next) => {
	response.render( 'index' );
});

router.get('/print', (request, response, next) => {
    response.render( 'print' );
});

router.get('/composite', (request, response, next) => {
    var map, lables;
    jimp.read(__public + 'assets/print_img/map.png')
        .then(function (result) {
            map = result;
            return jimp.read(__public + 'assets/print_img/lables.png')
        })
        .then(function (lables) {
            return map.composite(lables, 0, 942)
        })
        .then(function (image) {
            image.write(__public + 'assets/print_img/result.png');
        })
        .catch(function (err) {
            console.error(err);
        });
});

router.post('/print_map', (request, response, next) => {
    var result = {getURL: 'http:\/\/95.183.10.70:3000\/assets\/map.png'};
    result = JSON.stringify(result);
    response.send(result);
});

// Поиск координат на карте по городу
router.post('/search', (request, response, next) => {
    googleMapsClient.geocode({address: request.body.search}).asPromise()
        .then((data) => {
            var result = {};
            var json = data.json.results[0];
            result.title = json.address_components[0].long_name;
            for(let i = 0; i<=json.address_components.length-1; i++){
                 if(json.address_components[i].types[0] == 'country') result.country = json.address_components[i].long_name;
            }
            result.lat = json.geometry.location.lat;
            result.lng = json.geometry.location.lng;
            //console.log(JSON.stringify(json));
            response.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
});

// Сохранение временных изображений для сборки карты
router.post('/parse', (request, response, next) => {
    var url = request.body.image;
    var hash = request.body.hash;
    var name = url.substr(26);  // Обрезаем https://tiles.mapiful.com/
    name = 'assets/temp_img/' + hash + '/' + name;

    jimp.read(url).then(function (image){
        return image.write( __public + name );
    }).then(function (){
        response.send('done');
    }).catch(function (err) {
        console.error(err);
    });
});


// Сохранение и сборка изображений для печати
router.post('/save', (request, response, next) => {
    var hash = Math.random().toString(36).replace(/[^a-z]+/g, '');

    var map_src = request.body.map_src;
    var map_data = map_src.replace(/^data:image\/\w+;base64,/, "");
    var map_buffer = new Buffer(map_data, 'base64');
    fs.writeFile( __public + 'assets/print_img/'+hash+'_map.png', map_buffer, function(error) {
        if (error) throw error;
    })


    var labels_src = request.body.labels_src;
    var labels_data = labels_src.replace(/^data:image\/\w+;base64,/, "");
    var labels_buffer = new Buffer(labels_data, 'base64');
    fs.writeFile( __public + 'assets/print_img/'+hash+'_lables.png', labels_buffer, function(error) {
        if (error) throw error;
    })


    response.send('done');
});

module.exports = router;