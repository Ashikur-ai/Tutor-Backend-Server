const mongoose = require('mongoose');

const JobPostSchema = new mongoose.Schema({
  email: { type: String },
  title: { type: String, required: true },
  Job_id: { type: Number, required: true },
  Created_date: { type: Date, default: Date.now },
  TuitionType: { type: String, required: true },
  Subject: [{ type: Object, required: true }], // Array of objects
  Salary: { type: String, required: true },
  LiveLink: { type: String },
  Location: { type: String, required: true },
  TutoringTime: { type: String, required: true },
  PreferedGender_Teacher: { type: String },
  PreferedGender_Student: { type: String }
}, {
  versionKey: false,
  timestamps: true
});

const JobPostModel = mongoose.model('JobPost', JobPostSchema);

module.exports = JobPostModel;
