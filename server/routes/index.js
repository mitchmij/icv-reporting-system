const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const { checkNotAuthenticated } = require('../config/auth');
const mongoose = require('mongoose');
const Workforce = require("../models/Workforce");
const Leaver = require("../models/Leaver");
const Spend = require("../models/Spend");
const Apprentice = require("../models/Apprentice");
const LocalRecruitment = require("../models/LocalRecruitment");
const NonlocalRecruitment = require("../models/NonlocalRecruitment");
const Contract = require("../models/Contract");
const WorkforceContract = require("../models/WorkforceContract");
const LocalRecruitContract = require("../models/LocalRecruitContract");
const NonlocalRecruitContract = require("../models/NonlocalRecruitContract");
const LeaverContract = require("../models/LeaverContract");
const SpendContract = require("../models/SpendContract");
const ApprenticeContract = require("../models/ApprenticeContract");
const Subcontract = require("../models/Subcontract");
const User = require('../models/User');
const bcrypt = require('bcryptjs');
//const workforcecontroller = require('../controllers/workforcecontroller');
//require('../models/User');
//require('../models/User');
//require('../models/Workforce');
//const User = mongoose.model('User'); 

//Index Page
router.get('/', checkNotAuthenticated,  (req, res) => res.render('index'));

//Index Page
router.get('/index', checkNotAuthenticated, (req, res) => {
    res.render('index')
  })

  //Sign Up Page
router.get('/vendor_signup', checkNotAuthenticated, (req, res) => {
    res.render('vendor_signup')
  })

  router.get('/verifyOTP', checkNotAuthenticated, (req, res) => {
    res.render('verifyOTP')
  })

  //Sign In Page
router.get('/vendor_signin', checkNotAuthenticated, (req, res) => {
    res.render('vendor_signin')
  })

  // Company Level Page
router.get('/login_error', ensureAuthenticated, (req, res) => 
res.render('login_error', {
}));

// Company Level Page
router.get('/company_level', ensureAuthenticated, (req, res) => 
res.render('company_level', {
    id:req.user._id,
    v_id:req.user.v_id,
    company:req.user.company
}));


//Edit and Update Work force break down page
router.get('/editworkforce', ensureAuthenticated, (req, res) => 
res.render('editworkforce', {
    id:req.user._id,
    v_id:req.user.v_id,
    company:req.user.company
}));

router.get('/editworkcontract', ensureAuthenticated, (req, res) => 
res.render('editworkcontract', {
    id:req.user._id,
    v_id:req.user.v_id,
    company:req.user.company
}));


//Edit and Update local recruitment page
router.get('/editlocal', ensureAuthenticated, (req, res) => 
res.render('editlocal', {
    id:req.user._id,
    v_id:req.user.v_id,
    company:req.user.company
}));

//Edit and Update local recruitment page
router.get('/editlocalcontract', ensureAuthenticated, (req, res) => 
res.render('editlocalcontract', {
    id:req.user._id,
    v_id:req.user.v_id,
    company:req.user.company
}));

//Edit and Update non local recruitment page
router.get('/editnonlocal', ensureAuthenticated, (req, res) => 
res.render('editnonlocal', {
    id:req.user._id,
    v_id:req.user.v_id,
    company:req.user.company
}));

//Edit and Update leaver page
router.get('/editleaver', ensureAuthenticated, (req, res) => 
res.render('editleaver', {
    id:req.user._id,
    v_id:req.user.v_id,
    company:req.user.company
}));

//Edit and Update spend page
router.get('/editspend', ensureAuthenticated, (req, res) => 
res.render('editspend', {
    id:req.user._id,
    v_id:req.user.v_id,
    company:req.user.company
}));

//Edit and Update apprentice page
router.get('/editapprentice', ensureAuthenticated, (req, res) => 
res.render('editapprentice', {
    id:req.user._id,
    v_id:req.user.v_id,
    company:req.user.company
}));

//Edit and update profile page
router.get('/editprofile', ensureAuthenticated, (req, res) => 
res.render('editprofile', {
  id:req.user._id,
  v_id:req.user.v_id,
  name:req.user.name,
  company:req.user.company,
  email:req.user.email,
  phone:req.user.phone,
  description:req.user.description,
  password:req.user.password
}));


