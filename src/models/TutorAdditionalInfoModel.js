const mongoose = require('mongoose');

const CategoryRelatedSchema = new mongoose.Schema({
  tutoringTimeTo: { type: String },
  tutoringTimeFrom: { type: String },
  location: { type: String },
  expectedSalary: { type: Number },
  tutoringStyle: { type: String },
  preferredLocations: { type: String },
});

const EducationRelatedSchema = new mongoose.Schema({
  levelOfEducation: {
    type: String,
    enum: ['PhD', 'Masters', 'Bachelors', 'HSC', 'SSC', 'JSC'], // Restrict to these values
    required: false,
  },
  curriculum: { type: String },
  examDegreeTitle: { type: String },
  idCard: { type: String },
  idCardNumber: { type: String },
  majorGroup: { type: String },
  result: { type: Number },
  institute: { type: String },
  passingYear: { type: Date },
  fromDate: { type: Date },
  toDate: { type: Date },
});

const PersonalRelatedSchema = new mongoose.Schema({
  identityType: { type: String },
  identityNumber: { type: String },
  religion: { type: String },
  nationality: { type: String },
  fullAddress: { type: String },
  gender: { type: String },
  dateOfBirth: { type: Date },
  additionalNumber: { type: String },
  facebookURL: { type: String },
  linkedinURL: { type: String },
  fathersName: { type: String },
  fathersPhone: { type: String },
  mothersName: { type: String },
  mothersPhone: { type: String },
});

const CredentialRelatedSchema = new mongoose.Schema({
  credentialDocuments: [{ type: String }], // Array of document paths or IDs
});

const TutorAdditionalInfoSchema = new mongoose.Schema(
  {
    profile: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' },
    email: { type: String, unique: true },
    categoryRelated: {
      CATEGORYRELATED: { type: mongoose.Schema.Types.Mixed, default: {} },
      EDUCATIONRELATED: { type: mongoose.Schema.Types.Mixed, default: {} },
      PERSONALRELATED: { type: mongoose.Schema.Types.Mixed, default: {} },
      CREDENTIALRELATED: { type: mongoose.Schema.Types.Mixed, default: {} },
    },
    status: { type: String, enum: ['complete', 'incomplete'], default: 'incomplete' },
    percentage: { type: Number, default: 0 },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const TutorAdditionalInfoModel = mongoose.model(
  'TutorAdditionalInfo',
  TutorAdditionalInfoSchema
);

module.exports = TutorAdditionalInfoModel;

