var express = require('express');
var router = express.Router();
var Village = require('../models/village');

router.get('/', function (req, res) {
    Village.find(function (err, villages) {
        if (err) {
            return res.status(500).send({ error: 'database failure' });
        }
        res.render('village-list-view', { villageList: villages });
    });
});

router.get('/new', function (req, res) {
    res.render('village-add',);
});

router.post('/new', function (req, res) {
    var village = new Village();
    var body = req.body;
    village.name = body.villageName;
    village.summary_text = body.villageDes;
    village.latitude = body.villageLat;
    village.longitude = body.villageLong;
    village.brand_image = body.villageBrand;

    village.save(function (err) {
        if (err) {
            console.error(err);
            res.send(err);
            return;
        }
        res.redirect('/admin/villages');
    });
});

router.delete('/:id', function (req, res) {
    console.log('triggered');
    console.log(req.params.id);
    Village.remove({ _id:req.params.id }, function (err, output) {
        if(err) return res.status(500).json({ error: "database failure" });

        /* ( SINCE DELETE OPERATION IS IDEMPOTENT, NO NEED TO SPECIFY )
        if(!output.result.n) return res.status(404).json({ error: "book not found" });
        res.json({ message: "book deleted" });
        */

        console.log('check');

        res.end();
    })
});

module.exports = router;
