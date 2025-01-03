const JobAppliedModel = require("../models/JobAppliedModel");

exports.applyForJob = async (req, res) => {
  const { jobId, tutorId } = req.body;

  try {
    // Validate input
    if (!jobId || !tutorId) {
      return res.status(400).json({
        status: "fail",
        message: "jobId and tutorId are required.",
      });
    }

    // Find the job application
    let jobApplication = await JobAppliedModel.findOne({ jobId });

    // If no job application exists, create a new one
    if (!jobApplication) {
      jobApplication = new JobAppliedModel({
        jobId,
        tutorIds: [tutorId],
      });

      await jobApplication.save();

      return res.status(201).json({
        status: "success",
        message: "Job application created, and tutor applied successfully.",
        data: jobApplication,
      });
    }

    // Check if the tutor already applied
    if (jobApplication.tutorIds.includes(tutorId)) {
      return res.status(400).json({
        status: "fail",
        message: "Tutor has already applied for this job.",
      });
    }

    // Add the tutor ID to the tutorIds array
    jobApplication.tutorIds.push(tutorId);
    await jobApplication.save();

    res.status(200).json({
      status: "success",
      message: "Tutor applied successfully.",
      data: jobApplication,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};


exports.appointTutor = async (req, res) => {
  const { jobId, tutorId } = req.body;

  try {
    // Validate input
    if (!jobId || !tutorId) {
      return res.status(400).json({
        status: "fail",
        message: "jobId and tutorId are required.",
      });
    }

    // Find the job application
    const jobApplication = await JobAppliedModel.findOne({ jobId });

    // Check if the job application exists
    if (!jobApplication) {
      return res.status(404).json({
        status: "fail",
        message: "Job application not found.",
      });
    }

    // Check if the tutor has applied for the job
    if (!jobApplication.tutorIds.includes(tutorId)) {
      return res.status(400).json({
        status: "fail",
        message: "Tutor has not applied for this job.",
      });
    }

    // Check if the tutor is already appointed
    if (jobApplication.appointedIds.includes(tutorId)) {
      return res.status(400).json({
        status: "fail",
        message: "Tutor is already appointed for this job.",
      });
    }

    // Add the tutor ID to the appointedIds array
    jobApplication.appointedIds.push(tutorId);
    await jobApplication.save();

    res.status(200).json({
      status: "success",
      message: "Tutor appointed successfully.",
      data: jobApplication,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.confirmTutor = async (req, res) => {
  const { jobId, tutorId } = req.body;

  try {
    // Validate input
    if (!jobId || !tutorId) {
      return res.status(400).json({
        status: "fail",
        message: "jobId and tutorId are required.",
      });
    }

    // Find the job application
    const jobApplication = await JobAppliedModel.findOne({ jobId });

    // Check if the job application exists
    if (!jobApplication) {
      return res.status(404).json({
        status: "fail",
        message: "Job application not found.",
      });
    }

    // Check if the tutor has applied for the job
    if (!jobApplication.tutorIds.includes(tutorId)) {
      return res.status(400).json({
        status: "fail",
        message: "Tutor has not applied for this job.",
      });
    }

    // Check if the tutor is already confirmed
    if (jobApplication.confirmedId?.toString() === tutorId) {
      return res.status(400).json({
        status: "fail",
        message: "Tutor is already confirmed for this job.",
      });
    }

    // Update the confirmedId field
    jobApplication.confirmedId = tutorId;
    await jobApplication.save();

    res.status(200).json({
      status: "success",
      message: "Tutor confirmed successfully.",
      data: jobApplication,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

