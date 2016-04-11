var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var chalk = require('chalk');
var passport = require('passport');
var helmet = require('helmet');
var flash = require('connect-flash');
var config = require('./config/config');

// Bootstrap db connection
var db = mongoose.connect('mongodb://localhost/mean-dev', function(err) {
	if (err) {
		console.error(chalk.red('Could not connect to MongoDB!'));
		console.log(chalk.red(err));
	}
});

var app = express();

// Globbing model files
config.getGlobbedFiles('./app/models/**/*.js').forEach(function(modelPath) {
    require(path.resolve(modelPath));
});

var index = require('./routes/index');
var users = require('./routes/users');
var model = require('./routes/model');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// "Middleware" setup
app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// use passport session
app.use(passport.initialize());
app.use(passport.session());
// connect flash for flash messages
app.use(flash());
// Use helmet to secure Express headers
app.use(helmet.xframe());
app.use(helmet.xssFilter());
app.use(helmet.nosniff());
app.use(helmet.ienoopen());
app.disable('x-powered-by');
// What is this for?
app.use(function(req, res, next){
        next();
});

app.use('/', index);
app.use('/users', users);
app.use('/model', model);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// production error handler
app.use(function(err, req, res) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message, error: {}});
});

// Bootstrap passport config
require('./config/passport')();

app.set('port', process.env.PORT || 5000);

var server = require('http').createServer(app);

var io = require('socket.io')(server);
io.on("connection", function(socket) {
    console.log("socket.io connection created");

    socket.on("marker-click", function(data) {
        console.log(data);
        socket.emit("yelp-response", {data: "Here"});
    });
});

server.listen(app.get('port'), function(){
    console.log('Express server listening on port ' + server.address().port);
});



module.exports = app;
