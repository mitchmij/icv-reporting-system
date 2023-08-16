const express = require('express');
const router = express.Router();
const workforcecontroller = require('../controllers/workforcecontroller');
const WorkforceContract = require("../models/WorkforceContract");
const Contract = require("../models/Contract")
const Workforce= require("../models/Workforce");


router.get('/company_level', workforcecontroller.addWorkforce);
router.post('/company_level', workforcecontroller.postWorkforce);
router.post('/contract_level/:id', workforcecontroller.postcontractWorkforce);



/* Work Force Break Down Section*/

router.get('/editworkforce/:id', async function (req, res) {
    try {
      const workforce = await Workforce.findOne({ _id: req.params.id })
  
      res.render('editworkforce', {
        workforce
      })
  
    } catch (error) {
      console.log(error);
    }
  });
   router.put('/editworkforce/:id', async function (req, res) {
      try {
    await Workforce.findByIdAndUpdate(req.params.id,{
      position: req.body.position,
      local: req.body.local,
      nonlocal: req.body.nonlocal,
      sawp: req.body.sawp,
      total:parseInt(req.body.local) + parseInt(req.body.nonlocal),
      localpct: Math.round((parseInt(req.body.local)/(parseInt(req.body.local) + parseInt(req.body.nonlocal))*100)*10) / 10,
      updatedAt: Date.now()
    });
    //res.redirect(`/editworkforce/${req.params.id}`);
     req.flash('success_msg', 'Data is successfully updated.');
    res.redirect('/comp_summary')
    console.log('Updated successfully');
  } catch (error) {
    console.log(error);
  }});
  
  router.get('/delete/(:id)', function(req, res, next) {
    Workforce.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
          req.flash(
            'success_msg',
            'Data is removed.'
          );
            res.redirect('/comp_summary');
            console.log('Deleted successfully');
        } else {
            console.log('Failed to Delete user Details: ' + err);
        }
    });
  })


  
router.get('/editworkcontract/:id', async function (req, res) {
  try {
    const workforce = await WorkforceContract.findOne({ _id: req.params.id })

    res.render('editworkcontract', {
      workforce
    })

  } catch (error) {
    console.log(error);
  }
});
 router.put('/editworkcontract/:id', async function (req, res) {
    try {
  await WorkforceContract.findByIdAndUpdate(req.params.id,{
    position: req.body.position,
    local: req.body.local,
    nonlocal: req.body.nonlocal,
    sawp: req.body.sawp,
    total:parseInt(req.body.local) + parseInt(req.body.nonlocal),
    localpct: Math.round((parseInt(req.body.local)/(parseInt(req.body.local) + parseInt(req.body.nonlocal))*100)*10) / 10,
    updatedAt: Date.now()
  });
  //res.redirect(`/editworkforce/${req.params.id}`);
   req.flash('success_msg', 'Data is successfully updated.');
  res.redirect(`/workforce/editworkcontract/${req.params.id}`)
  //res.redirect('back');
  //res.redirect(`/cont_summary/${WorkforceContract.contract_no}`)
  console.log('Updated successfully');
} catch (error) {
  console.log(error);
}});

router.get('/deleteworkcontract/(:id)', function(req, res, next) {
  WorkforceContract.findByIdAndRemove(req.params.id, (err, doc) => {
      if (!err) {
        req.flash(
          'success_msg',
          'Data is removed.'
        );
          //res.redirect('/cont_summary/:id');
          //res.redirect("/contract")
          res.redirect('back');
          //res.render(`/cont_summary/${WorkforceContract.contract_no}`)
          console.log('Deleted successfully');
      } else {
          console.log('Failed to Delete user Details: ' + err);
      }
  });
})



module.exports = router;