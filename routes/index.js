const express   = require('express');
const router    = express.Router();
const jimp      = require( 'jimp' );

var googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyARNKILWOLm83HD1EDxTrVV0tjAhkCzHC8',
    language: 'ru',
    Promise: Promise
});

router.get('/', (request, response, next) => {
	response.render( 'index' );
});

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


module.exports = router;