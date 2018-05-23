var express = require('express');
var router = express.Router();
var VRItem = require('../models/virtual_reality');

/* GET home page. */
//router.get('/', function(req, res, next) {
//    res.render('vr', { title: 'Express' });
//});

router.get('/:vid', function(req, res) {

    if(req.params.vid == 'vid00012' || req.params.vid == 'vid00013' || req.params.vid == 'vid00014')
    {
        VRItem.find({community_id: '5b05035fcdfa4b24f43d5cb8'}, function (err, vritem) {
            if (err) return res.status(500).json({ error: err });
            if (!vritem) return res.status(404).json({ error: 'vritem not found' });
            return res.render('vr_item', { vrlist: vritem });
        })
        //return res.redirect('/');
    }
    else
    {
        VRItem.find({community_id: req.params.vid}, function (err, vritem) {
            if (err) return res.status(500).json({ error: err });
            if (!vritem) return res.status(404).json({ error: 'vritem not found' });
            return res.render('vr_item', { vrlist: vritem });
        })
    }

    //return res.render('vr');
});

module.exports = router;
