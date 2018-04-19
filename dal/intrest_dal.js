var mysql = require('mysql');
var db = require('./db_connection.js');

var connection = mysql.createConnection(db.config);

exports.getInfo = function(intrest_id, callback) {
    var query = 'SELECT * FROM intrests WHERE intrest_id = ?;';
    var queryData = [intrest_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.updateIntrest = function(params, callback) {
    var query = 'UPDATE intrests SET description = ? WHERE intrest_id = ?;';
    var queryData = [params.intrest_description, params.intrest_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.insertIntrest = function(params, callback) {
    var query = 'INSERT INTO intrests (description, character_id) VALUES (?, ?);';
    var queryData = [params.intrest_description, params.character_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};