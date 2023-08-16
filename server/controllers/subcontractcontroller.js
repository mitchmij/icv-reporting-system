const Subcontract = require("../models/Subcontract");
const mongoose = require("mongoose");


exports.postsubcontract = async (req, res) => {
  console.log(req.body);

  const newSubcontract = new Subcontract({
    id: req.body.id,
    v_id: req.body.v_id,
    contract_no: req.body.contract_no,
    contract_id: req.body.contract_id,
    kpi: req.body.kpi,
    companyname: req.body.companyname,
    yearpct: req.body.yearpct,
    plannedpct: req.body.plannedpct,
    plannedamt: req.body.plannedamt,
    actualpct: req.body.actualpct,
    actualamt: req.body.actualamt
  });

  try {
    await Subcontract.create(newSubcontract);
    req.flash('success_msg', 'Data added successfully');
    console.log("Sub Contract added")
    //return res.redirect("/contract");
    res.redirect(`/contract_level/${newSubcontract.contract_no}`)
  } catch (error) {
    console.log(error);
  }
};

