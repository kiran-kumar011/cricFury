var createError = require('http-errors');
var express = require('express');
var path = require('path');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');
var authentication_controller = require('./controllers/authenticationController');

var app = express();

// requiring passport.
require('./module/passport-google');
require('./module/passport-local');


// connect database to session.
var MongoStore = require('connect-mongo')(session);


// connecting server to database.
mongoose.connect('mongodb://localhost:27017/cricket', { useNewUrlParser: true }, (err) => {
	err ? console.log(err) : console.log('mongodb connected');
});

app.use(logger('dev'));

console.log(process.env.NODE_ENV, 'process');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var matchRouter = require('./routes/cricket');
var liveScoringRouter = require('./routes/live');
var apiRouter = require('./routes/apis/index');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// initializing passport and session.
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(session({
	secret: 'secret',
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}))

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// middlewares for session storage.
app.use(authentication_controller.sessions);


if (process.env.NODE_ENV === "development") {
  console.log('console ')
  var webpack = require("webpack");
  var webpackConfig = require("./webpack.config");
  var compiler = webpack(webpackConfig);

  app.use(
    require("webpack-dev-middleware")(compiler, {
      noInfo: true,
      publicPath: webpackConfig.output.publicPath
    })
  );

  app.use(require("webpack-hot-middleware")(compiler));
}

app.use('/users', usersRouter);
app.use('/cricket', matchRouter);
app.use('/live', liveScoringRouter);
app.use('/', indexRouter);
app.use('/api/v1', apiRouter);


// catch 404 and forward to error handler.
app.use(function(req, res, next) {
  next(createError(404));
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
