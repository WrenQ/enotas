var express = require('express'),
	http	= require('http'),
	path	= require('path'),
	app 	= express();


app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

//development only
if('development' == app.get('env')) {
	app.use(express.errorHandler());
}

require('./routes')(app);

http.createServer(app).listen(app.get('port'), function() {
	console.log('Servidor Express escuchando en puerto ' + app.get('port'));
});