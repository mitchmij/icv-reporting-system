const express = require('express');
const router = express.Router();
const leavercontroller = require('../controllers/leavercontroller');
const Leaver = require("../models/Leaver");
const LeaverContract = require("../models/LeaverContract")
const { ensureAuthenticated } = require('../config/auth');


router.get('/company_level', leavercontroller.addLeaver);
router.post('/company_level', leavercontroller.postLeaver);
router.post('/contract_level', leavercontroller.postcontractLeaver);


/* Leavers Section*/

router.get('/editleaver/:id', ensureAuthenticated, async function (req, res) {
  try {
    const leaver = await Leaver.findOne({ _id: req.params.id })

    res.render('editleaver', {
      leaver
    })

  } catch (error) {
    console.log(error);
  }
});
 router.put('/editleaver/:id', ensureAuthenticated, async function (req, res) {
    try {
  await Leaver.findByIdAndUpdate(req.params.id,{
    category: req.body.category,
    resign: req.body.resign,
    terminate: req.body.terminate,
    transfer: req.body.transfer,
    others: req.body.others,
    total:parseInt(req.body.resign) + parseInt(req.body.terminate) + parseInt(req.body.transfer) + parseInt(req.body.others),
    updatedAt: Date.now()
  });
  //res.redirect(`/editleaver/${req.params.id}`);
  res.redirect('/comp_summary')
  
  console.log('Updated successfully');
} catch (error) {
  console.log(error);
}});

router.get('/deleteleaver/(:id)', function(req, res, next) {
  Leaver.findByIdAndRemove(req.params.id, (err, doc) => {
      if (!err) {
          res.redirect('/comp_summary');
          console.log('Deleted successfully');
      } else {
          console.log('Failed to Delete user Details: ' + err);
      }
  });
})




/* Leavers Section*/

router.get('/editleavercontract/:id', ensureAuthenticated, async function (req, res) {
    try {
      const leaver = await LeaverContract.findOne({ _id: req.params.id })
  
      res.render('editleavercontract', {
        leaver
      })
  
    } catch (error) {
      console.log(error);
    }
  });
   router.put('/editleavercontract/:id', ensureAuthenticated, async function (req, res) {
      try {
    await LeaverContract.findByIdAndUpdate(req.params.id,{
      category: req.body.category,
      resign: req.body.resign,
      terminate: req.body.terminate,
      transfer: req.body.transfer,
      others: req.body.others,
      total:parseInt(req.body.resign) + parseInt(req.body.terminate) + parseInt(req.body.transfer) + parseInt(req.body.others),
      updatedAt: Date.now()
    });
    //res.redirect(`/editleaver/${req.params.id}`);
    res.redirect(`/leaver/editleavercontract/${req.params.id}`)
    
    console.log('Updated successfully');
  } catch (error) {
    console.log(error);
  }});
  
  router.get('/deleteleavercontract/(:id)', function(req, res, next) {
    LeaverContract.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('back');
            console.log('Deleted successfully');
        } else {
            console.log('Failed to Delete user Details: ' + err);
        }
    });
  })
  

module.exports = router;