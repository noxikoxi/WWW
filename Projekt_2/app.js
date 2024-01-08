var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const favicon = require('serve-favicon');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var pokedexRouter = require('./routes/pokedex');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));  // Express is looking there for views files
app.set('view engine', 'pug'); // Views Engine = pug

app.use(favicon(path.join(__dirname, 'public','images','favicon.ico')));

app.use(logger('dev'));  // Adds Middleware, shows logs
app.use(express.json());  // Middleware which parse request to json
app.use(express.urlencoded({ extended: false }));  // Parses data from forms, extended = false -> standard Node.js parser
app.use(cookieParser());  // Middleware which parses cookies
app.use(express.static(path.join(__dirname, 'public')));  // Middleware, which serves static web pages



app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/pokedex', pokedexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 50);
  res.render('error');
});

module.exports = app;