//Edit password page
router.get('/editpwd', ensureAuthenticated, (req, res) => 
res.render('editpwd', {
  id:req.user._id,
  v_id:req.user.v_id,
  name:req.user.name,
  company:req.user.company,
  email:req.user.email,
  phone:req.user.phone,
  description:req.user.description,
  password:req.user.password
}));

/////////////////////////////////////////

//Show total on vendor dashboard
router.get('/vendor_dashboard', ensureAuthenticated, function (req, res) {

  let quarter;
  
   //To get the date and month
   var currentTime = new Date()
   var month = currentTime.getMonth() + 1
   var day = currentTime.getDate()
   var thisyear = currentTime.getFullYear()
  
   if(day <= 22 && month == 4)
   {
      quarter = "Q01";
   }
  
      else if(day <= 22 && month == 7) {
        
        quarter = "Q02";
   }
  
   else if(day <= 22 && month == 10) {
     
    quarter = "Q03";
  
   }
  
   else if(day <= 22 && month == 1) {
    
    quarter = "Q04";
  
   }
  
   else {
    quarter = "None";
   }
  
    // router.get('/compsummary', function(req, res){            
       Workforce.find({ id:req.user._id }, function(err, workforces){
         if(err){
             console.log(err);
            }else{
              LocalRecruitment.find({ id:req.user._id }, function(err, localrecruits){
      if(err){
          console.log(err);
        }else{
          NonlocalRecruitment.find({ id:req.user._id }, function(err, nonlocalrecruits){
  if(err){
      console.log(err);
           }else{
             Leaver.find({ id:req.user._id }, function(err, leavers){
     if(err){
         console.log(err);
       }else{
         Spend.find({ id:req.user._id }, function(err, spends){
   if(err){
     console.log(err);
   }else{
     Apprentice.find({ id:req.user._id }, function(err, apprentices){
   if(err){
   console.log(err);
         }else{
             res.render('vendor_dashboard', {workList:workforces, localList:localrecruits, nonlocalList:nonlocalrecruits, leaveList:leavers, spendList:spends, appList:apprentices,  
              id:req.user._id,
              v_id:req.user.v_id,
              name:req.user.name,
              company:req.user.company,
              email:req.user.email,
              phone:req.user.phone,
              description:req.user.description});
         
      }
    });
  }
});
     }
   });
   }
   });
   }
   });
  }
  });
   //});
   })


   ////////////////////////////////////////////////


//Show total on vendor dashboard
router.get('/admin', ensureAuthenticated, function (req, res) {
          
       User.find({}, function(err, users){
        if(err){
          console.log(err);
        }else{
          Contract.find({}, function(err, contracts){
            if(err){
                console.log(err);
               }else{
       Workforce.find({}, function(err, workforces){
         if(err){
             console.log(err);
            }else{
              LocalRecruitment.find({}, function(err, localrecruits){
      if(err){
          console.log(err);
        }else{
          NonlocalRecruitment.find({}, function(err, nonlocalrecruits){
  if(err){
      console.log(err);
           }else{
             Leaver.find({}, function(err, leavers){
     if(err){
         console.log(err);
       }else{
         Spend.find({}, function(err, spends){
   if(err){
     console.log(err);
   }else{
     Apprentice.find({}, function(err, apprentices){
   if(err){
   console.log(err);
         }else{
             res.render('admin', {userList:users, contractList:contracts, workList:workforces, localList:localrecruits, nonlocalList:nonlocalrecruits, leaveList:leavers, spendList:spends, appList:apprentices,  
              id:req.user._id,
              v_id:req.user.v_id,
              name:req.user.name,
              role:req.user.role,
              company:req.user.company,
              email:req.user.email,
              phone:req.user.phone,
              description:req.user.description});
            }
          });
        }
      });
      }
    });
  }
});
     }
   });
   }
   });
   }
   });
  }
  });
   //});
   })

   router.get('/new_vendor', ensureAuthenticated, function (req, res) {
          
    User.find({}, function(err, users){
     if(err){
       console.log(err);
      }else{
          res.render('new_vendor', {userList:users, 
           id:req.user._id,
           v_id:req.user.v_id,
           name:req.user.name,
           role:req.user.role,
           company:req.user.company,
           email:req.user.email,
           phone:req.user.phone,
           status:req.user.status,
           description:req.user.description});
         }
       });
     });
