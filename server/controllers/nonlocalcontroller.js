const NonlocalRecruitment = require("../models/NonlocalRecruitment");
const NonlocalRecruitContract = require("../models/NonlocalRecruitContract");
const mongoose = require("mongoose");


exports.addNonlocal = async (req, res) => {
    res.render("recruitment/company_level");
  };

/**
 * POST /
 * Create New Customer
 */
exports.postNonlocal = async (req, res) => {
  console.log(req.body);

  const newnonlocalrecruitment = new NonlocalRecruitment({
    id: req.body.id,
    v_id: req.body.v_id,
    level: req.body.level,
    category: req.body.category,
    code: req.body.code,
    exphire: req.body.exphire,
    rollover: req.body.rollover,
    grads: req.body.grads,
    hnd: req.body.hnd,
    bma: req.body.bma,
    adc: req.body.adc,
    ibte: req.body.ibte,
    schleavers: req.body.schleavers
  });

  try {
    await NonlocalRecruitment.create(newnonlocalrecruitment);
    req.flash('success_msg', 'Data added successfully');
    console.log("Recruitment added")
    return res.redirect("/company_level");
  } catch (error) {
    console.log(error);
  }
};


exports.postcontractNonLocal = async (req, res) => {
  console.log(req.body);

  const newnonlocalrecruitcontract = new NonlocalRecruitContract({
    id: req.body.id,
    v_id: req.body.v_id,
    contract_no: req.body.contract_no,
    contract_id: req.body.contract_id,
    kpi: req.body.kpi,
    category: req.body.category,
    code: req.body.code,
    exphire: req.body.exphire,
    rollover: req.body.rollover,
    grads: req.body.grads,
    hnd: req.body.hnd,
    bma: req.body.bma,
    adc: req.body.adc,
    ibte: req.body.ibte,
    schleavers: req.body.schleavers
  });

  try {
    await NonlocalRecruitContract.create(newnonlocalrecruitcontract);
    req.flash('success_msg', 'Data added successfully');
    console.log("Contract Recruitment added")
    //return res.redirect("/contract");
    res.redirect(`/contract_level/${newnonlocalrecruitcontract.contract_no}`)
  } catch (error) {
    console.log(error);
  }
};

