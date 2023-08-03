"use strict";

var createError = require('http-errors');

var express = require('express');

var path = require('path');

var cookieParser = require('cookie-parser');

var logger = require('morgan');

var mongoose = require('mongoose');

require("dotenv").config();

var routes = require('./routes/index'); //para utilizar las rutas de forma ordenada


var indexRouter = require('./routes/index');

var usersRouter = require('./routes/users');

var app = express(); // view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express["static"](path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use(routes); // catch 404 and forward to error handler

app.use(function (req, res, next) {
  next(createError(404));
}); // error handler

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {}; // render the error page

  res.status(err.status || 500);
  res.render('error');
});
var uri = "mongodb+srv://".concat(process.env.USER, ":").concat(process.env.PASSWORD, "@cluster0.3hbs38c.mongodb.net/").concat(process.env.DBNAME, "?retryWrites=true&w=majority");
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function () {
  return console.log("Base de datos conectada");
})["catch"](function (e) {
  return console.log(e);
}); //start the server

app.listen(app.get('port'), function () {
  console.log("Servidor iniciado en puerto", app.get('port'));
});
module.exports = app;
//# sourceMappingURL=app.dev.js.map
