const mongoose = require('mongoose');

const GuardianSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  name: { type: String},
  contactNo: { type: String },
  gender: { type: String },
  facebookId: { type: String },
  city: { type: String },
  location: { type: String },
  detailsAddress: { type: String },
  profession: { type: String },
  hearAboutUs: { type: String },
  refName: { type: String },
  refContactNo: { type: String },
  relation: { type: String },
  fullAddress: { type: String }
}, {
  versionKey: false,
  timestamps: true
});

const GuardianProfileModel = mongoose.model('GuardianProfile', GuardianSchema);

module.exports = GuardianProfileModel;
