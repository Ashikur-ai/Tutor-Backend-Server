const mongoose = require('mongoose');

// Enum for Job Application Status
const JobApplicationStatus = {
  INITIAL_PENDING: "INITIAL_PENDING",
  REVIEW_PENDING: "REVIEW_PENDING",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
};

const JobAppliedSchema = new mongoose.Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'JobPostModel',
      required: true,
    },
    confirmedId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },
    appointedIds: {
      type: [mongoose.Schema.Types.ObjectId],
      default: [],
    },
    tutorIds: {
      type: [mongoose.Schema.Types.ObjectId],
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(JobApplicationStatus),
      default: JobApplicationStatus.INITIAL_PENDING,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt`
  }
);

const JobAppliedModel = mongoose.model("JobApplied", JobAppliedSchema);

module.exports = JobAppliedModel;
