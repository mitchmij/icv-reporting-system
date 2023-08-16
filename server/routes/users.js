const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const { checkNotAuthenticated } = require('../config/auth');
const User = require('../models/User');
//const nodemailer = require('nodemailer');

// Dashboard after login
router.get('/vendor_dashboard', (req, res) => res.render('vendor_dashboard'));

  //Sign In Page
  router.get('/vendor_signin', checkNotAuthenticated, (req, res) => {
    res.render('vendor_signin')
  })

  router.get('/admin', (req, res) => 
  res.render('admin'));

// Company Level Page
router.get('/company_level', (req, res) => 
res.render('company_level'));

// Contract Level Page
router.get('/contract_level', (req, res) => 
res.render('contract_level'));

router.get('/contract', (req, res) => 
res.render('contract'));

// Company summary Page
router.get('/comp_summary', (req, res) => 
res.render('comp_summary'));

router.get('/cont_summary/:id', (req, res) => 
res.render('cont_summary/:id'));

router.get('/editworkforce', (req, res) => 
res.render('editworkforce'));

router.get('/editworkcontract', (req, res) => 
res.render('editworkcontract'));

router.get('/editlocalcontract', (req, res) => 
res.render('editlocalcontract'));

router.get('/editprofile', (req, res) => 
res.render('editprofile'));

/*

const transporter = nodemailer.createTransport({
      service: "outlook",
      auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false
    }
});
*/


//Register Handle
router.post('/vendor_signup', checkNotAuthenticated, (req, res) => {
    const { v_id, role, name, company, email, phone, description, status, password, password2 } = req.body;
    let errors = [];

  if (!v_id || !name || !company || !email || !phone || !description || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('vendor_signup', {
      errors,
      v_id,
      role,
      name,
      company,
      email,
      phone,
      description,
      status,
      password,
      password2
    });
  } else {
    //Validation Passed
    User.findOne({email:email})
    .then(user => {
        if(user){
        //User exists
        errors.push({msg: 'Email is already registered'});
        res.render('vendor_signup', {
            errors,
            v_id,
            role,
            name,
            company,
            email,
            phone,
            description,
            status,
            password,
            password2
          });
    } else{
        const newUser = new User({
            v_id,
            role,
            name,
            company,
            email,
            phone,
            description,
            status,
            password
        });

        //Hash Password
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              //Set password to hashed
              newUser.password = hash;
              //Save user
              newUser
                .save()
                .then(user => {

/*
                     // Step 2 - Generate a verification token with the user's ID
       const verificationToken = user.generateVerificationToken();
       // Step 3 - Email the user a unique verification link
       const url = `http://localhost:5000/api/verify/${verificationToken}`
       transporter.sendMail({
         to: email,
         subject: 'Verify Account',
         html: `Click <a href = '${url}'>here</a> to confirm your email.`
       })
       return res.status(201).send({
         message: `Sent a verification email to ${email}`
       });

       */

                  req.flash(
                    'success_msg',
                    'You are now registered and can log in'
                  );
                  console.log("User is added.")
                  res.redirect('/vendor_signin');


                  
                })
                .catch(err => console.log(err));
            });
          });
        }
      });
    }
  });

  
// Login
router.post('/vendor_signin', (req, res, next) => {
passport.authenticate('local', function (err, user) { 
  if(err){
   res.redirect('/vendor_signin')
  } else{
   if (! user) {
     res.redirect('/vendor_signin')
   } else{
     req.login(user, function(err){
       if(err){
         res.redirect('/vendor_signin')
       }else{

              if(user.role == 'Vendor'){
                res.redirect('/vendor_dashboard')
                 }
             if(user.role == 'Super Admin'){
                res.redirect('/admin')
                 }
                 if(user.role == 'Contract Admin'){
                  res.redirect('/contract_dashboard')
                   }

       }
     })
   }
  }
})(req, res, next);
})

  /*
  //Login Handle
  router.post('/vendor_signin', checkNotAuthenticated, (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/vendor_dashboard',
      failureRedirect: '/vendor_signin',
      failureFlash: true,
      session: true
    })(req, res, next);
  });
*/

/*
router.post('/vendor_signin', function(req, res, next) {
  passport.authenticate('local',{

    if (user){
        // check user's role for premium or not
        if (user.role == "Vendor") {
      successRedirect ('/vendor_dashboard')
      failureRedirect('/vendor_signin')
      failureFlash(true)
      session(true)
        }

        else if(user.role == "Super Admin"){
          successRedirect ('/vendor_dashboard')
          failureRedirect('/vendor_signin')
          failureFlash(true)
          session(true)
      }}})(req, res, next);
});

*/






  //////////////////////////////


//Logout Handle
router.get('/logout', (req, res) => {
          req.logout(function(err) {
               if (err) { return next(err); }
               req.flash('success_msg', 'You are logged out');
           res.redirect('/vendor_signin');
      });
  });
  


router.put('/editprofile/:id', async function (req, res) {
  try {
await User.findByIdAndUpdate(req.params.id,{
  name: req.body.name,
  company: req.body.company,
  email: req.body.email,
  phone: req.body.phone,
  description: req.body.description
});
//res.redirect(`/editworkforce/${req.params.id}`);
 req.flash('success_msg', 'Data is successfully updated.');
res.redirect('/vendor_dashboard')
console.log('Updated successfully');
} catch (error) {
console.log(error);
}});

/* New Vendor register Section*/

router.get('/edit_vendor/:id', async function (req, res) {
  try {
    const vendors = await User.findOne({ _id: req.params.id })

    res.render('edit_vendor', {
      vendors
    })

  } catch (error) {
    console.log(error);
  }
});
 router.put('/edit_vendor/:id', async function (req, res) {
    try {
  await User.findByIdAndUpdate(req.params.id,{
    v_id:req.body.v_id,
    name: req.body.name,
    company: req.body.company,
    email: req.body.email,
    phone: req.body.phone,
    description: req.body.description,
    status: req.body.status,
    updatedAt: Date.now()
  });
  //res.redirect(`/editworkforce/${req.params.id}`);
   req.flash('success_msg', 'Data is successfully updated.');
  res.redirect('/new_vendor')
  console.log('Updated successfully');
} catch (error) {
  console.log(error);
}});

router.post('/contracts_list', async (req, res) => {
  console.log(req.body);

  const newUser = new User({
    name: req.body.name,
    role: req.body.role,
    company: req.body.company,
    email: req.body.email,
    phone: req.body.phone,
    description: req.body.description,
    status: req.body.status,
    password: req.body.password
  });
  


  try {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, async (err, hash) => {
        if (err) throw err;
        //Set password to hashed
        newUser.password = hash;
     
    await User.create(newUser);
    req.flash('success_msg', 'Data added successfully');
    console.log("Contract Admin added")
   // return req.flash('success_msg', 'Data added successfully');
   res.redirect('/contracts_list')
  });
});
  } catch (error) {
    console.log(error);
  }
});


module.exports = router;