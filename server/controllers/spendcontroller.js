const Spend = require("../models/Spend");
const SpendContract = require("../models/SpendContract");
const mongoose = require("mongoose");


exports.addSpend = async (req, res) => {
    res.render("spend/company_level");
  };

/**
 * POST /
 * Create New Customer
 */
exports.postSpend = async (req, res) => {
  console.log(req.body);

  const newSpend = new Spend({
    id: req.body.id,
    v_id: req.body.v_id,
    category: req.body.category,
    code: req.body.code,
    inbrunei: req.body.inbrunei,
    outbrunei: req.body.outbrunei
  });

  try {
    await Spend.create(newSpend);
    req.flash('success_msg', 'Data added successfully');
    console.log("Spend content added")
    return res.redirect("/company_level");
  } catch (error) {
    console.log(error);
  }
};


exports.postcontractSpend = async (req, res) => {
  console.log(req.body);

  const newSpendcontract = new SpendContract({
    id: req.body.id,
    v_id: req.body.v_id,
    contract_no: req.body.contract_no,
    contract_id: req.body.contract_id,
    kpi: req.body.kpi,
    category: req.body.category,
    code: req.body.code,
    inbrunei: req.body.inbrunei,
    outbrunei: req.body.outbrunei
  });

  try {
    await SpendContract.create(newSpendcontract);
    req.flash('success_msg', 'Data added successfully');
    console.log("Spend content added")
    //return res.redirect("/contract");
    res.redirect(`/contract_level/${newSpendcontract.contract_no}`)
  } catch (error) {
    console.log(error);
  }
};

