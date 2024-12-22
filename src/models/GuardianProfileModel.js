const mongoose = require('mongoose');

const GuardianSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: { type: String },
  Name: { type: String, required: true },
  ContactNo: { type: Number, required: true },
  Email: { type: String, required: true },
  Gender: { type: String },
  FacebookId: { type: String },
  City: { type: String },
  Location: { type: String },
  DetailsAddress: { type: String },
  Profession: { type: String },
  HearAboutUs: { type: String },
  RefName: { type: String },
  RefContactNo: { type: String },
  Relation: { type: String },
  FullAddress: { type: String }
}, {
  versionKey: false,
  timestamps: true
});

const GuardianProfileModel = mongoose.model('GuardianProfile', GuardianSchema);

module.exports = GuardianProfileModel;
