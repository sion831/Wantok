var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/trackers/:trackid', function(request, response, next) {
    //... Do something with req.user
    console.log('CALLED ONLY ONCE with', request.abc);
    return response.render('layout');
});

module.exports = router;
