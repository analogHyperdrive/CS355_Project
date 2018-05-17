var express = require('express');
var router = express.Router();
var privlege_dal = require('../dal/privlege_dal');

router.get('/all', function(req, res) {
    privlege_dal.getAll(function(err, result) {
        if (err) {
            res.send(err);
        } else {
            res.render('privlege/privlege_view_all', {result:result});
        }
    })
});

router.get('/add', function(req, res) {
    res.render('privlege/privlege_add');
});

router.get('/insert', function(req, res) {
    privlege_dal.insert(req.query, function(err, result) {
        res.redirect('/privlege/all');
    });
});

router.get('/edit', function(req, res) {
    privlege_dal.getPrivlege(req.query.privlege_id, function(err, result) {
        res.render('privlege/privlege_edit', {result:result[0]});
    });
});

router.get('/update', function(req, res) {
    privlege_dal.update(req.query, function(err, result) {
        res.redirect('/privlege/all');
    });
});

router.get('/delete', function(req, res) {
    privlege_dal.delete(req.query.privlege_id, function(err, result) {
        res.redirect('/privlege/all');
    });
});

module.exports = router;