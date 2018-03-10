const jimp = require( 'jimp' );
const fs = require( 'fs' );

class Parser {
    constructor () {}

    getImage (data) {
        console.log(data);
        jimp.read(data.url).then(function (image){
            console.log(image);
            return image.write( __public + data.name );
        }).catch(function (err) {
            console.error(err);
        });
    }

    clearTemp () {
        let dirname = __public + 'assets/temp_img/'

    }
}

module.exports = Parser;