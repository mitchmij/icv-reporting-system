const Apprentice = require("../models/Apprentice");
const ApprenticeContract = require("../models/ApprenticeContract");
const mongoose = require("mongoose");


exports.addApprentice = async (req, res) => {
    res.render("apprentice/company_level");
  };

/**
 * POST /
 * Create New Customer
 */
exports.postApprentice = async (req, res) => {
  console.log(req.body);

  const newApprentice = new Apprentice({
    id: req.body.id,
    v_id: req.body.v_id,
    level: req.body.level,
    fullname: req.body.fullname,
    ic: req.body.ic,
    iready: req.body.iready,
    duration: req.body.duration,
    start: req.body.start,
    end: req.body.end,
    qualification: req.body.qualification,
    skilltrade: req.body.skilltrade,
    accreditation: req.body.accreditation
  });

  try {
    await Apprentice.create(newApprentice);
    req.flash('success_msg', 'Data added successfully');
    console.log("Apprentice added")
    return res.redirect("/company_level");
  } catch (error) {
    console.log(error);
  }
};


exports.postcontractApprentice = async (req, res) => {
  console.log(req.body);

  const newApprenticecontract = new ApprenticeContract({
    id: req.body.id,
    v_id: req.body.v_id,
    contract_no: req.body.contract_no,
    contract_id: req.body.contract_id,
    kpi: req.body.kpi,
    fullname: req.body.fullname,
    ic: req.body.ic,
    iready: req.body.iready,
    duration: req.body.duration,
    start: req.body.start,
    end: req.body.end,
    qualification: req.body.qualification,
    skilltrade: req.body.skilltrade,
    accreditation: req.body.accreditation
  });

  try {
    await ApprenticeContract.create(newApprenticecontract);
    req.flash('success_msg', 'Data added successfully');
    console.log("Apprentice added")
    //return res.redirect("/contract");
    res.redirect(`/contract_level/${newApprenticecontract.contract_no}`)
  } catch (error) {
    console.log(error);
  }
};

