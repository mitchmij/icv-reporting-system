const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  v_id: {
    type: String,
    required: true,
    default: "Not Applicable"
  },
  role: {
    type: String,
	default: this.role
  },
  name: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  description: {
    type: Array,
    required: true,
    default: this.description
  },
  password: {
    type: String,
    required: false,
    minlength: 6,
    trim: true
  },
  status: {
    type: String,
	default: this.status
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    default: Date.now()
  },
  verified: {
    type: Boolean,
    required: true,
    default: false
}
});


UserSchema.methods.generateVerificationToken = function () {
  const user = this;
  const verificationToken = jwt.sign(
      { ID: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
  );
  return verificationToken;
};


//const User=require('../models/User');
const User = mongoose.model('User', UserSchema);

module.exports = User;