//});

   ////////////////////////////////////////////////

   router.get('/vendor', ensureAuthenticated, function (req, res) {
          
    User.find({}, function(err, users){
     if(err){
       console.log(err);
      }else{
          res.render('vendor', {userList:users, 
           id:req.user._id,
           v_id:req.user.v_id,
           name:req.user.name,
           role:req.user.role,
           status:req.user.status,
           company:req.user.company,
           email:req.user.email,
           phone:req.user.phone,
           description:req.user.description});
         }
       });
     });



        ////////////////////////////////////////////////

   router.get('/contracts_list', ensureAuthenticated, function (req, res) {
          
    Contract.find({}, function(err, contracts){
     if(err){
       console.log(err);
      }else{
        User.find({}, function(err, users){
          if(err){
          console.log(err);
                }else{
          res.render('contracts_list', {contractList:contracts, userList:users,
           id:req.user._id,
           v_id:req.user.v_id,
           name:req.user.name,
           role:req.user.role,
           status:req.user.status,
           company:req.user.company,
           email:req.user.email,
           phone:req.user.phone,
           description:req.user.description});
         }
       });
      }
    });
     });

     ////////////////////////////////////



     router.get('/contract_dashboard', ensureAuthenticated, function (req, res) {
          
      Contract.find({}, function(err, contracts){
       if(err){
         console.log(err);
                  }else{
            res.render('contract_dashboard', {contractList:contracts,
             id:req.user._id,
             v_id:req.user.v_id,
             name:req.user.name,
             role:req.user.role,
             status:req.user.status,
             company:req.user.company,
             email:req.user.email,
             phone:req.user.phone,
             description:req.user.description});
           }
         });
       });
  
       ////////////////////////////////////



   //Show total on contract
router.get('/contract', ensureAuthenticated, function (req, res) {

  let quarter;
  
   //To get the date and month
   var currentTime = new Date()
   var month = currentTime.getMonth() + 1
   var day = currentTime.getDate()
   var thisyear = currentTime.getFullYear()
  
   if(day <= 22 && month == 4)
   {
      quarter = "Q01";
   }
  
      else if(day <= 22 && month == 7) {
        
        quarter = "Q02";
   }
  
   else if(day <= 22 && month == 10) {
     
    quarter = "Q03";
  
   }
  
   else if(day <= 22 && month == 1) {
    
    quarter = "Q04";
  
   }
  
   else {
    quarter = "None";
   }
  
    // router.get('/compsummary', function(req, res){            
       Contract.find({ id:req.user._id, contract_status: "Active" }, function(err, contracts){
         if(err){
             console.log(err);
            }else{
              WorkforceContract.find({ id:req.user._id, quarter_id:quarter, year:thisyear, kpi: "Yes" }, function(err, workforces){
      if(err){
          console.log(err);
            }else{
              LocalRecruitContract.find({ id:req.user._id, code: "Total New Recruitment This Year", quarter_id:quarter, year:thisyear }, function(err, localrecruits){
      if(err){
          console.log(err);
        }else{
          NonlocalRecruitContract.find({ id:req.user._id, code: "Total New Recruitment This Year", quarter_id:quarter, year:thisyear }, function(err, nonlocalrecruits){
  if(err){
      console.log(err);
       }else{
         SpendContract.find({ id:req.user._id, quarter_id:quarter, year:thisyear}, function(err, spends){
   if(err){
     console.log(err);
         }else{
             res.render('contract', {contractList:contracts, workList:workforces, localList:localrecruits, nonlocalList:nonlocalrecruits, spendList:spends,  
              id:req.user._id,
              v_id:req.user.v_id,
              name:req.user.name,
              company:req.user.company,
              email:req.user.email,
              phone:req.user.phone,
              description:req.user.description});
            }
          });
      }
    });
  }
});
     }
   });
   }
   });
   });

