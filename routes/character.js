var express = require('express');
var router = express.Router();
var character_dal = require('../dal/character_dal');
var rank_dal = require('../dal/rank_dal');
var intrest_dal = require('../dal/intrest_dal');

router.get('/all', function(req, res) {
    character_dal.getAll(function(err, result) {
        if (err) {
            res.send(err);
        } else {
            res.render('character/character_view_all', {result:result});
        }
    })
});

router.get('/view', function(req, res) {
    character_dal.getInfo(req.query.character_id, function(err,result1) {
        character_dal.getClasses(req.query.character_id, function(err,result2) {
            character_dal.getIntrests(req.query.character_id, function(err,result3) {
                character_dal.getInfo(result1[0].main_id, function(err,result4) {
                    if (err) {
                        res.send(err);
                    } else {
                        res.render('character/character_view', {
                            main_result: result4[0],
                            intrest_result: result3,
                            class_result: result2,
                            character_result: result1[0]
                        });
                    }
                });
            });
        });
    });
});

router.get('/add', function(req, res) {
    character_dal.getMains(function(err, result1) {
        rank_dal.getAll(function(err, result2) {
            character_dal.getClassAll(function (err, result3) {
                if (err) {
                    res.send(err);
                } else {
                    res.render('character/character_add', {
                        character_result: result1,
                        rank_result: result2,
                        class_result: result3
                    });
                }
            })
        })
    })
});

router.get('/insert', function(req, res) {
    character_dal.insert(req.query, function(err, result) {
        res.redirect('/character/all');
    });
});

router.get('/addintrest', function(req, res) {
    character_dal.getInfo(req.query.character_id, function(err,result) {
        if (err) {
            res.send(err);
        } else {
            res.render('intrests/intrest_add', {
                character_result: result[0]
            })
        }
    })
});

router.get('/insertintrest', function(req, res) {
    intrest_dal.insertIntrest(req.query, function(err, result) {
        res.redirect('/character/view/?character_id=' + res.req.query.character_id);
    });
});

router.get('/editbase', function(req, res) {
    character_dal.getMains(function(err, result1) {
        character_dal.getInfo(req.query.character_id, function(err,result2) {
            if (err) {
                res.send(err);
            } else {
                res.render('character/character_edit_name_main', {
                    character_result: result2[0],
                    main_result: result1[0]
                })
            }
        })
    })
});

router.get('/updatebase', function(req, res) {
    character_dal.updatebase(req.query, function(err, result) {
        res.redirect('/character/view/?character_id=' + res.req.query.character_id);
    });
});

router.get('/editrank', function(req, res) {
    character_dal.getInfo(req.query.character_id, function(err,result1) {
        rank_dal.getAll(function(err, result2) {
            if (err) {
                res.send(err);
            } else {
                res.render('character/character_edit_rank', {
                    character_result: result1[0],
                    rank_result: result2
                })
            }
        })
    })
});

router.get('/updaterank', function(req, res) {
    character_dal.updaterank(req.query, function(err, result) {
        res.redirect('/character/view/?character_id=' + res.req.query.character_id);
    });
});

router.get('/editstory', function(req, res) {
    character_dal.getInfo(req.query.character_id, function(err,result) {
        if (err) {
            res.send(err);
        } else {
            res.render('character/character_edit_story', {
                character_result: result[0]
            })
        }
    })
});

router.get('/updatestory', function(req, res) {
    character_dal.updatestory(req.query, function(err, result) {
        res.redirect('/character/view/?character_id=' + res.req.query.character_id);
    });
});

router.get('/editintrest', function(req, res) {
    character_dal.getInfo(req.query.character_id, function (err, result1) {
        intrest_dal.getInfo(req.query.intrest_id, function (err, result2) {
            if (err) {
                res.send(err);
            } else {
                res.render('intrests/intrest_edit', {
                    character_result: result1[0],
                    intrest_result: result2[0]
                })
            }
        })
    });
});

router.get('/updateintrest', function(req, res) {
    intrest_dal.updateIntrest(req.query, function(err, result) {
        res.redirect('/character/view/?character_id=' + res.req.query.character_id);
    });
});

router.get('/editclass', function(req, res) {
    character_dal.getClassInfo(req.query.character_id, function(err,result) {
        res.render('character/character_edit_class', {
            character_result:result[0][0],
            class_result: result[1]
        });
    });
});

router.get('/updateclass', function(req, res) {
    character_dal.updateClass(req.query, function(err, result) {
        res.redirect('/character/view/?character_id=' + res.req.query.character_id);
    });
});

router.get('/editnote', function(req, res) {
    character_dal.getInfo(req.query.character_id, function(err,result) {
        if (err) {
            res.send(err);
        } else {
            res.render('character/character_edit_note', {
                character_result: result[0]
            })
        }
    })
});

router.get('/updatenote', function(req, res) {
    character_dal.updatenote(req.query, function(err, result) {
        res.redirect('/character/view/?character_id=' + res.req.query.character_id);
    });
});

router.get('/delete', function(req, res) {
    character_dal.delete(req.query.character_id, function(err, result) {
        res.redirect('/character/all');
    })
});


module.exports = router;