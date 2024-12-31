const mongoose = require('mongoose');

const DataSchema = mongoose.Schema(
  {
    fullName: { type: String },
    gender: { type: String },
    phoneNumber: { type: String },
    city: { type: String },
    location: { type: String },
    password: { type: String },
    email: { type: String, unique: true },
    role: { type: String, enum: ['guardian', 'tutor', 'superadmin', 'admin', 'apointer', ''], default: '' }, 
    profilePic: {type: String},
    verificationRequest: { type: Boolean, default: false } // Field to indicate if the user is verified, initially false
  },
  {
    timestamps: true,
    versionKey: false
  }
);

const ProfileModel = mongoose.model('Profile', DataSchema);

module.exports = ProfileModel;
