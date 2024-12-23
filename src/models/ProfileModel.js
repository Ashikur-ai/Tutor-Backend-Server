const mongoose = require('mongoose');

const DataSchema = mongoose.Schema(
  {
    name: { type: String },
    gender: { type: String },
    phone: { type: String },
    location: { type: String },
    city: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    admin: { type: Boolean, default: false }, // Field to indicate if the user is an admin
    role: { type: String, enum: ['guardian', 'tutor', ''], default: '' }, // Role field with specific values and initially empty
    verified: { type: Boolean, default: false } // Field to indicate if the user is verified, initially false
  },
  { versionKey: false }
);

const ProfileModel = mongoose.model('Profile', DataSchema);

module.exports = ProfileModel;
