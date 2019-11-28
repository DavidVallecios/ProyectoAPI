const express = require('express');
const app = express();
const createError = require('http-errors');
const path = require('path');
const mongoose = require('mongoose');

const flash = require('connect-flash');
const morgan = require('morgan')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');

require('dotenv').config()

//connect to database
const mongoDB = require('./config/mongo')
mongoDB.connect();



//settings
app.set('port', process.env.PORT || 3000);
app.set('views',path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//middlewares
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
    secret: 'SRL',
    resave: false,
    saveUninitialized: false
}));

app.use(flash());

//routes
app.use('/', require('./routes/usuario'))
app.use('/', require('./routes/reserva'))
app.use('/', require('./routes/laboratorio'))

//static files
app.use(express.static(path.join(__dirname, '/public')))


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

app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'))
})