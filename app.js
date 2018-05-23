var createError = require('http-errors');
var express = require('express');

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Setup MongoDB
var mongoose = require('mongoose');
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function () {
    // CONNECTED TO MONGODB SERVER
    console.log("Connected to mongod server");
});

// Construct mongodb connection
mongoose.connect('mongodb://localhost/wantok');

var indexRouter = require('./routes/index');
var trRouter = require('./routes/trackers');
var qrRouter = require('./routes/qrcode');
var vrRouter = require('./routes/vr');
var crRouter = require('./routes/carrier');
var viRouter = require('./routes/village');
var cmRouter = require('./routes/cam');
var shopRouter = require('./routes/shopping');


// Admin route
var adminViRouter = require('./routes/admin-village');

var app = express();

// Body-parser
var bodyParser = require('body-parser');

app.use(bodyParser.json());

// File Upload
const fileUpload = require('express-fileupload');
// default options
app.use(fileUpload());
//app.use(bodyParser.urlencoded());
// param
/*
app.param('trackid', function (request, response, next, trackid) {
    request.abc = trackid;
    return next();
});
*/

app.param('vid', function (request, response, next, vid) {
    request.vid = vid;
    return next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

// for parsing multipart/form-data
//app.use(upload.array());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
//app.use('/trackers', trRouter);
//app.use('/qrcode', qrRouter);
app.use('/vr', vrRouter);
//app.use('/carrier', crRouter);
app.use('/villages', viRouter); // Villages router
app.use('/admin/villages', adminViRouter);// Admin village router
app.use('/shopping', shopRouter);// Admin village router
//app.use('/cam', cmRouter);

//var testRouter = require('./routes/uploadImg');
//app.use('/test', testRouter);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;