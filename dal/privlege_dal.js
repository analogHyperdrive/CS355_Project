var mysql = require('mysql');
var db = require('./db_connection.js');

var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM privlege;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getPrivlege = function(privlege_id, callback) {
    var query = 'SELECT * FROM privlege WHERE privlege_id = ?;';
    var queryData = [privlege_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.update = function(params, callback) {
    var query = 'UPDATE privlege SET privlege_name = ? WHERE privlege_id = ?;';
    var queryData = [params.privlege_name, params.privlege_id];

    connection.query(query, queryData, function(err, result) {
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

exports.delete = function(privlege_id, callback) {
    var query = 'DELETE FROM privlege WHERE privlege_id = ?;';
    var queryData = [privlege_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};