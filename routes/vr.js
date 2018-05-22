var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('vr', { title: 'Express' });
});

router.get('/:vid', function(request, response, next) {
    //... Do something with req.user
    console.log('CALLED ONLY ONCE with', request.vid);
    return response.render('vr', {vid: request.vid});
});

module.exports = router;
