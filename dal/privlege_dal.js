var mysql = require('mysql');
var db = require('./db_connection.js');

var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM privlege;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback) {
    var query = 'INSERT INTO privlege (privlege_name) VALUES (?);';
    var queryData = [params.name];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};
