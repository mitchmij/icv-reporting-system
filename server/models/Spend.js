const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const SpendSchema = new Schema({
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
  category: {
    type: String,
    required: true,
    default: this.category
  },
  code: {
    type: String,
    required: false,
    default: this.code
  },
    inbrunei: {
    type: Number,
    required: true
  },
  outbrunei: {
    type: Number,
    required: false,
    default: 0
  },
  total:{
    type: Number,
    required:true,
    default: function() {
    return (this.inbrunei + this.outbrunei).toFixed(2)
}},
  spendpct: {
    type: Number,
    required: true,
    default: function() {
      return Math.round((this.inbrunei/(this.inbrunei + this.outbrunei)*100)*10) / 10
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

module.exports = mongoose.model('Spend', SpendSchema);