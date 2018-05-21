var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.render('uploadimg', { title: 'Express' });
});

router.post('/image', function(req, res) {
    res.render('uploadimg', { title: 'Express' });
});
module.exports = router;
