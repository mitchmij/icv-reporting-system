const LocalRecruitment = require("../models/LocalRecruitment");
const LocalRecruitContract = require("../models/LocalRecruitContract");
const mongoose = require("mongoose");


exports.addLocal = async (req, res) => {
    res.render("localrecruit/company_level");
  };


exports.postLocal = async (req, res) => {
  console.log(req.body);

  const newlocalrecruitment = new LocalRecruitment({
    id: req.body.id,
    v_id: req.body.v_id,
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
    await LocalRecruitment.create(newlocalrecruitment);
    req.flash('success_msg', 'Data added successfully');
    console.log("Recruitment added")
    return res.redirect("/company_level");
  } catch (error) {
    console.log(error);
  }
};

exports.postcontractLocal = async (req, res) => {
  console.log(req.body);

  const newlocalrecruitcontract = new LocalRecruitContract({
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
    await LocalRecruitContract.create(newlocalrecruitcontract);
    req.flash('success_msg', 'Data added successfully');
    console.log("Contract Recruitment added")
    //return res.redirect("/contract");
    res.redirect(`/contract_level/${newlocalrecruitcontract.contract_no}`)
  } catch (error) {
    console.log(error);
  }
};
