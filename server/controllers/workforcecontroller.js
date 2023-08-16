const Workforce = require("../models/Workforce");
const WorkforceContract = require("../models/WorkforceContract");
const mongoose = require("mongoose");
require = ("../route/index")

exports.addWorkforce = async (req, res) => {
    res.render("workforce/company_level");
  };

/**
 * POST /
 * Create New Customer
 */
exports.postWorkforce = async (req, res) => {
  console.log(req.body);

  const newWorkforce = new Workforce({
    id: req.body.id,
    v_id: req.body.v_id,
    category: req.body.category,
    position: req.body.position,
    local: req.body.local,
    nonlocal: req.body.nonlocal,
    sawp: req.body.sawp
  });

  try {
    await Workforce.create(newWorkforce);
    req.flash('success_msg', 'Data added successfully');
    console.log("Work Force added")
   // return req.flash('success_msg', 'Data added successfully');
    return res.redirect("/company_level");
  } catch (error) {
    console.log(error);
  }
};

exports.postcontractWorkforce = async (req, res) => {
  console.log(req.body);

  const newWorkforcecontract = new WorkforceContract({
    id: req.body.id,
    v_id: req.body.v_id,
    contract_no: req.body.contract_no,
    contract_id: req.body.contract_id,
    kpi: req.body.kpi,
    category: req.body.category,
    position: req.body.position,
    local: req.body.local,
    nonlocal: req.body.nonlocal,
    sawp: req.body.sawp
  });

  try {
    await WorkforceContract.create(newWorkforcecontract);
    req.flash('success_msg', 'Data added successfully');
    console.log("Contract Work Force added")
   // return req.flash('success_msg', 'Data added successfully');
   res.redirect(`/contract_level/${newWorkforcecontract.contract_no}`)
  } catch (error) {
    console.log(error);
  }
};

