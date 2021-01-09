//load packages
var createError = require('http-errors');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//configure app to use bodyparser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var loginRouter = require('./routes/login');
var contactRouter = require('./routes/contact');
var photoRouter = require('./routes/photo');

var PORT = 8080;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//var Book = require('./models/book');
//var router = require('./routes/index')(app, Book);

app.use('/users', usersRouter);
app.use('/login',loginRouter);
app.use('/contacts',contactRouter);
app.use('/photos',photoRouter);

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
  res.status(err.status || 500);
  res.render('error');
});

var server = app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});

module.exports = app;
//module.exports = mydb;

