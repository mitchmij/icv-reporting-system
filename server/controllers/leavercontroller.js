const Leaver = require("../models/Leaver");
const LeaverContract = require("../models/LeaverContract");
const mongoose = require("mongoose");


exports.addLeaver = async (req, res) => {
    res.render("leaver/company_level");
  };

/**
 * POST /
 * Create New Customer
 */
exports.postLeaver = async (req, res) => {
  console.log(req.body);

  const newLeaver = new Leaver({
    id: req.body.id,
    v_id: req.body.v_id,
    category: req.body.category,
    resign: req.body.resign,
    terminate: req.body.terminate,
    transfer: req.body.transfer,
    others: req.body.others
  });

  try {
    await Leaver.create(newLeaver);
    req.flash('success_msg', 'Data added successfully');
    console.log("Leavers added")
    return res.redirect("/company_level");
  } catch (error) {
    console.log(error);
  }
};


exports.postcontractLeaver = async (req, res) => {
  console.log(req.body);

  const newLeaverContract = new LeaverContract({
    id: req.body.id,
    v_id: req.body.v_id,
    contract_no: req.body.contract_no,
    contract_id: req.body.contract_id,
    kpi: req.body.kpi,
    category: req.body.category,
    resign: req.body.resign,
    terminate: req.body.terminate,
    transfer: req.body.transfer,
    others: req.body.others
  });

  try {
    await LeaverContract.create(newLeaverContract);
    req.flash('success_msg', 'Data added successfully');
    console.log("Leavers added")
    //return res.redirect("/contract");
    res.redirect(`/contract_level/${newLeaverContract.contract_no}`)
  } catch (error) {
    console.log(error);
  }
};
