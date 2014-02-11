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
var notaModel = {};



notaModel.listaNotasEscritas = function (login, callback) {
    client.query('SELECT * FROM nota WHERE autor = $1', [login], function (error, results) {
        if (error) {
            console.log(error);
        } else {
            console.log(results.rows);
            callback(null, results.rows);
        }
    });
};

notaModel.listaNotasRecibidas = function (login, callback) {
    client.query('SELECT * FROM nota WHERE para = $1', [login], function (error, results) {
        if (error) {
            console.log(error);
        } else {
            console.log(results.rows);
            callback(null, results.rows);
        }
    });
};

notaModel.listaNotasModificables = function (login, callback) {
    client.query('SELECT * FROM nota WHERE autor = $1 AND (fechaAgenda - CURRENT_DATE) >= 1', [login], function (error, results) {
        if (error) {
            console.log(error);
        } else {
            console.log(results.rows);
            callback(null, results.rows);
        }
    });
};

notaModel.nuevaNota = function (login, titulo, contenido, para, agenda, callback) {
    client.query('INSERT INTO nota (autor, titulo, contenido, para, fechaAgenda) VALUES ($1, $2, $3, $4)', [login, titulo, contenido, para, agenda], function (error, results) {
        if (error) {
            console.log(error);
        } else {
            console.log(results.rows);
            callback(null, results.rows);
        }
    });
};

notaModel.editarNota = function (idNota, titulo, contenido, callback) {
    client.query('UPDATE nota SET titutlo = $1, contenido = $2 WHERE id = $3', [titulo, contenido, idNota], function (error, results) {
        if (error){
            console.log(error);
        } else {
            console.log(results.rows);
            callback(null, results.rows);
        }
    });
};







//exportamos el objeto para tenerlo disponible en la zona de rutas
module.exports = notaModel;