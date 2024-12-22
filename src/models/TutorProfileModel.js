const mongoose = require('mongoose');

const TutorSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: {type: String},
  TutoringTimeTo: { type: String },
  TutoringTimeFrom: { type: String },
  City: { type: String },
  Location: { type: String },
  ExpectedSalary: { type: String },
  TutoringStyles: { type: String },
  PreferredLocations: { type: String },
  TutoringMethod: { type: String },
  PreferableCategories: { type: String },
  PreferableClasses: { type: String },
  PreferableSubject: { type: String },
  PlaceOfTutoring: { type: String },
  TotalExperience: { type: String },
  ExperienceDetails: { type: String },
  LevelOfEducation: { type: String },
  Curriculum: { type: String },
  Exam: { type: String },
  Major: { type: String },
  Result: { type: String },
  Institute: { type: String },
  PassingYear: { type: String },
  CurrentInstitute: { type: Boolean },
  FromDate: { type: Date },
  ToDate: { type: Date },
  IdentityType: { type: String },
  IdentityNumber: { type: Number },
  Religion: { type: String },
  Nationality: { type: String },
  FullAddress: { type: String },
  Gender: { type: String },
  DateOfBirth: { type: Date },
  AdditionalNumber: { type: String },
  FacebookProfile: { type: String },
  LinkedInProfile: { type: String },
  FatherName: { type: String },
  FatherPhone: { type: Number },
  MotherName: { type: String },
  MotherPhone: { type: Number },
  CredentialImage: { type: String },
  Verified: { type: Boolean, default: false },
},
  {
    versionKey: false
  }
);

const TutorProfileModel = mongoose.model('TutorProfile', TutorSchema);

module.exports = TutorProfileModel;
