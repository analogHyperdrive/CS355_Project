var express = require('express');
var router = express.Router();
var queries_dal = require('../dal/queries_dal');

router.get('/1', function(req, res) {
    queries_dal.query1(function(err, result) {
        res.render('queries/query1', {result:result[0]});
    });
});

router.get('/2', function(req, res) {
    queries_dal.query2(function(err, result) {
        res.render('queries/query2', {result:result[0]});
    });
});


router.get('/3', function(req, res) {
    queries_dal.query3(function(err, result) {
        res.render('queries/query3', {result:result[0]});
    });
});

router.get('/4', function(req, res) {
    queries_dal.query4(function(err, result) {
        res.render('queries/query4', {result:result[0]});
    });
});


router.get('/5', function(req, res) {
    queries_dal.query5(function(err, result) {
        res.render('queries/query5', {result:result[0]});
    });
});


router.get('/6', function(req, res) {
    queries_dal.query6(function(err, result) {
        res.render('queries/query6', {result:result[0]});
    });
});

router.get('/7', function(req, res) {
    queries_dal.query7(function(err, result) {
        res.render('queries/query7', {result:result[0]});
    });
});

router.get('/8', function(req, res) {
    queries_dal.query8(function(err, result) {
        res.render('queries/query8', {result:result[0]});
    });
});

router.get('/9', function(req, res) {
    queries_dal.query9(function(err, result) {
        res.render('queries/query9', {result:result[0]});
    });
});

router.get('/10', function(req, res) {
    queries_dal.query10(function(err, result) {
        res.render('queries/query10', {result:result[0]});
    });
});

module.exports = router;
