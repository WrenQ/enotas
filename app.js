var express = require('express'),
	user    = require('./routes/user'),
	http	= require('http'),
	path	= require('path'),
	app 	= express();


app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
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