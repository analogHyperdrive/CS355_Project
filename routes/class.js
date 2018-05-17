var express = require('express');
var router = express.Router();
var class_dal = require('../dal/class_dal');

router.get('/all', function(req, res) {
    class_dal.getAll(function(err, result) {
        if (err) {
            res.send(err);
        } else {
            res.render('class/class_view_all', {result:result});
        }
    })
});

router.get('/add', function(req, res) {
    res.render('class/class_add');
});

router.get('/insert', function(req, res) {
    class_dal.insert(req.query, function(err, result) {
        res.redirect('/class/all');
    });
});

router.get('/edit', function(req, res) {
    class_dal.getClass(req.query.class_id, function(err, result) {
        res.render('class/class_edit', {result:result[0]});
    });
});

router.get('/update', function(req, res) {
    class_dal.update(req.query, function(err, result) {
        res.redirect('/class/all');
    });
});

router.get('/delete', function(req, res) {
    class_dal.delete(req.query.class_id, function(err, result) {
        res.redirect('/class/all');
    });
});

module.exports = router;