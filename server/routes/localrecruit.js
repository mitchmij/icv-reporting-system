const express = require('express');
const router = express.Router();
const localcontroller = require('../controllers/localcontroller');
const LocalRecruitment = require("../models/LocalRecruitment");
const LocalRecruitContract = require("../models/LocalRecruitContract")
const { ensureAuthenticated } = require('../config/auth');
//const { checkNotAuthenticated } = require('../config/auth');


router.get('/company_level', localcontroller.addLocal);
router.post('/company_level', localcontroller.postLocal);
router.post('/contract_level', localcontroller.postcontractLocal);

/* Recruitment Section*/

router.get('/editlocal/:id', ensureAuthenticated, async function (req, res) {
  try {
    const locrecruits = await LocalRecruitment.findOne({ _id: req.params.id })

    res.render('editlocal', {
      locrecruits
    })

  } catch (error) {
    console.log(error);
  }
});
 router.put('/editlocal/:id', ensureAuthenticated, async function (req, res) {
    try {
  await LocalRecruitment.findByIdAndUpdate(req.params.id,{
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
  //res.redirect(`/editlocal/${req.params.id}`);
  res.redirect('/comp_summary')
  
  console.log('Updated successfully');
} catch (error) {
  console.log(error);
}});

router.get('/deletelocal/(:id)', function(req, res, next) {
  LocalRecruitment.findByIdAndRemove(req.params.id, (err, doc) => {
      if (!err) {
          res.redirect('/comp_summary');
          console.log('Deleted successfully');
      } else {
          console.log('Failed to Delete user Details: ' + err);
      }
  });
})

////////////////////////////////////////////////

router.get('/editlocalcontract/:id', ensureAuthenticated, async function (req, res) {
    try {
      const locrecruits = await LocalRecruitContract.findOne({ _id: req.params.id })
  
      res.render('editlocalcontract', {
        locrecruits
      })
  
    } catch (error) {
      console.log(error);
    }
  });
   router.put('/editlocalcontract/:id', ensureAuthenticated, async function (req, res) {
      try {
    await LocalRecruitContract.findByIdAndUpdate(req.params.id,{
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
    res.redirect(`/localrecruit/editlocalcontract/${req.params.id}`)
    
    console.log('Updated successfully');
  } catch (error) {
    console.log(error);
  }});
  
  router.get('/deletelocalcontract/(:id)', function(req, res, next) {
    LocalRecruitContract.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('back');
            console.log('Deleted successfully');
        } else {
            console.log('Failed to Delete user Details: ' + err);
        }
    });
  })
  
  ///////////////////////////////////////////////////


module.exports = router;