/////////////////////////////////////


   //Show total on each contract
   router.get('/viewcontract_kpi/:id', ensureAuthenticated, function (req, res) {

    let quarter;
    
     //To get the date and month
     var currentTime = new Date()
     var month = currentTime.getMonth() + 1
     var day = currentTime.getDate()
     var thisyear = currentTime.getFullYear()
    
     if(day <= 22 && month == 4)
     {
        quarter = "Q01";
     }
    
        else if(day <= 22 && month == 7) {
          
          quarter = "Q02";
     }
    
     else if(day <= 22 && month == 10) {
       
      quarter = "Q03";
    
     }
    
     else if(day <= 22 && month == 1) {
      
      quarter = "Q04";
    
     }
    
     else {
      quarter = "None";
     }
    
      // router.get('/compsummary', function(req, res){            
         Contract.findOne({ _id: req.params.id }, function(err, contracts){
           if(err){
               console.log(err);
              }else{
        WorkforceContract.find({ id:req.user._id, quarter_id:quarter, year:thisyear, contract_no: req.params.id }, function(err, workforces){
        if(err){
            console.log(err);
              }else{
                LocalRecruitContract.find({ id:req.user._id, code: "Total New Recruitment This Year", quarter_id:quarter, year:thisyear, contract_no: req.params.id }, function(err, localrecruits){
        if(err){
            console.log(err);
          }else{
            NonlocalRecruitContract.find({ id:req.user._id, code: "Total New Recruitment This Year", quarter_id:quarter, year:thisyear, contract_no: req.params.id }, function(err, nonlocalrecruits){
    if(err){
        console.log(err);
         }else{
           SpendContract.find({ id:req.user._id, quarter_id:quarter, year:thisyear, contract_no: req.params.id}, function(err, spends){
     if(err){
       console.log(err);
           }else{
               res.render('viewcontract_kpi', {contracts, workList:workforces, localList:localrecruits, nonlocalList:nonlocalrecruits, spendList:spends,  
                id:req.user._id,
                v_id:req.user.v_id,
                name:req.user.name,
                company:req.user.company,
                email:req.user.email,
                phone:req.user.phone,
                description:req.user.description});
              }
            });
        }
      });
    }
  });
       }
     });
     }
     });
     });
  
  

///////////////////////////////////////////////
   

   //Show total on contract summary
router.get('/cont_summary/:id', ensureAuthenticated, function (req, res) {

  let quarter;
  
   //To get the date and month
   var currentTime = new Date()
   var month = currentTime.getMonth() + 1
   var day = currentTime.getDate()
   var thisyear = currentTime.getFullYear()
  
   if(day <= 22 && month == 4)
   {
      quarter = "Q01";
   }
  
      else if(day <= 22 && month == 7) {
        
        quarter = "Q02";
   }
  
   else if(day <= 22 && month == 10) {
     
    quarter = "Q03";
  
   }
  
   else if(day <= 22 && month == 1) {
    
    quarter = "Q04";
  
   }
  
   else {
    quarter = "None";
   }
  
    // router.get('/compsummary', function(req, res){            
       Contract.findOne({ _id: req.params.id, contract_kpi:"Yes", contract_status:"Active" }, function(err, contracts){
         if(err){
             console.log(err);
            }else{
              WorkforceContract.find({ id:req.user._id, quarter_id:quarter, year:thisyear, contract_no: req.params.id  }, function(err, workforces){
      if(err){
          console.log(err);
            }else{
              LocalRecruitContract.find({ id:req.user._id, quarter_id:quarter, year:thisyear, contract_no: req.params.id }, function(err, localrecruits){
      if(err){
          console.log(err);
        }else{
          NonlocalRecruitContract.find({ id:req.user._id, quarter_id:quarter, year:thisyear, contract_no: req.params.id }, function(err, nonlocalrecruits){
  if(err){
      console.log(err);
    }else{
      LeaverContract.find({ id:req.user._id, quarter_id:quarter, year:thisyear, contract_no: req.params.id }, function(err, leavers){
if(err){
  console.log(err);
}else{
  SpendContract.find({ id:req.user._id, quarter_id:quarter, year:thisyear, contract_no: req.params.id}, function(err, spends){
if(err){
console.log(err);
}else{
ApprenticeContract.find({ id:req.user._id, quarter_id:quarter, year:thisyear, contract_no: req.params.id}, function(err, apprentices){
if(err){
console.log(err);
}else{
  Subcontract.find({ id:req.user._id, quarter_id:quarter, year:thisyear, contract_no: req.params.id}, function(err, subcontracts){
  if(err){
  console.log(err);
  }else{
      res.render('cont_summary', {contracts, workList:workforces, localList:localrecruits, nonlocalList:nonlocalrecruits, leaveList:leavers, spendList:spends, appList:apprentices, subList:subcontracts, 
       id:req.user._id,
       v_id:req.user.v_id,
       name:req.user.name,
       company:req.user.company,
       email:req.user.email,
       phone:req.user.phone,
       description:req.user.description});
      }
    });
}
});
}
});
}
});
}
});
}
});
}
});
}
});
//});
})

