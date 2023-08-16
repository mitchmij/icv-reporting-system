const express = require('express');
const router = express.Router();
const subcontractcontroller = require('../controllers/subcontractcontroller');
const Subcontract = require("../models/Subcontract")
const { ensureAuthenticated } = require('../config/auth');


router.post('/contract_level', subcontractcontroller.postsubcontract);

router.get('/editsubcontract/:id', ensureAuthenticated, async function (req, res) {
    try {
      const subs = await Subcontract.findOne({ _id: req.params.id })
  
      res.render('editsubcontract', {
        subs
      })
  
    } catch (error) {
      console.log(error);
    }
  });
   router.put('/editsubcontract/:id', ensureAuthenticated, async function (req, res) {
      try {
    await Subcontract.findByIdAndUpdate(req.params.id,{
        companyname: req.body.companyname,
        yearpct: req.body.yearpct,
        plannedpct: req.body.plannedpct,
        plannedamt: req.body.plannedamt,
        actualpct: req.body.actualpct,
        actualamt: req.body.actualamt,
      updatedAt: Date.now()
    });
    //res.redirect(`/editapprentice/${req.params.id}`);
    res.redirect(`/subcontract/editsubcontract/${req.params.id}`)
    
    console.log('Updated successfully');
  } catch (error) {
    console.log(error);
  }});
  
  router.get('/deletesubcontract/(:id)', function(req, res, next) {
    Subcontract.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('back');
            console.log('Deleted successfully');
        } else {
            console.log('Failed to Delete user Details: ' + err);
        }
    });
  })

module.exports = router;