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





//   try {
//     // Fetch job applications and populate fields
//     const jobApplications = await JobAppliedModel.find()
//       .populate('jobId') // Populate job details
//       .populate('confirmedId') // Populate confirmed tutor info
//       .populate('appointedIds') // Populate appointed tutors
//       .populate('tutorIds') // Populate tutor IDs
//       .lean(); // Converts documents to plain JavaScript objects for easier handling

//     // Iterate through applications to fetch guardian info based on jobId.email
//     for (let application of jobApplications) {
//       if (application.jobId && application.jobId.email) {
//         const guardianInfo = await GuardianProfileModel.findOne({ email: application.jobId.email });
//         application.guardianInfo = guardianInfo; // Attach guardian info to each application
//       }
//     }

//     res.status(200).json({
//       success: true,
//       data: jobApplications,
//     });
//   } catch (error) {
//     console.error('Error fetching job applications:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Server error while fetching job applications',
//     });
//   }
// };