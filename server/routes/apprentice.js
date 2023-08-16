const express = require('express');
const router = express.Router();
const apprenticecontroller = require('../controllers/apprenticecontroller');
const Apprentice = require("../models/Apprentice");
const ApprenticeContract = require("../models/ApprenticeContract")
const { ensureAuthenticated } = require('../config/auth');


router.get('/company_level', apprenticecontroller.addApprentice);
router.post('/company_level', apprenticecontroller.postApprentice);
router.post('/contract_level', apprenticecontroller.postcontractApprentice);



/* Apprentice Section*/

router.get('/editapprentice/:id', ensureAuthenticated, async function (req, res) {
  try {
    const apprentices = await Apprentice.findOne({ _id: req.params.id })

    res.render('editapprentice', {
      apprentices
    })

  } catch (error) {
    console.log(error);
  }
});
 router.put('/editapprentice/:id', ensureAuthenticated, async function (req, res) {
    try {
  await Apprentice.findByIdAndUpdate(req.params.id,{
    fullname: req.body.fullname,
    ic: req.body.ic,
    iready: req.body.iready,
    duration: req.body.duration,
    start: req.body.start,
    end: req.body.end,
    qualification: req.body.qualification,
    skilltrade: req.body.skilltrade,
    accreditation: req.body.accreditation,
    updatedAt: Date.now()
  });
  //res.redirect(`/editapprentice/${req.params.id}`);
  res.redirect('/comp_summary')
  
  console.log('Updated successfully');
} catch (error) {
  console.log(error);
}});

router.get('/deleteapprentice/(:id)', function(req, res, next) {
  Apprentice.findByIdAndRemove(req.params.id, (err, doc) => {
      if (!err) {
          res.redirect('/comp_summary');
          console.log('Deleted successfully');
      } else {
          console.log('Failed to Delete user Details: ' + err);
      }
  });
})



/* Apprentice Section*/

router.get('/editappcontract/:id', ensureAuthenticated, async function (req, res) {
    try {
      const apprentices = await ApprenticeContract.findOne({ _id: req.params.id })
  
      res.render('editappcontract', {
        apprentices
      })
  
    } catch (error) {
      console.log(error);
    }
  });
   router.put('/editappcontract/:id', ensureAuthenticated, async function (req, res) {
      try {
    await ApprenticeContract.findByIdAndUpdate(req.params.id,{
      fullname: req.body.fullname,
      ic: req.body.ic,
      iready: req.body.iready,
      duration: req.body.duration,
      start: req.body.start,
      end: req.body.end,
      qualification: req.body.qualification,
      skilltrade: req.body.skilltrade,
      accreditation: req.body.accreditation,
      updatedAt: Date.now()
    });
    //res.redirect(`/editapprentice/${req.params.id}`);
    res.redirect(`/apprentice/editappcontract/${req.params.id}`)
    
    console.log('Updated successfully');
  } catch (error) {
    console.log(error);
  }});
  
  router.get('/deleteappcontract/(:id)', function(req, res, next) {
    ApprenticeContract.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('back');
            console.log('Deleted successfully');
        } else {
            console.log('Failed to Delete user Details: ' + err);
        }
    });
  })

module.exports = router;