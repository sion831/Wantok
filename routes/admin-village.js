var express = require('express');
var router = express.Router();
var Village = require('../models/village');
var VRItem = require('../models/virtual_reality')
var fs = require('fs')

var PythonShell = require('python-shell');

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
    village.brand_image = '/images/villages/default_community.png'

    village.save(function (err) {
        if (err) {
            console.error(err);
            res.send(err);
            return;
        }
    });
    res.redirect('/admin/villages');
});

router.post('/add_item', function (req, res) {
    var vritem = new VRItem();
    var body = req.body;

    if (!req.files)
        return res.status(400).send('No files were uploaded.');

    // VR Image
    let VRImage = req.files.VRImage;
    let VRImagePath = '../public/images/360/'+ VRImage.name;

    // Use the mv() method to place the file somewhere on your server
    VRImage.mv(VRImagePath, function(err) {
        if (err)
            return res.status(500).send(err);

        //res.send('File uploaded!');
    });

    // VRThumbnail
    let VRThumb = req.files.VRThumb;
    let VRThumbPath = '../public/images/360/'+ VRThumb.name;
    // Use the mv() method to place the file somewhere on your server
    VRThumb.mv(VRThumbPath, function(err) {
        if (err)
            return res.status(500).send(err);

        //res.send('File uploaded!');
    });

    vritem.community_id = body.vrid;
    vritem.scene_name = body.SceneName;
    vritem.image_file = '/images/360/' + VRImage.name;
    vritem.thumb_file = '/images/360/' + VRThumb.name;
    vritem.save(function (err) {
        if (err) {
            console.error(err);
            res.send(err);
            return;
        }
    });
    res.redirect('/admin/villages');
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

        //res.end();
    })

    VRItem.remove({ community_id:req.params.id }, function (err, output) {
        if(err) return res.status(500).json({ error: "database failure" });

        /* ( SINCE DELETE OPERATION IS IDEMPOTENT, NO NEED TO SPECIFY )
        if(!output.result.n) return res.status(404).json({ error: "book not found" });
        res.json({ message: "book deleted" });
        */

        console.log('check');

        //res.end();
    })
    res.redirect('/admin/villages/');
});

router.get('/add_vr/:id', function (req, res) {
    console.log(req.params.id);
    res.render('vr-add', {community_id:req.params.id});
});

router.get('/brand_making/:id', function (req, res) {
    console.log(req.params.id);
    res.render('brand-making', {community_id:req.params.id});
});

router.post('/update_brand/', function (req, res) {
    console.log(req.body.id);

    // Camera Control
    var matches = req.body.img.match(/^data:.+\/(.+);base64,(.*)$/);
    var buffer = new Buffer(matches[2], 'base64');
    var savePath = '../public/images/villages/' + req.body.id + '.jpg';
    var outputPath = '../public/images/brands/' + req.body.id + '.jpg';
    fs.writeFileSync(savePath, buffer);

    // Generate QR Code
    var options = { pythonPath: 'python3', args:[req.body.qr_text, savePath, outputPath, 250]};
    PythonShell.run('../public/python/qrgen.py', options, function (err, results) {
        if (err) throw err;
        console.log('finished');
    });

    // Update Brand Image
    Village.findOne({_id: req.body.id}, function (err, village) {
        if (err) return res.status(500).json({ error: err });
        if (!village) return res.status(404).json({ error: 'village not found' });
        village.brand_image = '/images/brands/'+ req.body.id + '.jpg';

        village.save(function(err){
            if(err) res.status(500).json({error: 'failed to update'});
            res.json({message: 'book updated'});
        });
    })
    //res.redirect('/admin/villages');
});

router.get('/:id', function (req, res) {

});

module.exports = router;
