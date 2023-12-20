var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose')
const MongoStore = require('connect-mongo')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var sessions = require('express-session')
var app = express();

//const uri = "mongodb+srv://Ibrahim:ib130860011@cmrtcforum.dj6tu.mongodb.net/discnew?retryWrites=true&w=majority";
const uri = "mongodb+srv://ibrahimoyetunjiib:259qVG6vhK3cvnA7@project2023.0pye0gz.mongodb.net/discnew?retryWrites=true&w=majority"

const oneDay = 20000000000;
mongoose.connect(/*'mongodb://localhost:27017/disc*/uri,
  {
    useNewUrlParser: true,
    /* useFindAndModify: false,*/
    useUnifiedTopology: true
  }
).then(()=> {
    console.log('connected succesfully')
  }).catch((err)=> {
    console.log(err)
  })

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(cookieParser());
app.use(sessions({
  secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
  store: MongoStore.create({
    mongoUrl: /*'mongodb://localhost:27017/disc'*/uri
  }),
  saveUninitialized: true,
  cookie: {
    maxAge: oneDay
  },
  resave: false
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err: {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
