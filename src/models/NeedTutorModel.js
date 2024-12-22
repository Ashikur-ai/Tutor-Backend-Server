const mongoose = require('mongoose');

const DataSchema = mongoose.Schema(
  {
    phone: { type: String },
    email: { type: String },
    student_name: { type: String },
    tuition_type: { type: String },
    class: { type: String },
    salary: { type: String },
    subject: { type: String },
    location: { type: String },
    tutoring_time: { type: String }
  },
  { versionKey: false }
);

const NeedTutorModel = mongoose.model('NeedTutor', DataSchema);

module.exports = NeedTutorModel;