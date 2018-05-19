var createError = require('http-errors');
var express = require('express');

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var multer = require('multer');
var upload = multer();

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
var trackersRouter = require('./routes/trackers');
var qrRouter = require('./routes/qrcode');
var vrRouter = require('./routes/vr');
var crRouter = require('./routes/carrier');
var viRouter = require('./routes/village');

// Admin route
var adminViRouter = require('./routes/admin-village');

var app = express();

// param
app.param('trackid', function (request, response, next, trackid) {
    request.abc = trackid;
    return next();
});

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
app.use(upload.array());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/trackers', trackersRouter);
app.use('/qrcode', qrRouter);
app.use('/vr', vrRouter);
app.use('/carrier', crRouter);
app.use('/villages', viRouter); // Villages router
app.use('/admin/villages', adminViRouter);// Admin village router

app.get('/trackers/:trackid', function(request, response, next) {
    //... Do something with req.user
    console.log('CALLED ONLY ONCE with', request.abc);
    return response.render('vr');
});

app.get('/vr/:vid', function(request, response, next) {
    //... Do something with req.user
    console.log('CALLED ONLY ONCE with', request.vid);
    return response.render('vr', {vid: request.vid});
});

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