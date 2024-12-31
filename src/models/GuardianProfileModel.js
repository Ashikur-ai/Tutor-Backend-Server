const mongoose = require('mongoose');

const GuardianSchema = new mongoose.Schema({
  profile: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile'},
  email: { type: String, unique: true },
  facebookId: { type: String },
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
