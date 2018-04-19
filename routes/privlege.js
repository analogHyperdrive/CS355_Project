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

module.exports = router;