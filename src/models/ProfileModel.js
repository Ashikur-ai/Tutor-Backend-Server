const mongoose = require('mongoose');

const DataSchema = mongoose.Schema(
  {
    name: { type: String },
    gender: { type: String },
    phone: { type: String },
    location: { type: String },
    city: { type: String },
    email: { type: String, unique:true },
    password: { type: String }

  }
  ,
  { versionKey: false });

const ProfileModel = mongoose.model('Profile', DataSchema);

module.exports = ProfileModel;
