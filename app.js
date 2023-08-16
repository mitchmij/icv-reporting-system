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

const app = express();
const port = process.env.PORT || 5000;

//Passport config
require('./server/config/passport')(passport);

// Connect to Database  
connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

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

app.listen(port, ()=> {
  console.log(`App are listening on port ${port}`)
});
