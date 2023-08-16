const express = require('express');
const router = express.Router();
const spendcontroller = require('../controllers/spendcontroller');
const Spend = require("../models/Spend");
const SpendContract = require("../models/SpendContract")
const { ensureAuthenticated } = require('../config/auth');


router.get('/company_level', spendcontroller.addSpend);
router.post('/company_level', spendcontroller.postSpend);
router.post('/contract_level', spendcontroller.postcontractSpend);


/* Spend Section*/

router.get('/editspend/:id', ensureAuthenticated, async function (req, res) {
  try {
    const spends = await Spend.findOne({ _id: req.params.id })

    res.render('editspend', {
      spends
    })

  } catch (error) {
    console.log(error);
  }
});
 router.put('/editspend/:id', ensureAuthenticated, async function (req, res) {
    try {
  await Spend.findByIdAndUpdate(req.params.id,{
    category: req.body.category,
    code: req.body.code,
    inbrunei: req.body.inbrunei,
    outbrunei: req.body.outbrunei,
    total:(parseInt(req.body.inbrunei) + parseInt(req.body.outbrunei)).toFixed(2),
    spendpct: Math.round((parseInt(req.body.inbrunei)/(parseInt(req.body.inbrunei) + parseInt(req.body.outbrunei))*100)*10) / 10,
    updatedAt: Date.now()
  });
  //res.redirect(`/editspend/${req.params.id}`);
  res.redirect('/comp_summary')
  
  console.log('Updated successfully');
} catch (error) {
  console.log(error);
}});

router.get('/deletespend/(:id)', function(req, res, next) {
  Spend.findByIdAndRemove(req.params.id, (err, doc) => {
      if (!err) {
          res.redirect('/comp_summary');
          console.log('Deleted successfully');
      } else {
          console.log('Failed to Delete user Details: ' + err);
      }
  });
})




/* Spend Section*/

router.get('/editspendcontract/:id', ensureAuthenticated, async function (req, res) {
    try {
      const spends = await SpendContract.findOne({ _id: req.params.id })
  
      res.render('editspendcontract', {
        spends
      })
  
    } catch (error) {
      console.log(error);
    }
  });
   router.put('/editspendcontract/:id', ensureAuthenticated, async function (req, res) {
      try {
    await SpendContract.findByIdAndUpdate(req.params.id,{
      category: req.body.category,
      code: req.body.code,
      inbrunei: req.body.inbrunei,
      outbrunei: req.body.outbrunei,
      total:(parseInt(req.body.inbrunei) + parseInt(req.body.outbrunei)).toFixed(2),
      spendpct: Math.round((parseInt(req.body.inbrunei)/(parseInt(req.body.inbrunei) + parseInt(req.body.outbrunei))*100)*10) / 10,
      updatedAt: Date.now()
    });
    //res.redirect(`/editspend/${req.params.id}`);
    res.redirect(`/spend/editspendcontract/${req.params.id}`)
    
    console.log('Updated successfully');
  } catch (error) {
    console.log(error);
  }});
  
  router.get('/deletespendcontract/(:id)', function(req, res, next) {
    SpendContract.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('back');
            console.log('Deleted successfully');
        } else {
            console.log('Failed to Delete user Details: ' + err);
        }
    });
  })
  
  

module.exports = router;