var mysql = require('mysql');
var db = require('./db_connection.js');

var connection = mysql.createConnection(db.config);

exports.query1 = function(callback) {
    var query = 'CALL query1()';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.query2 = function(callback) {
    var query = 'CALL query2()';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.query3 = function(callback) {
    var query = 'CALL query3()';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.query4 = function(callback) {
    var query = 'CALL query4()';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.query5 = function(callback) {
    var query = 'CALL query5()';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.query6 = function(callback) {
    var query = 'CALL query6()';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.query7 = function(callback) {
    var query = 'CALL query7()';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.query8 = function(callback) {
    var query = 'CALL query8()';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.query9 = function(callback) {
    var query = 'CALL query9()';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.query10 = function(callback) {
    var query = 'CALL query10()';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};