////////////////////////////////////////////////


//Show all Company Form Summary
router.get('/comp_summary', ensureAuthenticated, function (req, res) {

let quarter;

 //To get the date and month
 var currentTime = new Date()
 var month = currentTime.getMonth() + 1
 var day = currentTime.getDate()
 var thisyear = currentTime.getFullYear()

 if(day <= 22 && month == 4)
 {
    quarter = "Q01";
 }

    else if(day <= 22 && month == 7) {
      
      quarter = "Q02";
 }

 else if(day <= 22 && month == 10) {
   
  quarter = "Q03";

 }

 else if(day <= 22 && month == 1) {
  
  quarter = "Q04";

 }

 else {
  quarter = "None";
 }

  // router.get('/compsummary', function(req, res){            
    Workforce.find({ id:req.user._id, quarter_id:quarter, year:thisyear }, function(err, workforces){
      if(err){
          console.log(err);
         }else{
           LocalRecruitment.find({ id:req.user._id, quarter_id:quarter, year:thisyear }, function(err, localrecruitments){
   if(err){
       console.log(err);
     }else{
       NonlocalRecruitment.find({ id:req.user._id, quarter_id:quarter, year:thisyear }, function(err, nonlocalrecruitments){
if(err){
   console.log(err);
        }else{
          Leaver.find({ id:req.user._id, quarter_id:quarter, year:thisyear }, function(err, leavers){
  if(err){
      console.log(err);
    }else{
      Spend.find({ id:req.user._id, quarter_id:quarter, year:thisyear}, function(err, spends){
if(err){
  console.log(err);
}else{
  Apprentice.find({ id:req.user._id, quarter_id:quarter, year:thisyear}, function(err, apprentices){
if(err){
console.log(err);
      }else{
          res.render('comp_summary', {workList:workforces, localList:localrecruitments, nonlocalList:nonlocalrecruitments, leaveList:leavers, spendList:spends, appList:apprentices,  
           id:req.user._id,
           v_id:req.user.v_id,
           name:req.user.name,
           company:req.user.company,
           email:req.user.email,
           phone:req.user.phone,
           description:req.user.description});
     
   }
 });
}
});
  }
});
}
});
}
});
}
});
//});
})


///////////////////////////////////////////

router.get('/contract_level/:id', ensureAuthenticated, async function (req, res) {
  try {
    const contracts = await Contract.findOne({ _id: req.params.id })

    res.render('contract_level',  {
      contracts,
      id:req.user._id,
      v_id:req.user.v_id,
      name:req.user.name,
      company:req.user.company
    })

  } catch (error) {
    console.log(error);
  }
});

router.post('/forgotpassword', async (req, res) => {
 
  try {

    
    const user = await User.findOne({email : req.body.email });


    res.render("forgotpassword", {
      user
    })
    console.log(user.email)
    
  } catch (error) {
    console.log(error);
  }



})

router.put('/forgotpassword', async function (req, res) {
  const user = await User.findOne({email : req.body.email });


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
});



module.exports = router;