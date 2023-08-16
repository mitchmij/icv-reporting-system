const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ApprenticeSchema = new Schema({
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
  fullname: {
    type: String,
    required: true,
  },
  ic: {
    type: String,
    required: true
  },
  iready: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  start: {
    type: String,
    required: true,
  },
  end: {
    type: String,
    required: true
  },
  qualification: {
    type: String,
    required: true
  },
  skilltrade: {
    type: String,
    required: true
  },
  accreditation: {
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

module.exports = mongoose.model('Apprentice', ApprenticeSchema);