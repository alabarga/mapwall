const express   = require('express');
const router    = express.Router();
const jimp      = require('jimp');
const fs        = require('fs');
var   rimraf    = require('rimraf');

if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}


var googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyARNKILWOLm83HD1EDxTrVV0tjAhkCzHC8',
    language: 'ru',
    Promise: Promise
});

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

router.get('/', (request, response, next) => {
    //showMemoryUsage();
    //setInterval(showMemoryUsage, 1000);
    response.render('index');
});

router.get('/cart', (request, response, next) => {
    var data = JSON.parse(localStorage.getItem(request.query.hash));
    console.log(data);
    response.render('cart', data);
});

router.get('/print', (request, response, next) => {
    if(request.query.hash){
        var data = JSON.parse(localStorage.getItem(request.query.hash));
        console.log(data);
        response.render('print', data);
    }else{
        response.render('index');
    }

});

router.get('/test', (request, response, next) => {

});

/*router.post('/print_map', (request, response, next) => {
    var result = {getURL: 'http:\/\/95.183.10.70:3000\/assets\/map.png'};
    result = JSON.stringify(result);
    response.send(result);
});*/

router.post('/config', (request, response, next) => {
    var data = JSON.stringify(request.body);
    var hash = '"' + request.body.hash + '"';
    localStorage.setItem(hash, data);
    response.send(hash);
});

// Поиск координат на карте по городу
router.post('/search', (request, response, next) => {
    console.log(request.body.search);
    if(request.body.search){
        googleMapsClient.geocode({
            address: request.body.search
        }).asPromise()
            .then((data) => {
                var result = {};
                var json = data.json.results[0];
                result.title = json.address_components[0].long_name;
                for (let i = 0; i <= json.address_components.length - 1; i++) {
                    if (json.address_components[i].types[0] == 'country') result.country = json.address_components[i].long_name;
                }
                result.lat = json.geometry.location.lat;
                result.lng = json.geometry.location.lng;
                response.send(result);
            })
            .catch((err) => {
                console.log(err);
            });
    }
});

// Сохранение временных изображений для сборки карты
router.post('/parse', (request, response, next) => {
    console.log(request.body);
    var data = JSON.parse(request.body.data);
    var hash = data.hash;
    var res = [];
    var img = JSON.parse(request.body.img);
    for(let key in img){
        var name = img[key].split('/').join('_');
        var url  = 'https://tiles.mapiful.com/' + data.style + '/' + data.zoom + '/' + img[key];
        var new_name = __public + 'assets/temp_img/' + hash + '_' + data.style + '_' + data.zoom + '_' + name;
        res.push(new_name);
        saveImg(url, new_name);
    }

    response.send('done');
});


// Сохранение и сборка изображений для печати
router.post('/save', (request, response, next) => {

    console.log('save');
    var hash = request.body.hash;

    var map_src = request.body.map_src;
    var map_data = map_src.replace(/^data:image\/\w+;base64,/, "");
    var map_buffer = new Buffer(map_data, 'base64');

    var labels_src = request.body.labels_src;
    var labels_data = labels_src.replace(/^data:image\/\w+;base64,/, "");
    var labels_buffer = new Buffer(labels_data, 'base64');

    jimp.read(map_buffer)
        .then(function (result) {
            map = result;
            return jimp.read(labels_buffer)
        })
        .then(function (lables) {
            lables.resize(map.bitmap.width, map.bitmap.height);
            return map.composite(lables, 0, 0)
        })
        .then(function (image) {
            image.write(__public + 'assets/print_img/' + hash + '.png');
            rimraf(__public + 'assets/temp_img/*', function () { console.log('remove temp done'); });
        })
        .catch(function (err) {
            console.log(err);
        });

    response.send('done');
});

function showMemoryUsage() {
    console.log("Process: %s - %s MB ", new Date(), process.memoryUsage().rss / 1048576, process.memoryUsage());
}

function saveImg(url, name){
    jimp.read(url).then(function (image) {
        console.log('write: ', name);
        image.write(name);
    }).catch(function (err) {
        console.error(err);
    });
}

module.exports = router;
