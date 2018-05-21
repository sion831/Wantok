var express = require('express');
var multer = require('multer')
var router = express.Router();

/*
var Storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./images");
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});

var upload = multer({ storage: Storage }).array("imgUploader", 3); //Field name and max count


router.get("/", function (req, res) {
    //res.sendFile(__dirname + "/index.html");
    res.render('upload_test');
});

router.post('/upload', function (req, res) {
    console.log("Hello");
    upload(req, res, function (err) {
        if (err) {
            return res.end("Something went wrong!");
        }
        return res.end("File uploaded sucessfully!.");
    });
});

router.post('/new', function (req, res) {
    res.redirect('/admin/villages');
});
*/


router.post('/upload', function(req, res) {
    if (!req.files)
        return res.status(400).send('No files were uploaded.');

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let sampleFile = req.files.sampleFile;

    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv('../public/images/filename.jpg', function(err) {
        if (err)
            return res.status(500).send(err);

        res.send('File uploaded!');
    });
});

router.get("/", function (req, res) {
    //res.sendFile(__dirname + "/index.html");
    res.render('upload_test');
});


module.exports = router;
