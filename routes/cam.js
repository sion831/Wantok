var express = require('express');
var router = express.Router();

var fs = require('fs')

/* GET home page. */
router.get('/', function(req, res) {
    res.render('uploadimg', { title: 'Express' });
});

router.post('/image', function(req, res) {
    //res.render('uploadimg', { title: 'Express' });
    var matches = req.body.img.match(/^data:.+\/(.+);base64,(.*)$/);
    var buffer = new Buffer(matches[2], 'base64');

    var savePath = '../public/images/' + Math.floor(Math.random() * 1000000) + '.jpg';
    fs.writeFileSync(savePath, buffer);
});
module.exports = router;
