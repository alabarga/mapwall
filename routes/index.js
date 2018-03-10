const express   = require( 'express' );
const merge     = require( 'merge-img' );
const fs        = require( 'fs' );
const router    = express.Router();

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
    // const images = request.body.images;
    //
    // let object = {}
    // let array  = []
    //
    // for (let i = 0; i < images.length; i++) {
    //     let data = images[i].split( '/' );
    //     let y = data.pop().split( '.' ).shift()
    //     let x = data.pop()
    //
    //     if ( Array.isArray( object[x] ) ) {
    //         object[x].push( images[i] )
    //     } else {
    //         object[x] = [images[i]]
    //     }
    //
    // }
    //
    // let length = 0;
    //
    // for (const key in object) {
    //     array.push( key + '.png' )
    //
    //     merge(object[key], {direction: true}).then(image => {
    //         image.write(key + '.png', () => {
    //
    //             length++
    //
    //             console.log('Done: ' + length)
    //
    //             if ( Object.keys( object ).length == length ) {
    //                 console.log('stop')
    //
    //                 merge( array ).then(image => {
    //                     image.write(__public + 'output.png', () => {
    //                         console.log( 'complete!' )
    //
    //                         for (let i = 0; i < array.length; i++) fs.unlink(array[i], () => console.log( 'Removed: ' + i ))
    //                     })
    //                 })
    //             }
    //         })
    //     })
    // }

	//response.send( request.body.images );
	response.send( request.body );
});


module.exports = router;