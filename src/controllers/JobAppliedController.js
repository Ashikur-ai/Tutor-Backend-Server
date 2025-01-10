const GuardianProfileModel = require("../models/GuardianProfileModel");
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


exports.getAllJobApplications = async (req, res) => {
  try {
    // Fetch all job applications and populate the required fields
    const jobApplications = await JobAppliedModel.find()
      .populate('jobId') // Populates JobPostModel details
      .populate('confirmedId') // Populates confirmed tutor info
      .populate('appointedIds') // Populates appointed tutors
      .populate('tutorIds'); // Populates tutors

    // Transform each application and include guardianInfo
    const enrichedApplications = await Promise.all(
      jobApplications.map(async (application) => {
        // Convert to plain JS object
        const appObj = application.toObject();

        // Fetch and attach guardian info if jobId and email exist
        if (appObj.jobId && appObj.jobId.email) {
          const guardianInfo = await GuardianProfileModel.findOne({
            email: appObj.jobId.email,
          });
          appObj.guardianInfo = guardianInfo || null; // Attach or set to null if not found
        }

        return appObj; // Return enriched application
      })
    );

    // Return response with enriched data
    res.status(200).json({
      success: true,
      data: enrichedApplications,
    });
  } catch (error) {
    console.error('Error fetching job applications:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching job applications',
    });
  }
};


const JobApplicationStatus = {
  INITIAL_PENDING: "INITIAL_PENDING",
  REVIEW_PENDING: "REVIEW_PENDING",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
};

exports.updateJobApplicationStatus = async (req, res) => {
  const { jobId, status } = req.body;
  

  try {
    // Validate input
    if (!jobId || !status) {
      return res.status(400).json({
        status: "fail",
        message: "jobId and status are required.",
      });
    }

    // Validate the status value
    if (!Object.values(JobApplicationStatus).includes(status)) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid status value.",
      });
    }

    // Find the job application
    const jobApplication = await JobAppliedModel.findOne({ _id:jobId });

    // Check if the job application exists
    if (!jobApplication) {
      return res.status(404).json({
        status: "fail",
        message: "Job application not found.",
      });
    }

    // Check if the current status is the same as the new status
    if (jobApplication.status === status) {
      return res.status(400).json({
        status: "fail",
        message: `Job application is already in ${status} status.`,
      });
    }

    // Update the status
    jobApplication.status = status;
    await jobApplication.save();

    res.status(200).json({
      status: "success",
      message: `Job application status updated to ${status} successfully.`,
      data: jobApplication,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.getApplicationsWithAppointedTutors = async (req, res) => {
  try {
    // Fetch job applications where appointedIds is not empty
    const jobApplications = await JobAppliedModel.find({
      appointedIds: { $ne: [] },
    })
      .populate('jobId') // Populate job details
      .populate('appointedIds') // Populate appointed tutor details
      .populate('tutorIds') // Populate tutor details
      .populate('confirmedId'); // Populate confirmed tutor details

    res.status(200).json({
      status: "success",
      message: "Job applications with appointed tutors fetched successfully.",
      data: jobApplications,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Server error while fetching job applications.",
    });
  }
};


exports.getApplicationsByStatus = async (req, res) => {
  const { status } = req.body;

  try {
    // Validate the status input
    if (!status) {
      return res.status(400).json({
        status: "fail",
        message: "Status query parameter is required.",
      });
    }

    // Validate the status value
    if (!Object.values(JobApplicationStatus).includes(status)) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid status value.",
      });
    }

    // Fetch job applications with the specified status
    const jobApplications = await JobAppliedModel.find({ status })
      .populate('jobId') // Populate job details
      .populate('appointedIds') // Populate appointed tutor details
      .populate('tutorIds') // Populate tutor details
      .populate('confirmedId'); // Populate confirmed tutor details

    res.status(200).json({
      status: "success",
      message: `Job applications with status "${status}" fetched successfully.`,
      data: jobApplications,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Server error while fetching job applications.",
    });
  }
};



exports.GetAppliedJobPostsByDateRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.body; // Fetch dates from the request body

    // Validate input
    if (!startDate || !endDate) {
      return res.status(400).json({ status: 'fail', message: 'Both startDate and endDate are required' });
    }

    // Parse the dates to ensure proper handling
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({ status: 'fail', message: 'Invalid date format' });
    }

    // Query the database for job posts within the date range
    const data = await JobAppliedModel.find({
      createdAt: { $gte: start, $lte: end }, // Assuming `createdAt` is a timestamp field
    });

    res.status(200).json({ status: 'success', data });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};