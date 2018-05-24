var express = require('express');
var router = express.Router();
var Village = require('../models/village');



router.get('/:id', function (req, res) {
    Village.findOne({_id: req.params.id}, function (err, village) {
        if (err) return res.status(500).json({ error: err });
        if (!village) return res.status(404).json({ error: 'village not found' });
        res.render('village-view', { village: village })
    })
});

module.exports = router;