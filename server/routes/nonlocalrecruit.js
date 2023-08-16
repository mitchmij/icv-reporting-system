const express = require('express');
const router = express.Router();
const nonlocalcontroller = require('../controllers/nonlocalcontroller');
const NonlocalRecruitment = require("../models/NonlocalRecruitment");
const NonlocalRecruitContract = require("../models/NonlocalRecruitContract")
const { ensureAuthenticated } = require('../config/auth');


router.get('/company_level', nonlocalcontroller.addNonlocal);
router.post('/company_level', nonlocalcontroller.postNonlocal);
router.post('/contract_level', nonlocalcontroller.postcontractNonLocal);



router.get('/editnonlocal/:id', ensureAuthenticated, async function (req, res) {
  try {
    const nonrecruits = await NonlocalRecruitment.findOne({ _id: req.params.id })

    res.render('editnonlocal', {
      nonrecruits
    })

  } catch (error) {
    console.log(error);
  }
});
 router.put('/editnonlocal/:id', ensureAuthenticated, async function (req, res) {
    try {
  await NonlocalRecruitment.findByIdAndUpdate(req.params.id,{
    category: req.body.category,
    code: req.body.code,
    exphire: req.body.exphire,
    rollover: req.body.rollover,
    grads: req.body.grads,
    hnd: req.body.hnd,
    bma: req.body.bma,
    adc: req.body.adc,
    ibte: req.body.ibte,
    schleavers: req.body.schleavers,
    total:parseInt(req.body.exphire) + parseInt(req.body.rollover) + parseInt(req.body.grads) + parseInt(req.body.hnd) + parseInt(req.body.bma) + parseInt(req.body.adc) + parseInt(req.body.ibte) + parseInt(req.body.schleavers),
    updatedAt: Date.now()
  });
  //res.redirect(`/editrecruit/${req.params.id}`);
  res.redirect('/comp_summary')
  
  console.log('Updated successfully');
} catch (error) {
  console.log(error);
}});

router.get('/deletenonlocal/(:id)', function(req, res, next) {
  NonlocalRecruitment.findByIdAndRemove(req.params.id, (err, doc) => {
      if (!err) {
          res.redirect('/comp_summary');
          console.log('Deleted successfully');
      } else {
          console.log('Failed to Delete user Details: ' + err);
      }
  });
})


/* Recruitment Section*/

router.get('/editnonlocalcontract/:id', ensureAuthenticated, async function (req, res) {
    try {
      const nonrecruits = await NonlocalRecruitContract.findOne({ _id: req.params.id })
  
      res.render('editnonlocalcontract', {
        nonrecruits
      })
  
    } catch (error) {
      console.log(error);
    }
  });
   router.put('/editnonlocalcontract/:id', ensureAuthenticated, async function (req, res) {
      try {
    await NonlocalRecruitContract.findByIdAndUpdate(req.params.id,{
      category: req.body.category,
      code: req.body.code,
      exphire: req.body.exphire,
      rollover: req.body.rollover,
      grads: req.body.grads,
      hnd: req.body.hnd,
      bma: req.body.bma,
      adc: req.body.adc,
      ibte: req.body.ibte,
      schleavers: req.body.schleavers,
      total:parseInt(req.body.exphire) + parseInt(req.body.rollover) + parseInt(req.body.grads) + parseInt(req.body.hnd) + parseInt(req.body.bma) + parseInt(req.body.adc) + parseInt(req.body.ibte) + parseInt(req.body.schleavers),
      updatedAt: Date.now()
    });
    //res.redirect(`/editrecruit/${req.params.id}`);
    res.redirect(`/nonlocalrecruit/editnonlocalcontract/${req.params.id}`)
    
    console.log('Updated successfully');
  } catch (error) {
    console.log(error);
  }});
  
  router.get('/deletenonlocalcontract/(:id)', function(req, res, next) {
    NonlocalRecruitContract.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('back');
            console.log('Deleted successfully');
        } else {
            console.log('Failed to Delete user Details: ' + err);
        }
    });
  })



module.exports = router;