const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ContractSchema = new Schema({
  id: {
    type: String,
    required: true,
    default: this.id
  },
  v_id: {
    type: String,
    required: true,
    default: this.v_id
  },
  quarter_id: {
    type: String,
    required: true,
    default: function () {
      
      var currentTime = new Date()
    var month = currentTime.getMonth() + 1
    var day = currentTime.getDate()
    
    if(day <= 22 && month == 4)
    {
      return "Q01";
    }
    
     else if(day <= 22 && month == 7) {

      return "Q02";

    }
    
    else if(day <= 22 && month == 10) {
 
      return "Q03";

    }
    
    else if(day <= 22 && month == 1) {

      return "Q04";

    }
    
    else {
   
      return "None";

    }
  }},
  year: {
    type: String,
    required: true,
    default: function () {
 
     var currentTime = new Date()
     var year = currentTime.getFullYear()

     return year;

  }},
  contract_id: {
    type: String,
    required: true
  },
    contract_title: {
    type: String,
    required: true,
  },
  contract_status: {
    type: String,
    required: true
  },
  contract_kpi: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('Contract', ContractSchema);

//const Workforce = mongoose.model('Workforce', WorkForceSchema);

//module.exports = workforces;

//const Workforce = module.exports = mongoose.model('Workforce', WorkForceSchema);