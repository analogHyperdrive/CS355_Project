var mysql = require('mysql');
var db = require('./db_connection.js');

var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM player_character;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getMains = function(callback) {
    var query = 'SELECT * FROM player_character WHERE character_id = main_id;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getInfo = function(character_id, callback) {
    var query = 'SELECT * FROM character_view WHERE character_id = ?;';
    var queryData = [character_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.getClasses = function(character_id, callback) {
    var query = 'SELECT * FROM character_class_view WHERE character_id = ?;';
    var queryData = [character_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.getClassInfo = function(character_id, callback) {
    var query = 'CALL character_getinfo(?);';
    var queryData = [character_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.getIntrests = function(character_id, callback) {
    var query = 'SELECT * FROM character_intrest_view WHERE character_id = ?;';
    var queryData = [character_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.getClassAll = function(callback) {
    var query = 'SELECT * FROM class_list;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback) {
    var query = 'INSERT INTO player_character (first_name, last_name, story_completion, rank_id) VALUES (?, ?, ?, ?);';
    var queryData = [params.first_name, params.last_name, params.msq_complete, params.rank_id];

    connection.query(query, queryData, function(err, result) {
        if (err) {
            callback(err, result);
        } else {
            var character_id = result.insertId;
            var query = 'UPDATE player_character SET main_id = ? WHERE character_id = ?;';
            if (params.main_id === "MAIN") {
                var queryData = [character_id, character_id];
            } else {
                var queryData = [params.main_id, character_id];
            }
            connection.query(query, queryData, function (err, result) {
                if (err) {
                    callback(err, result);
                } else {
                    var query = 'INSERT INTO character_class (character_id, class_list_id, class_level) VALUES ?;';
                    var characterClassData = [];
                    if (params.class_id.constructor === Array) {
                        for (var j = 0; j < params.class_id.length; j++) {
                            if (params.class_level[j] !== "") {
                                characterClassData.push(
                                    [character_id, params.class_id[j], params.class_level[j]])
                            }
                        }
                    } else {
                        characterClassData.push(
                            [character_id, params.class_id, params.class_level]);
                    }
                    connection.query(query, [characterClassData], function (err, result) {
                        callback(err, result);
                    })
                }
            })
        }
    })
};

exports.updatebase = function(params, callback) {
    var query = 'UPDATE player_character SET first_name = ?, last_name = ?, main_id = ? WHERE character_id = ?;';
    var queryData = [params.first_name, params.last_name, params.main_id, params.character_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.updatestory = function(params, callback) {
    var query = 'UPDATE player_character SET story_completion = ? WHERE character_id = ?;';
    var queryData = [params.msq_complete, params.character_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.updaterank = function(params, callback) {
    var query = 'UPDATE player_character SET rank_id = ? WHERE character_id = ?;';
    var queryData = [params.rank_id, params.character_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.updatenote = function(params, callback) {
    var query = 'UPDATE player_character SET note = ? WHERE character_id = ?;';
    var queryData = [params.note, params.character_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

var characterClassInsert = function(character_id, classIdArray, classLevelArray, callback){
    var query = 'INSERT INTO character_class (character_id, class_list_id, class_level) VALUES ?';

    var characterClassData = [];
    if (classIdArray.constructor === Array) {
        for (var i = 0; i < classIdArray.length; i++) {
            if (classLevelArray[i] !== '') {
                characterClassData.push([character_id, classIdArray[i], classLevelArray[i]]);
            }
        }
    }
    else {
        if (classLevelArray !== '') {
            characterClassData.push([character_id, classIdArray, classLevelArray]);
        }
    }
    connection.query(query, [characterClassData], function(err, result){
        callback(err, result);
    });
};

exports.updateClass = function(params, callback) {
    var query = 'CALL character_class_delete(?)';

    connection.query(query, params.character_id, function (err, result) {
        if(err) {
            callback(err, result);
        } else {
            characterClassInsert(params.character_id, params.class_id, params.class_level, callback);
        }
    });
};