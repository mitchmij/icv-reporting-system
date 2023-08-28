require('dotenv').config();

const express = require('express');
//const expressLayout = require('express-ejs-layouts');
const methodOverride = require('method-override');
//const { flash } = require('express-flash-message');
const session = require('express-session');
const connectDB = require('./server/config/db');
//var bodyParser = require("body-parser");
const passport = require('passport');
const flash = require('connect-flash');
require('express-flash-message');
var cors = require('cors');


//Passport config
require('./server/config/passport')(passport);
var configData = require("./config/connection");

async function getApp() {

// Connect to Database  
connectDB();


var connectionInfo = await configData.getConnectionInfo();
mongoose.connect(connectionInfo.DATABASE_URL);

const app = express();
//const port = process.env.PORT || 5000;

var port = normalizePort(process.env.PORT || '5000');
  app.set('port', port);


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(cors('*'));

// Static Files
app.use(express.static('public'));

// Express Session
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    }
  })
);

// Flash Messages
//app.use(flash({ sessionKeyName: 'flashMessage' }));

// Templating Engine
//app.use(expressLayout);
//app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

app.use(passport.initialize());
app.use(passport.session());

   // Connect flash
   app.use(flash());


  // Global variables
  app.use((req, res, next) =>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
  });

  // Flash Messages
//app.use(flash({ sessionKeyName: 'flashMessage' }));


// Routes


app.use('/', require('./server/routes/index'));
//app.use('/company', require('./server/routes/company'));
app.use('/users', require('./server/routes/users'));
app.use('/workforce', require('./server/routes/workforce'));
app.use('/localrecruit', require('./server/routes/localrecruit'));
app.use('/nonlocalrecruit', require('./server/routes/nonlocalrecruit'));
app.use('/leaver', require('./server/routes/leaver'));
app.use('/spend', require('./server/routes/spend'));
app.use('/apprentice', require('./server/routes/apprentice'));
app.use('/subcontract', require('./server/routes/subcontract'));

// Routes
app.use('/', require('./server/routes/customer'))

// Handle 404
app.get('*', (req, res) => {
  res.status(404).render('404');
});

//app.listen(port, ()=> {
 // console.log(`App are listening on port ${port}`)
//});


  // catch 404 and forward to error handler
  app.use(function (req, res, next) {
    next(createError(404));
  });

  // error handler
  app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
  });

  return app;
}


function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}
module.exports = {
  getApp
};