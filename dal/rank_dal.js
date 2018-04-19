var mysql = require('mysql');
var db = require('./db_connection.js');

var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM rank;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getInfo = function(rank_id, callback) {
    var query = 'CALL rank_getinfo(?)';

    connection.query(query, rank_id, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback) {

    // First insert the company
    var query = 'INSERT INTO rank (rank_name) VALUES (?)';

    var queryData = [params.name];

    connection.query(query, queryData, function(err, result) {
        if(err || params.privlege_id === undefined) {
            callback(err, result);
        } else {
            var rank_id =  result.insertId;
            var query = 'INSERT INTO rank_privlege (rank_id, privlege_id) VALUES ?';
            var rankPrivlegeData = [];
            if (params.privlege_id.constructor === Array) {
                for (var i = 0; i < params.privlege_id.length; i++) {
                    rankPrivlegeData.push(
                        [rank_id, params.privlege_id[i]]
                    );
                }
            }
            else {
                rankPrivlegeData.push(
                    [rank_id, params.privlege_id]);
            }
            connection.query(query, [rankPrivlegeData], function(err, result) {
                callback(err, result);
            });
        }
    });
};