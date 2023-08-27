const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const { checkNotAuthenticated } = require('../config/auth');
const User = require('../models/User');
const nodemailer = require('nodemailer');

// Dashboard after login
router.get('/vendor_dashboard', (req, res) => res.render('vendor_dashboard'));

  //Sign In Page
  router.get('/vendor_signin', checkNotAuthenticated, (req, res) => {
    res.render('vendor_signin')
  })

  router.get('/admin', (req, res) => 
  res.render('admin'));

  router.get('/login_error', (req, res) => 
  res.render('login_error'));

// Company Level Page
router.get('/company_level', (req, res) => 
res.render('company_level'));

// Contract Level Page
router.get('/contract_level', (req, res) => 
res.render('contract_level'));

router.get('/contract', (req, res) => 
res.render('contract'));

router.get('/forgotpassword', (req, res) => 
res.render('forgotpassword'));

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


const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
      secure: true,
      auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false
    }
});



/*
const transporter = nodemailer.createTransport({
  service: "Outlook365",
  host: "smtp.office365.com",
  port: 587,
  tls: {
    rejectUnauthorized: false,
  },
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});
*/


//Register Handle
router.post('/vendor_signup', checkNotAuthenticated, (req, res) => {
    const { v_id, role, name, company, email, phone, description, status} = req.body;
    let errors = [];

  if (!v_id || !name || !company || !email || !phone || !description ) {
    errors.push({ msg: 'Please enter all fields' });
  }

  /*
  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }
  */

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
      status
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
            status
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
            status
        });


              //Save user
              newUser
                .save()
                .then(user => {


                     // Step 2 - Generate a verification token with the user's ID
       //const verificationToken = user.generateVerificationToken();
       // Step 3 - Email the user a unique verification link
       //const url = `http://localhost:5000/api/verify/${verificationToken}`
       transporter.sendMail({
         to: email,
         subject: 'Registration Submission',
        // html: `Click <a href = '${url}'>here</a> to confirm your email.`
        html: `Greetings ` + name + `,` +`<br><br><br>` + `We have received your registration submission. It is now in reviewed stage. Our admin will emailed you soon for the details of your registration process.` + `<br><br><br>` + `Thank You,` + `<br>` +`ICV Report System Team`
       })
       req.flash(
        'success_msg',
        'You are now registered and can log in'
      );
      console.log("User is added.")
      return res.redirect('/vendor_signin');
      
       //return res.status(201).send({
        // message: `Sent a verification email to ${email}`
       //});

       

                  req.flash(
                    'success_msg',
                    'Your registration request has been submitted. Thank You.'
                  );
                  console.log("User is added.")
                  return res.redirect('/vendor_signin');
                 
                 


                  
                })
                .catch(err => console.log(err));
           
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
       }if(user.status == 'Rejected' || user.status == 'Waiting For Approval'){
        res.redirect('/login_error')
        console.log('You are not allowed to log in')
         }else{
                 if(user.role == 'Vendor'){
                  if(user.status == 'Active'){
                  res.redirect('/vendor_dashboard')
                  console.log('You are verified and logging in as Vendor')
                }}
             if(user.role == 'Super Admin'){
                res.redirect('/admin')
                console.log('You are logging in as Super Admin')
                 }
                 if(user.role == 'Contract Admin'){
                  res.redirect('/contract_dashboard')
                  console.log('You are logging in as Contract Admin')
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
const user = await User.findByIdAndUpdate(req.params.id,{
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


router.put('/editpwd/:id', async function (req, res) {
  try {
const user = await User.findByIdAndUpdate(req.params.id,{
  password: req.body.password
});

const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);
 await user.save()
//res.redirect(`/editworkforce/${req.params.id}`);
 req.flash('success_msg', 'Data is successfully updated.');
res.redirect('/vendor_dashboard')
console.log('Password updated successfully');
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
  
  let digit = '0123456789';
  let limits = 6;
  let otps = ''
  for (i = 0; i < limits; i++) {
      otps += digit[Math.floor(Math.random() * 10)];
  }



  const user = await User.findByIdAndUpdate(req.params.id,{

    
    v_id:req.body.v_id,
    name: req.body.name,
    company: req.body.company,
    email: req.body.email,
    phone: req.body.phone,
    description: req.body.description,
    status: req.body.status,
    password: otps,
    updatedAt: Date.now(),
  })

  try {
    //user = await User.findById(req.params.id)
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(otps, salt);
 await user.save()
  
  req.flash('success_msg', 'Data is successfully updated.');
  res.redirect('/new_vendor')
  console.log('Data is updated successfully');
console.log(req.body.status)
} catch (error) {
  console.log(error);
}

//const verificationToken = user.generateVerificationToken();
//const url = `http://localhost:5000/verifyOTP/${verificationToken}`
//const url = `http://localhost:5000/verifyOTP`

if (req.body.status == 'Active') {

    const mailOptions = {
      to: user.email,
    subject: 'Account Verfication',
   // html: `Click <a href = '${url}'>here</a> to confirm your email.`
   html: `Hello there ` + `,` + `<br><br><br>` + `Our admin has finished reviewing your registration. You are now approved.` + `<br><br><br>` + `Please use this OTP ` + otps + ` for your login password.` + `<br><br><br>` + `<p style='font-weight: bold;'>Important: Please change your password once you log in to your account using the given OTP.</p>` + `<br><br><br>` + `Thank You,` + `<br>` +`ICV Report System Team`,
  };
  
  try {
    await transporter.sendMail(mailOptions);
    //res.json({ message: 'Password reset email sent' });
    console.log('Approved Email sent')
  } catch
  (err) {
    console.error('Failed to send password reset email:', err);
    //res.status(500).json({ error: 'Failed to send password reset email' });
  }
} 

if (req.body.status == 'Rejected') {

  const mailOptions = {
    to: user.email,
  subject: 'Account Verfication',
 // html: `Click <a href = '${url}'>here</a> to confirm your email.`
 html: `Hello there ` + `,` + `<br><br><br>` + `Our admin has finished reviewing your registration. Unfortunately, your application has been rejected. Contact our hotline for more information.` + `<br><br><br>` + `Thank You,` + `<br>` +`ICV Report System Team`,
};

try {
  await transporter.sendMail(mailOptions);
  //res.json({ message: 'Password reset email sent' });
  console.log('Rejected Email sent')
} catch
(err) {
  console.error('Failed to send password reset email:', err);
  //res.status(500).json({ error: 'Failed to send password reset email' });
}
} 

});


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

/*
router.post('/forgotpassword', async (req, res) => {
 
  try {
    const user = await User.findOne({ email: req.body.email });


    res.render("/forgotpassword", {
      user
    })
    console.log(user.email)
    
  } catch (error) {
    console.log(error);
  }

/*
    user.email = req.body.email,
    user.password = req.body.password
    try {
     
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, async (err, hash) => {
          if (err) throw err;
          //Set password to hashed
          user.password = hash;
       
      await user.save();
      req.flash('success_msg', 'Password changed successfully');
      console.log("Password changed")
     // return req.flash('success_msg', 'Data added successfully');
     res.redirect('/vendor_signin')
    });
  });
    } catch (error) {
      console.log(error);
    }
  */
 /*
})
*/

router.post('/comp_summary', async (req, res) => {

  let quarter;

 //To get the date and month
 var currentTime = new Date()
 var month = currentTime.getMonth() + 1
 var day = currentTime.getDate()
 var thisyear = currentTime.getFullYear()

 if(day <= 22 && month == 4)
 {
    quarter = "Quarter 1";
 }

    else if(day <= 22 && month == 7) {
      
      quarter = "Quarter 2";
 }

 else if(day <= 22 && month == 10) {
   
  quarter = "Quarter 3";

 }

 else if(day <= 22 && month == 1) {
  
  quarter = "Quarter 4";

 }

 else {
  quarter = "None";
 }

transporter.sendMail({

  to: req.user.email,
  subject: 'Confirmation of Submission',
 // html: `Click <a href = '${url}'>here</a> to confirm your email.`
 html: `Hello there ` + `,` + `<br><br><br>` + `This is to confirm that you have successfully submitted your company level form for ` + quarter + ` year ` + thisyear + `.` + `<br><br><br>` + `Thank You,` + `<br>` +`ICV Report System Team`
})
req.flash(
 'success_msg',
 'A submission email is sent.'
);
console.log("Email sent.")
return res.redirect('/comp_summary');
})


router.post('/cont_summary', async (req, res) => {

  let quarter;

 //To get the date and month
 var currentTime = new Date()
 var month = currentTime.getMonth() + 1
 var day = currentTime.getDate()
 var thisyear = currentTime.getFullYear()

 if(day <= 22 && month == 4)
 {
    quarter = "Quarter 1";
 }

    else if(day <= 22 && month == 7) {
      
      quarter = "Quarter 2";
 }

 else if(day <= 22 && month == 10) {
   
  quarter = "Quarter 3";

 }

 else if(day <= 22 && month == 1) {
  
  quarter = "Quarter 4";

 }

 else {
  quarter = "None";
 }


 
transporter.sendMail({

  to: req.user.email,
  subject: 'Confirmation of Submission',
  //html: `Click <a href = '${url}'>here</a> to confirm your email.`,
html: `Hello there ` + `,` + `<br><br><br>` + `This is to confirm that you have successfully submitted your contract level form for ` + quarter + ` year ` + thisyear + `.` + `<br><br><br>` + `Thank You,` + `<br>` +`ICV Report System Team`
})
req.flash(
 'success_msg',
 'A submission email is sent.'
);
console.log("Email sent.")
return res.redirect('/contract');
})

//router.post('/forgot-password', forgotPassword);
//router.post('/reset-password', resetPassword);


module.exports = router;