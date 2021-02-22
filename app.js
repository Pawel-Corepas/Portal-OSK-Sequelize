
var express    = require('express');  
var path = require('path');
//var cookieParser = require('cookie-parser');
var logger = require('morgan');
var instructorsRouter = require('./routes/instructors');
var studentsRouter = require('./routes/students');
var lessonsRouter = require('./routes/lessons');
var coursesRouter = require('./routes/courses');
var paymentsRouter = require('./routes/payments');
var createError = require('http-errors');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev', {
  skip: function (req, res) { return res.statusCode < 400 }
}))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/instructors/', instructorsRouter);
app.use('/students', studentsRouter);
app.use('/lessons', lessonsRouter);
app.use('/courses/', coursesRouter);
app.use('/payments', paymentsRouter);
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
      
module.exports = app;
