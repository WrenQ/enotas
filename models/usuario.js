//llamada al paquete mysql
var pg = require('pg'),
    conString = "postgres://nokfrtoymdfpmj:ec2-54-247-112-183.eu-west-1.compute.amazonaws.com:5432/d4e3nt1l3m758i",
    client = new pg.Client(conString);
//Nos conectamos a la Base de Datos
client.connect();
client.query('set schema \'public\'', function (err) {
    if (err) {
        console.log(err);
    }
});
//creamos un objeto para ir almacenando todo lo que necesitemos
var usuarioModel = {};



usuarioModel.listaUsuarios = function (callback) {
    client.query('SELECT * FROM usuario', function (error, results) {
        if (error) {
            console.log(error);
        } else {
            console.log(results.rows);
            callback(null, results.rows);
        }
    });
};

usuarioModel.getUsuario = function (login, pass, callback) {
    client.query('SELECT * FROM usuario WHERE login = $1 AND pass = $2', [login, pass], function (err, results) {
        if(error) {
            console.log(error);
        } else {
            console.log(results.rows);
            callback(null, results.rows);
        }
    });
};

usuarioModel.nuevoUsuario = function (login, pass, nombre, email, callback) {
    client.query('INSERT INTO usuario VALUES ($1, $2, $3, $4)', [login, pass, nombre, email], function (err, results) {
        if(error){
            console.log(error);
        } else {
            console.log(results.rows);
            callback(null, results.rows);
        }
    });
};

usuarioModel.editarUsuario = function (id, pass, nombre, email, callback) {
    client.query('UPDATE usuario SET pass = $1, nombre = $2, email = $3 WHERE login = $4', [pass, nombre, email, id], function (err, results) {
        if(error){
            console.log(error);
        } else {
            console.log(results.rows);
            callback(null, results.rows);
        }
    });
};


//exportamos el objeto para tenerlo disponible en la zona de rutas
module.exports = usuarioModel;