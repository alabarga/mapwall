const express 		= require('express');
const http 			= require('http');
const path 			= require('path');
const nunjucks 		= require('nunjucks');
const bodyParser 	= require('body-parser');
const app 			= express();
const cors 			= require('cors');

app.use(cors());
app.options('*', cors());


global.__public = path.join(__dirname, '/public/');

app.set('view engine', 'html');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.static( __public ));

nunjucks.configure('views', {
	autoescape: true,
	express: app,
	noCache: true,
	watch: true
});

const index = require( './routes/index' );

app.use('/', index);

const server = http.createServer( app );

server.listen(3000, function() {
    console.log('listening on *:3000');
});

module.exports = app;