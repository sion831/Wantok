var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.render('trackers');
});

/* GET users listing. */
router.get('/:trackid', function(request, response) {
    //... Do something with req.user
    //console.log('CALLED ONLY ONCE with hellp');
    //console.log(request.params.trackid);
    //console.log('aaa');
    response.render('trackers', { trackid:request.params.trackid });
});

module.exports = router;
