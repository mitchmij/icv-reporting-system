const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const LocalRecruitContractSchema = new Schema({
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
  contract_no: {
    type: String,
    required: true,
    default: this.contract_no
  },
  contract_id: {
    type: String,
    required: true,
    default: this.contract_id
  },
  kpi: {
    type: String,
    required: true,
    default: this.kpi
  },
  category: {
    type: String,
    required: true,
    default: this.category
  },
  code: {
    type: String,
    required: true,
    default: this.code
  },
  exphire: {
    type: Number,
    required: true,
  },
  rollover: {
    type: Number,
    required: true
  },
  grads: {
    type: Number,
    required: true
  },
  hnd: {
    type: Number,
    required: true
  },
  bma: {
    type: Number,
    required: true,
  },
  adc: {
    type: Number,
    required: true
  },
  ibte: {
    type: Number,
    required: true
  },
  schleavers: {
   type: Number,
   required: true
  },
  total:{
    type: Number,
    required:true,
    default: function() {
    return (this.exphire + this.rollover + this.grads + this.hnd + this.bma + this.adc + this.ibte + this.schleavers)
}},
createdAt: {
  type: Date,
  default: Date.now()
},
  updatedAt: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('LocalRecruitContract', LocalRecruitContractSchema);