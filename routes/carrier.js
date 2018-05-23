var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('carrier', { title: 'Express' });
});

router.get('/test', function(req, res){
    console.log('CALLED ONLY ONCE with');
    var test = req.body;
});

module.exports = router;
