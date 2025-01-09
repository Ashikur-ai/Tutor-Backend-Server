const JobPostModel = require("../models/JobPostModel");


exports.CreateJobPost = async (req, res) => {
  try {
    const data = req.body;
    const email = req.headers['email'];

    if (!email) {
      return res.status(400).json({ status: 'fail', message: 'Email is required in headers' });
    }

    // Add email to the data object
    data.email = email;

    // Save the data to the database
    const result = await JobPostModel.create(data);

    res.status(200).json({ status: 'success', data: result });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};






exports.GetAllJobPost = async (req, res) => {
  // let email = req.headers['email'];

  // console.log(email);

  try {
    const data = await JobPostModel.find();
    res.status(200).json({ status: 'success', data: data });
  } catch (err) {
    res.status(400).json({ status: "fail", data: err.message });
  }
}




exports.SelectJobPostById = async (req, res) => {
  let _id = req.params.id;

  try {
    const data = await JobPostModel.findById(_id);
    res.status(200).json({ status: 'success', data: data });
  } catch (err) {
    res.status(400).json({ status: "fail", data: err.message });
  }
}





exports.UpdateJobPostById = async (req, res) => {
  const data = req.body;
  let id = req.params.id;
  try {
    const result = await JobPostModel.findOneAndUpdate(
      { _id: id },
      { $set: data },
      { new: true }
    );

    if (!result) {
      return res.status(404).json({ status: "fail", message: "Need Tutor Post not found" });
    }
    res.status(200).json({ status: "success", data: result });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};





exports.DeleteJobPostById = async (req, res) => {
  let _id = req.params.id;

  if (!_id) {
    return res.status(400).json({ status: "fail", message: "Id is required" });
  };

  try {
    const result = await JobPostModel.findByIdAndDelete(_id);

    if (!result) {
      return res.status(404).json({ status: "fail", message: "POST not found" });
    }

    res.status(200).json({ status: "success", message: "POST deleted successfully", data: result });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }


}



// filter method
exports.GetJobPostsByDateRange = async (req, res) => {
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
    const data = await JobPostModel.find({
      createdAt: { $gte: start, $lte: end }, // Assuming `createdAt` is a timestamp field
    });

    res.status(200).json({ status: 'success', data });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

exports.GetJobPostsByTuitionType = async (req, res) => {
  try {
    const { TuitionType } = req.body; // Get TuitionType from request body

    // Validate input
    if (!TuitionType) {
      return res.status(400).json({ status: 'fail', message: 'TuitionType is required' });
    }

    // Query to filter job posts by TuitionType
    const data = await JobPostModel.find({ TuitionType });

    if (data.length === 0) {
      return res.status(404).json({
        status: 'fail',
        message: `No job posts found for TuitionType: ${TuitionType}`,
      });
    }

    res.status(200).json({ status: 'success', data });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};


exports.GetJobPostsBySubject = async (req, res) => {
  try {
    const { subjectName } = req.body; // Get the subject name from request body

    // Validate input
    if (!subjectName) {
      return res.status(400).json({ status: 'fail', message: 'Subject name is required' });
    }

    // Query to filter job posts by subject
    const data = await JobPostModel.find({
      Subject: {
        $elemMatch: { name: subjectName } // Match subject by name
      }
    });

    if (data.length === 0) {
      return res.status(404).json({
        status: 'fail',
        message: `No job posts found for subject: ${subjectName}`,
      });
    }

    res.status(200).json({ status: 'success', data });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};


exports.GetJobPostsByPreferredTeacherGender = async (req, res) => {
  try {
    const { preferredGender } = req.body; // Get preferred gender from request body

    // Validate input
    if (!preferredGender) {
      return res.status(400).json({ status: 'fail', message: 'Preferred gender is required' });
    }

    // Query to filter job posts by preferred gender
    const data = await JobPostModel.find({ PreferedGender_Teacher: preferredGender });

    if (data.length === 0) {
      return res.status(404).json({
        status: 'fail',
        message: `No job posts found for preferred teacher gender: ${preferredGender}`,
      });
    }

    res.status(200).json({ status: 'success', data });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};


exports.GetJobPostsByPreferredStudentGender = async (req, res) => {
  try {
    const { preferredStudentGender } = req.body; // Get preferred student gender from request body

    // Validate input
    if (!preferredStudentGender) {
      return res.status(400).json({ status: 'fail', message: 'Preferred student gender is required' });
    }

    // Query to filter job posts by preferred student gender
    const data = await JobPostModel.find({ PreferedGender_Student: preferredStudentGender });

    if (data.length === 0) {
      return res.status(404).json({
        status: 'fail',
        message: `No job posts found for preferred student gender: ${preferredStudentGender}`,
      });
    }

    res.status(200).json({ status: 'success', data });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};


