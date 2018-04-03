const express 		= require('express');
const http 			= require('http');
const https 		= require('https');
const path 			= require('path');
const nunjucks 		= require('nunjucks');
const bodyParser 	= require('body-parser');
const app 			= express();
const cors 			= require('cors');
const fs 			= require('fs');

const serverConfig = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem'),
};

app.use(cors());
app.options('*', cors());


global.__public = path.join(__dirname, '/public/');

app.set('view engine', 'html');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.static( __public ));
app.use('/temp_img', express.static(__dirname + '/public/assets'));
nunjucks.configure('views', {
	autoescape: true,
	express: app,
	noCache: true,
	watch: true
});

const index = require( './routes/index' );

app.use('/', index);

const server = https.createServer(serverConfig, app);
//const server = http.createServer(app);

var port = process.env.PORT || 3000;
server.listen(port, function() {
    console.log('listening on *:3000');
});

module.exports = app;