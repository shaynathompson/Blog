//Declaring dependencies
var express = require('express');
var chalk = require('chalk');
var mongoose=require('mongoose');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session=require('express-session');

//Declaring database model
var db=require('./models/db.js');

//Declaring routes
var routes=require('./routes/route.js');
var user=require('./routes/user.js');
var story=require('./routes/story.js');


var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret:"qazwsxedcrfvtgbyhnujm",resave: true, saveUninitialized: true}));

//Mapping routes to views
app.get('/',routes.index);
app.get('/stories',story.stories);
app.get('/register',routes.register);
app.get('/logout',user.logout);
app.get('/login',routes.login);
app.get('/stories/:story',story.getStory);
app.get('/new-story',routes.newStory);
app.get('/registrationSuccessful',user.registrationSuccessful);

app.post('/newUser',user.doCreate);
app.post('/authenticate',user.login);
app.post('/add-story',story.addStory);
app.post('/stories/:slug/saveComment',story.saveComment);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
