if (process.env.NODE_ENV !== 'production' )
{
    require('dotenv').config();
}

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const favicon = require('serve-favicon');
const passport = require('passport');
const initializePassport = require('./services/passport-config');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');

const {findUserByEmail, findUserById} = require("./services/databaseService");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var pokedexRouter = require('./routes/pokedex');

var app = express();

initializePassport(passport, findUserByEmail, findUserById);

// view engine setup
app.set('views', path.join(__dirname, 'views'));  // Express is looking there for views files
app.set('view engine', 'pug'); // Views Engine = pug

app.use(favicon(path.join(__dirname, 'public','images','favicon.ico')));

app.use(logger('dev'));  // Adds Middleware, shows logs
app.use(express.json());  // Middleware which parse request to json
app.use(express.urlencoded({ extended: false }));  // Parses data from forms, extended = false -> standard Node.js parser
app.use(cookieParser());  // Middleware which parses cookies
app.use(express.static(path.join(__dirname, 'public')));  // Middleware, which serves static web pages

app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));


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
