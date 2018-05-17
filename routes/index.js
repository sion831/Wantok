var express = require('express');
var router = express.Router();
var Village = require('../models/village');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.post('/', function (req, res) {
    var village = new Village();
    village.name = req.body.name;
    village.save(function (err) {
        if (err) {
            console.error(err);
            res.json({result: 0});
            return;
        }
        res.json({result: 1});
        console.log('saved');
        console.log(village.name);
    })
});

router.get('/villages', function (req, res) {
    Village.find(function (err, villages) {
       if (err) {
           return res.status(500).send({error: 'database failure'});
       }
       res.render('index', {villageList: villages});
    });
});

module.exports = router;
