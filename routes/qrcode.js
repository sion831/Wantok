var express = require('express');
var router = express.Router();
var PythonShell = require('python-shell');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('qrcode', { title: 'Express' });
});

router.post('/update', function(req, res, next) {
    if (!req.files)
        res.status(400).send('No files were uploaded.');
        //return res.status(400).send('No files were uploaded.');

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let sampleFile = req.files.sampleFile;

    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv('../public/images/filename.jpg', function(err) {
        if (err)
            return res.status(500).send(err);

        var options = { pythonPath: 'python3' };

        PythonShell.run('../public/python/qrgen-demo.py', options, function (err, results) {
            if (err) throw err;
            console.log('finished');
        });

        res.send('File uploaded!');
    });

    //return next('/');
    //res.render('qrcode', { title: 'Express' });
    //return next();
});
module.exports = router;
