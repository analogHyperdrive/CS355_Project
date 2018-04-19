var express = require('express');
var router = express.Router();
var rank_dal = require('../dal/rank_dal');
var privlege_dal = require('../dal/privlege_dal');

router.get('/all', function(req, res) {
    rank_dal.getAll(function(err, result) {
        if (err) {
            res.send(err);
        } else {
            res.render('rank/rank_view_all', {result:result});
        }
    })
});

router.get('/view', function(req, res) {
    rank_dal.getInfo(req.query.rank_id, function(err,result) {
        if (err) {
            res.send(err);
        } else {
            res.render('rank/rank_view', {
                privlege_result: result[1],
                rank_result: result[0][0]
            });
        }
    })
});

router.get('/add', function(req, res) {
    privlege_dal.getAll(function(err, result) {
        if (err) {
            res.send(err);
        } else {
            res.render('rank/rank_add', {privlege_result:result});
        }
    })
});

router.get('/insert', function(req, res) {
    rank_dal.insert(req.query, function(err, result) {
        res.redirect('/rank/all');
    });
});

module.exports = router;