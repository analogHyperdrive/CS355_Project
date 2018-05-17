var mysql = require('mysql');
var db = require('./db_connection.js');

var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM class_list;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getClass = function(class_id, callback) {
    var query = 'SELECT * FROM class_list WHERE class_id = ?;';
    var queryData = [class_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.update = function(params, callback) {
    var query = 'UPDATE class_list SET class_name = ?, class_acronym = ?, class_role = ? WHERE class_id = ?;';
    var queryData = [params.class_name, params.class_acronym, params.class_role, params.class_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback) {
    var query = 'INSERT INTO class_list (class_name, class_acronym, class_role) VALUES (?, ?, ?);';
    var queryData = [params.name, params.acronym, params.role];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.delete = function(class_id, callback) {
    var query = 'DELETE FROM class_list WHERE class_id = ?;';
    var queryData = [class_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};