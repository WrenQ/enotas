
var usuarioModel = require('../models/usuario'),
	notaModel	 = require('../models/nota');

module.exports = function(app) {
	app.get('/', function (req, res) {
		res.render('index', {titulo: 'Bienvenido a eNotas'});
	});
};