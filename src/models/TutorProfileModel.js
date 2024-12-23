const mongoose = require('mongoose');

const TutorSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: {type: String},
  tutoringTimeTo: { type: String },
  tutoringTimeFrom: { type: String },
  city: { type: String },
  location: { type: String },
  expectedSalary: { type: String },
  tutoringStyles: { type: String },
  preferredLocations: { type: String },
  tutoringMethod: { type: String },
  preferableCategories: { type: String },
  preferableClasses: { type: String },
  preferableSubject: { type: String },
  placeOfTutoring: { type: String },
  totalExperience: { type: String },
  experienceDetails: { type: String },
  levelOfEducation: { type: String },
  curriculum: { type: String },
  exam: { type: String },
  major: { type: String },
  result: { type: String },
  institute: { type: String },
  passingYear: { type: String },
  currentInstitute: { type: Boolean },
  fromDate: { type: Date },
  toDate: { type: Date },
  identityType: { type: String },
  identityNumber: { type: Number },
  religion: { type: String },
  nationality: { type: String },
  fullAddress: { type: String },
  gender: { type: String },
  dateOfBirth: { type: Date },
  additionalNumber: { type: String },
  facebookProfile: { type: String },
  linkedInProfile: { type: String },
  fatherName: { type: String },
  fatherPhone: { type: Number },
  motherName: { type: String },
  motherPhone: { type: Number },
  credentialImage: { type: String },
  verified: { type: Boolean, default: false },
},
  {
    versionKey: false
  }
);

const TutorProfileModel = mongoose.model('TutorProfile', TutorSchema);

module.exports = TutorProfileModel;
